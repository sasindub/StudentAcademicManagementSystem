"""
Vercel Serverless Function Entry Point for FastAPI
This file is used when deploying to Vercel
"""
import os
import sys
from pathlib import Path
import logging

# Configure logging first
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Find Backend directory - check local first (api/Backend), then parent
current_file = Path(__file__).resolve()
possible_paths = [
    current_file.parent / "Backend",  # api/Backend (copied for Vercel)
    current_file.parent.parent / "Backend",  # api/../Backend (local dev)
    Path("/var/task/Backend"),  # Vercel's working directory
    Path.cwd() / "Backend",  # Current working directory
]

backend_path = None
for path in possible_paths:
    if path.exists() and (path / "config.py").exists():
        backend_path = path
        logger.info(f"[OK] Found Backend at: {backend_path}")
        break

if backend_path:
    sys.path.insert(0, str(backend_path))
else:
    # Last resort: try adding parent directory
    parent = current_file.parent.parent
    sys.path.insert(0, str(parent))
    logger.warning(f"[WARN] Using fallback path: {parent}")

# Now import FastAPI and backend modules
from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware

try:
    from config import settings
    from database import connect_to_mongo
    from services.seed_service import SeedService
    from routes.auth import router as auth_router
    from routes.students import router as students_router
    from routes.marks import router as marks_router
    logger.info("[OK] All imports successful")
except ImportError as e:
    logger.error(f"[ERROR] Import failed: {e}")
    logger.error(f"[DEBUG] Python path: {sys.path}")
    logger.error(f"[DEBUG] Current directory: {os.getcwd()}")
    logger.error(f"[DEBUG] File location: {current_file}")
    raise

# Create FastAPI application (without lifespan for serverless)
app = FastAPI(
    title="Student Academic Management System",
    description="A comprehensive system for managing students and their academic marks",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# Configure CORS - Allow ALL origins (no restrictions)
# This MUST be added BEFORE routes
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],  # Explicit methods
    allow_headers=["*"],  # Allow all headers
    expose_headers=["*"],
)

# Add explicit OPTIONS handler for preflight requests
@app.options("/{full_path:path}")
async def options_handler(full_path: str):
    """Handle OPTIONS preflight requests with proper CORS headers."""
    return Response(
        content="OK",
        headers={
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, PATCH",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Max-Age": "3600"
        }
    )

# Include routers WITHOUT /api prefix (Vercel handles routing)
# This way frontend can call /auth/login directly
app.include_router(auth_router)
app.include_router(students_router)
app.include_router(marks_router)

@app.get("/", tags=["Root"])
@app.get("/api", tags=["Root"])
async def root():
    """Root endpoint - API health check."""
    return {
        "message": "Student Academic Management System API",
        "status": "running",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health", tags=["Health"])
@app.get("/api/health", tags=["Health"])
async def health_check():
    """Health check endpoint for monitoring."""
    return {
        "status": "healthy",
        "service": "student-academic-api",
        "db_initialized": _initialized
    }

@app.get("/debug", tags=["Debug"])
async def debug_info():
    """Debug endpoint - shows system info without DB."""
    import sys
    return {
        "status": "running",
        "python_version": sys.version,
        "platform": sys.platform,
        "cwd": os.getcwd(),
        "path": sys.path[:3],
        "db_initialized": _initialized,
        "env_vars_present": {
            "MONGODB_URI": "MONGODB_URI" in os.environ,
            "DATABASE_NAME": "DATABASE_NAME" in os.environ,
            "JWT_SECRET_KEY": "JWT_SECRET_KEY" in os.environ
        }
    }

# Initialize database connection on first request
_initialized = False

async def initialize_db():
    """Initialize database connection (called on first request)."""
    global _initialized
    if not _initialized:
        try:
            logger.info("[INFO] Starting database initialization...")
            await connect_to_mongo()
            logger.info("[INFO] MongoDB connected, starting seed...")
            seed_service = SeedService()
            await seed_service.run_all_seeds()
            _initialized = True
            logger.info("[OK] Database initialized successfully")
        except Exception as e:
            logger.error(f"[ERROR] Database init failed: {e}")
            logger.exception("Full error traceback:")
            # Don't mark as initialized so it tries again next request
            # But don't crash the whole app

# Middleware to initialize DB and add CORS headers
@app.middleware("http")
async def init_db_middleware(request, call_next):
    # Try to initialize DB, but don't crash if it fails
    try:
        await initialize_db()
    except Exception as e:
        logger.error(f"[WARN] DB init middleware error: {e}")
    
    # Continue with request even if DB fails
    response = await call_next(request)
    
    # Explicitly add CORS headers to EVERY response
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS, PATCH"
    response.headers["Access-Control-Allow-Headers"] = "*"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    
    return response

# Vercel serverless function handler
# Vercel's Python runtime supports ASGI natively - no Mangum needed!
# Just export the app directly - Vercel will handle the rest

# This is all we need - Vercel detects and wraps it automatically
# The 'app' variable is the ASGI application that Vercel runs


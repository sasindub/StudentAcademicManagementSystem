"""
Vercel Serverless Function Entry Point for FastAPI
This file is used when deploying to Vercel
"""
import os
import sys
from pathlib import Path

# Add Backend directory to Python path
backend_path = Path(__file__).parent.parent / "Backend"
sys.path.insert(0, str(backend_path))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging

from config import settings
from database import connect_to_mongo
from services.seed_service import SeedService
from routes.auth import router as auth_router
from routes.students import router as students_router
from routes.marks import router as marks_router

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

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
from fastapi import Response

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
        "service": "student-academic-api"
    }

# Initialize database connection on first request
_initialized = False

async def initialize_db():
    """Initialize database connection (called on first request)."""
    global _initialized
    if not _initialized:
        try:
            await connect_to_mongo()
            seed_service = SeedService()
            await seed_service.run_all_seeds()
            _initialized = True
            logger.info("[OK] Database initialized")
        except Exception as e:
            logger.error(f"[ERROR] Database init failed: {e}")

# Middleware to initialize DB and add CORS headers
@app.middleware("http")
async def init_db_middleware(request, call_next):
    await initialize_db()
    response = await call_next(request)
    
    # Explicitly add CORS headers to EVERY response
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS, PATCH"
    response.headers["Access-Control-Allow-Headers"] = "*"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    
    return response

# Vercel serverless function handler
from mangum import Mangum
handler = Mangum(app, lifespan="off")


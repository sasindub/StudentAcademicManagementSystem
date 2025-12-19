"""
Student Academic Management System - FastAPI Backend
Main application entry point.

SETUP INSTRUCTIONS:
1. Copy 'env.example' to '.env'
2. Configure your MongoDB URI and Frontend URL
3. Run: python main.py
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging

from config import settings, print_config_info
from database import connect_to_mongo, close_mongo_connection
from services.seed_service import SeedService
from routes.auth import router as auth_router
from routes.students import router as students_router
from routes.marks import router as marks_router

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan manager.
    Handles startup and shutdown events.
    """
    # Startup
    logger.info("[STARTUP] Starting Student Academic Management System...")
    
    # Print configuration info
    print_config_info()
    
    # Connect to MongoDB
    await connect_to_mongo()
    
    # Run database seeding
    seed_service = SeedService()
    await seed_service.run_all_seeds()
    
    logger.info("[OK] Application startup complete!")
    
    yield
    
    # Shutdown
    logger.info("[SHUTDOWN] Shutting down application...")
    await close_mongo_connection()


# Create FastAPI application
app = FastAPI(
    title="Student Academic Management System",
    description="A comprehensive system for managing students and their academic marks",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS with settings from .env
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,  # Loaded from FRONTEND_URL in .env
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logger.info(f"[CORS] Configured for: {settings.cors_origins}")

# Include routers
app.include_router(auth_router)
app.include_router(students_router)
app.include_router(marks_router)


@app.get("/", tags=["Root"])
async def root():
    """Root endpoint - API health check."""
    return {
        "message": "Student Academic Management System API",
        "status": "running",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/health", tags=["Health"])
async def health_check():
    """Health check endpoint for monitoring."""
    return {
        "status": "healthy",
        "service": "student-academic-api"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )


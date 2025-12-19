"""
Application configuration settings.
Client only needs to modify the .env file for deployment.

INSTRUCTIONS:
1. Copy 'env.example' to '.env'
2. Update MONGODB_URI with your connection string
3. Update FRONTEND_URL for CORS
4. Run the application
"""
from pydantic_settings import BaseSettings
from typing import List
import os


class Settings(BaseSettings):
    # ============================================
    # MONGODB CONFIGURATION
    # ============================================
    MONGODB_URI: str = "mongodb://localhost:27017"
    DATABASE_NAME: str = "student_academic_db"
    
    # ============================================
    # CORS / FRONTEND CONFIGURATION
    # ============================================
    # Comma-separated list of allowed frontend URLs
    FRONTEND_URL: str = "http://localhost:3000"
    
    # ============================================
    # JWT CONFIGURATION
    # ============================================
    JWT_SECRET_KEY: str = "your-super-secret-key-change-in-production-2024"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 480
    
    # ============================================
    # ADMIN USER CONFIGURATION
    # ============================================
    ADMIN_USERNAME: str = "Admin"
    ADMIN_PASSWORD: str = "Abc@12345"
    
    @property
    def cors_origins(self) -> List[str]:
        """Parse FRONTEND_URL into list of origins for CORS."""
        origins = [url.strip() for url in self.FRONTEND_URL.split(",")]
        return origins
    
    class Config:
        env_file = ".env"
        extra = "allow"
        case_sensitive = True


settings = Settings()


# Print configuration info on import (helpful for debugging)
def print_config_info():
    """Print current configuration (without sensitive data)."""
    print("\n" + "="*50)
    print("[CONFIG] CONFIGURATION LOADED")
    print("="*50)
    print(f"[DB] Database: {settings.DATABASE_NAME}")
    print(f"[CORS] Origins: {settings.cors_origins}")
    print(f"[AUTH] Admin User: {settings.ADMIN_USERNAME}")
    print("="*50 + "\n")


"""
User model definitions for authentication.
"""
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from enum import Enum


class UserRole(str, Enum):
    ADMIN = "ADMIN"


class UserModel(BaseModel):
    """MongoDB User document model."""
    username: str = Field(..., min_length=3, max_length=50)
    password: str  # Hashed password
    role: UserRole = UserRole.ADMIN
    isActive: bool = True
    createdAt: datetime = Field(default_factory=datetime.utcnow)


class UserCreate(BaseModel):
    """Schema for creating a new user."""
    username: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=6)
    role: UserRole = UserRole.ADMIN


class UserLogin(BaseModel):
    """Schema for user login."""
    username: str
    password: str


class UserResponse(BaseModel):
    """Schema for user response (excludes password)."""
    id: str
    username: str
    role: UserRole
    isActive: bool
    createdAt: datetime


class Token(BaseModel):
    """JWT Token response schema."""
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


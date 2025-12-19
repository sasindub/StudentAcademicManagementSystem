"""
Student model definitions.
"""
from pydantic import BaseModel, Field, field_validator
from typing import List, Optional
from datetime import datetime


class StudentModel(BaseModel):
    """MongoDB Student document model."""
    studentId: str = Field(..., pattern=r'^STU-\d{3}$')
    name: str = Field(..., min_length=2, max_length=100)
    grade: str = Field(..., min_length=1, max_length=10)
    mobileNumbers: List[str] = Field(default_factory=list)
    isActive: bool = True
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)
    
    @field_validator('mobileNumbers')
    @classmethod
    def validate_mobile_numbers(cls, v):
        """Validate mobile number format."""
        for number in v:
            if not number.replace('+', '').replace('-', '').replace(' ', '').isdigit():
                raise ValueError(f'Invalid mobile number format: {number}')
        return v


class StudentCreate(BaseModel):
    """Schema for creating a new student."""
    name: str = Field(..., min_length=2, max_length=100)
    grade: str = Field(..., min_length=1, max_length=10)
    mobileNumbers: List[str] = Field(default_factory=list)


class StudentUpdate(BaseModel):
    """Schema for updating a student."""
    name: Optional[str] = Field(None, min_length=2, max_length=100)
    grade: Optional[str] = Field(None, min_length=1, max_length=10)
    mobileNumbers: Optional[List[str]] = None
    isActive: Optional[bool] = None


class StudentResponse(BaseModel):
    """Schema for student response."""
    id: str
    studentId: str
    name: str
    grade: str
    mobileNumbers: List[str]
    isActive: bool
    createdAt: datetime
    updatedAt: datetime
    
    class Config:
        from_attributes = True


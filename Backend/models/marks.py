"""
Marks model definitions.
"""
from pydantic import BaseModel, Field, field_validator
from typing import List, Optional
from datetime import datetime


class SubjectMark(BaseModel):
    """Individual subject mark model."""
    subjectName: str = Field(..., min_length=1, max_length=50)
    mark: float = Field(..., ge=0, le=100)
    isActive: bool = True


class MarksModel(BaseModel):
    """MongoDB Marks document model."""
    studentId: str = Field(..., pattern=r'^STU-\d{3}$')
    term: str = Field(..., min_length=1, max_length=20)
    year: int = Field(..., ge=2000, le=2100)
    subjects: List[SubjectMark] = Field(default_factory=list)
    isActive: bool = True
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)


class MarksCreate(BaseModel):
    """Schema for creating marks."""
    studentId: str = Field(..., pattern=r'^STU-\d{3}$')
    term: str = Field(..., min_length=1, max_length=20)
    year: int = Field(..., ge=2000, le=2100)
    subjects: List[SubjectMark] = Field(default_factory=list)


class MarksUpdate(BaseModel):
    """Schema for updating marks."""
    term: Optional[str] = Field(None, min_length=1, max_length=20)
    year: Optional[int] = Field(None, ge=2000, le=2100)
    subjects: Optional[List[SubjectMark]] = None
    isActive: Optional[bool] = None


class MarksResponse(BaseModel):
    """Schema for marks response."""
    id: str
    studentId: str
    term: str
    year: int
    subjects: List[SubjectMark]
    isActive: bool
    createdAt: datetime
    updatedAt: datetime
    
    class Config:
        from_attributes = True


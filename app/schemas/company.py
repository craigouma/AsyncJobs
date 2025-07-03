from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime
from app.models.job import JobType, JobLevel


class SimpleJobOut(BaseModel):
    id: int
    title: str
    location: Optional[str]
    job_type: JobType
    job_level: JobLevel
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class CompanyBase(BaseModel):
    email: EmailStr
    company_name: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    website: Optional[str] = None
    location: Optional[str] = None


class CompanyCreate(CompanyBase):
    password: str = Field(..., min_length=8)


class CompanyUpdate(BaseModel):
    company_name: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = None
    website: Optional[str] = None
    location: Optional[str] = None


class CompanyLogin(BaseModel):
    email: EmailStr
    password: str


class CompanyOut(CompanyBase):
    id: int
    is_active: bool
    is_verified: bool
    created_at: datetime
    updated_at: datetime
    jobs: List[SimpleJobOut] = []
    
    class Config:
        from_attributes = True 
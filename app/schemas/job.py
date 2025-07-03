from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from app.models.job import JobType, JobLevel
from .tag import TagOut
from .company import CompanyOut


class JobBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    description: str = Field(..., min_length=1)
    location: Optional[str] = None
    job_type: JobType = JobType.ONSITE
    job_level: JobLevel = JobLevel.MID
    salary_min: Optional[int] = Field(None, ge=0)
    salary_max: Optional[int] = Field(None, ge=0)


class JobCreate(JobBase):
    tag_names: List[str] = Field(default_factory=list)


class JobUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = Field(None, min_length=1)
    location: Optional[str] = None
    job_type: Optional[JobType] = None
    job_level: Optional[JobLevel] = None
    salary_min: Optional[int] = Field(None, ge=0)
    salary_max: Optional[int] = Field(None, ge=0)
    tag_names: Optional[List[str]] = None
    is_active: Optional[bool] = None


class JobOut(JobBase):
    id: int
    is_active: bool
    company_id: int
    created_at: datetime
    updated_at: datetime
    tags: List[TagOut] = []
    company: Optional[CompanyOut] = None
    
    class Config:
        from_attributes = True


class JobFilter(BaseModel):
    tags: Optional[str] = Field(None, description="Comma-separated list of tags")
    location: Optional[str] = None
    job_type: Optional[JobType] = None
    job_level: Optional[JobLevel] = None
    salary_min: Optional[int] = Field(None, ge=0)
    salary_max: Optional[int] = Field(None, ge=0)
    is_active: bool = True
    skip: int = Field(0, ge=0)
    limit: int = Field(100, ge=1, le=100) 
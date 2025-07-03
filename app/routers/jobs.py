from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_db
from app.schemas import JobCreate, JobUpdate, JobOut, JobFilter
from app.models.job import JobType, JobLevel
from app.services import JobService
from app.auth.dependencies import get_current_active_company, get_current_active_user
from app.models import Company

router = APIRouter(prefix="/jobs", tags=["Jobs"])


@router.get("/", response_model=List[JobOut])
async def get_jobs(
    tags: Optional[str] = Query(None, description="Comma-separated list of tags"),
    location: Optional[str] = Query(None, description="Location filter"),
    job_type: Optional[JobType] = Query(None, description="Job type filter"),
    job_level: Optional[JobLevel] = Query(None, description="Job level filter"),
    salary_min: Optional[int] = Query(None, ge=0, description="Minimum salary"),
    salary_max: Optional[int] = Query(None, ge=0, description="Maximum salary"),
    is_active: bool = Query(True, description="Show active jobs only"),
    skip: int = Query(0, ge=0, description="Number of jobs to skip"),
    limit: int = Query(100, ge=1, le=100, description="Maximum number of jobs to return"),
    db: AsyncSession = Depends(get_db)
):
    """Get jobs with filtering options."""
    filters = JobFilter(
        tags=tags,
        location=location,
        job_type=job_type,
        job_level=job_level,
        salary_min=salary_min,
        salary_max=salary_max,
        is_active=is_active,
        skip=skip,
        limit=limit
    )
    return await JobService.get_jobs_with_filters(db, filters)


@router.get("/{job_id}", response_model=JobOut)
async def get_job_by_id(
    job_id: int,
    db: AsyncSession = Depends(get_db)
):
    """Get job by ID."""
    job = await JobService.get_job_by_id(db, job_id)
    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found"
        )
    return job


@router.post("/", response_model=JobOut, status_code=status.HTTP_201_CREATED)
async def create_job(
    job_data: JobCreate,
    current_company: Company = Depends(get_current_active_company),
    db: AsyncSession = Depends(get_db)
):
    """Create a new job posting (companies only)."""
    return await JobService.create_job(db, job_data, current_company.id)


@router.put("/{job_id}", response_model=JobOut)
async def update_job(
    job_id: int,
    job_data: JobUpdate,
    current_company: Company = Depends(get_current_active_company),
    db: AsyncSession = Depends(get_db)
):
    """Update job posting (companies only)."""
    job = await JobService.get_job_by_id(db, job_id)
    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found"
        )
    
    return await JobService.update_job(db, job, job_data, current_company.id)


@router.delete("/{job_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_job(
    job_id: int,
    current_company: Company = Depends(get_current_active_company),
    db: AsyncSession = Depends(get_db)
):
    """Delete job posting (companies only)."""
    job = await JobService.get_job_by_id(db, job_id)
    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found"
        )
    
    await JobService.delete_job(db, job, current_company.id)


@router.get("/company/my-jobs", response_model=List[JobOut])
async def get_company_jobs(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    current_company: Company = Depends(get_current_active_company),
    db: AsyncSession = Depends(get_db)
):
    """Get all jobs for the current company."""
    return await JobService.get_company_jobs(db, current_company.id, skip, limit) 
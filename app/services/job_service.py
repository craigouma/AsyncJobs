from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_, or_
from sqlalchemy.orm import selectinload
from fastapi import HTTPException, status

from app.models import Job, Tag, Company
from app.models.job import JobType, JobLevel
from app.schemas import JobCreate, JobUpdate, JobFilter
from .tag_service import TagService


class JobService:
    @staticmethod
    async def create_job(
        db: AsyncSession, 
        job_data: JobCreate, 
        company_id: int
    ) -> Job:
        """Create a new job posting."""
        # Create job
        job = Job(
            title=job_data.title,
            description=job_data.description,
            location=job_data.location,
            job_type=job_data.job_type,
            job_level=job_data.job_level,
            salary_min=job_data.salary_min,
            salary_max=job_data.salary_max,
            company_id=company_id
        )
        
        # Handle tags
        if job_data.tag_names:
            tags = await TagService.get_or_create_tags(db, job_data.tag_names)
            job.tags = tags
        
        db.add(job)
        await db.commit()
        await db.refresh(job)
        
        # Load relationships
        result = await db.execute(
            select(Job)
            .options(selectinload(Job.tags), selectinload(Job.company))
            .where(Job.id == job.id)
        )
        return result.scalar_one()
    
    @staticmethod
    async def get_job_by_id(db: AsyncSession, job_id: int) -> Optional[Job]:
        """Get job by ID with relationships loaded."""
        result = await db.execute(
            select(Job)
            .options(selectinload(Job.tags), selectinload(Job.company))
            .where(Job.id == job_id)
        )
        return result.scalar_one_or_none()
    
    @staticmethod
    async def update_job(
        db: AsyncSession,
        job: Job,
        job_data: JobUpdate,
        company_id: int
    ) -> Job:
        """Update job posting."""
        # Check ownership
        if job.company_id != company_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to update this job"
            )
        
        # Update fields
        update_data = job_data.dict(exclude_unset=True, exclude={"tag_names"})
        for field, value in update_data.items():
            setattr(job, field, value)
        
        # Handle tags if provided
        if job_data.tag_names is not None:
            tags = await TagService.get_or_create_tags(db, job_data.tag_names)
            job.tags = tags
        
        await db.commit()
        await db.refresh(job)
        
        # Load relationships
        result = await db.execute(
            select(Job)
            .options(selectinload(Job.tags), selectinload(Job.company))
            .where(Job.id == job.id)
        )
        return result.scalar_one()
    
    @staticmethod
    async def delete_job(db: AsyncSession, job: Job, company_id: int) -> bool:
        """Delete job posting."""
        # Check ownership
        if job.company_id != company_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not authorized to delete this job"
            )
        
        await db.delete(job)
        await db.commit()
        return True
    
    @staticmethod
    async def get_jobs_with_filters(
        db: AsyncSession, 
        filters: JobFilter
    ) -> List[Job]:
        """Get jobs with advanced filtering."""
        query = select(Job).options(selectinload(Job.tags), selectinload(Job.company))
        conditions = [Job.is_active == filters.is_active]
        
        if filters.tags:
            tag_names = [tag.strip().lower() for tag in filters.tags.split(",") if tag.strip()]
            if tag_names:
                query = query.join(Job.tags)
                conditions.append(Tag.name.in_(tag_names))
        
        if filters.location:
            conditions.append(Job.location.ilike(f"%{filters.location}%"))
        
        if filters.job_type:
            conditions.append(Job.job_type == filters.job_type)
        
        if filters.job_level:
            conditions.append(Job.job_level == filters.job_level)
        
        if conditions:
            query = query.where(and_(*conditions))
        
        query = query.order_by(Job.created_at.desc()).offset(filters.skip).limit(filters.limit)
        result = await db.execute(query)
        return result.scalars().unique().all()
    
    @staticmethod
    async def get_company_jobs(
        db: AsyncSession, 
        company_id: int,
        skip: int = 0,
        limit: int = 100
    ) -> List[Job]:
        """Get all jobs for a specific company."""
        result = await db.execute(
            select(Job)
            .options(selectinload(Job.tags))
            .where(Job.company_id == company_id)
            .order_by(Job.created_at.desc())
            .offset(skip)
            .limit(limit)
        )
        return result.scalars().all() 
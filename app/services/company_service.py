from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from fastapi import HTTPException, status

from app.models import Company
from app.schemas import CompanyCreate, CompanyUpdate
from app.auth.security import get_password_hash, verify_password


class CompanyService:
    @staticmethod
    async def get_all_companies(db: AsyncSession) -> List[Company]:
        """Get all companies."""
        result = await db.execute(
            select(Company)
            .options(selectinload(Company.jobs))
        )
        return result.scalars().all()

    @staticmethod
    async def create_company(db: AsyncSession, company_data: CompanyCreate) -> Company:
        """Create a new company."""
        # Check if company already exists
        result = await db.execute(
            select(Company).where(Company.email == company_data.email)
        )
        if result.scalar_one_or_none():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        # Create company
        hashed_password = get_password_hash(company_data.password)
        company = Company(
            email=company_data.email,
            company_name=company_data.company_name,
            description=company_data.description,
            website=company_data.website,
            location=company_data.location,
            hashed_password=hashed_password
        )
        
        db.add(company)
        await db.commit()
        await db.refresh(company)
        return company
    
    @staticmethod
    async def authenticate_company(db: AsyncSession, email: str, password: str) -> Optional[Company]:
        """Authenticate company by email and password."""
        result = await db.execute(
            select(Company).where(Company.email == email)
        )
        company = result.scalar_one_or_none()
        
        if not company or not verify_password(password, company.hashed_password):
            return None
        
        return company
    
    @staticmethod
    async def get_company_by_id(db: AsyncSession, company_id: int) -> Optional[Company]:
        """Get company by ID."""
        result = await db.execute(
            select(Company)
            .options(selectinload(Company.jobs))
            .where(Company.id == company_id)
        )
        return result.scalar_one_or_none()
    
    @staticmethod
    async def get_company_by_email(db: AsyncSession, email: str) -> Optional[Company]:
        """Get company by email."""
        result = await db.execute(
            select(Company).where(Company.email == email)
        )
        return result.scalar_one_or_none()
    
    @staticmethod
    async def update_company(
        db: AsyncSession, 
        company: Company, 
        company_data: CompanyUpdate
    ) -> Company:
        """Update company information."""
        update_data = company_data.dict(exclude_unset=True)
        
        for field, value in update_data.items():
            setattr(company, field, value)
        
        await db.commit()
        await db.refresh(company)
        return company 
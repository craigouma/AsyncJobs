from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_db
from app.schemas import CompanyCreate, CompanyUpdate, CompanyOut
from app.services import CompanyService
from app.auth.dependencies import get_current_active_company
from app.models import Company

router = APIRouter(prefix="/companies", tags=["Companies"])


@router.get("/", response_model=List[CompanyOut])
async def list_companies(
    db: AsyncSession = Depends(get_db)
):
    """List all companies (public endpoint)."""
    return await CompanyService.get_all_companies(db)


@router.post("/register", response_model=CompanyOut, status_code=status.HTTP_201_CREATED)
async def register_company(
    company_data: CompanyCreate,
    db: AsyncSession = Depends(get_db)
):
    """Register a new company."""
    return await CompanyService.create_company(db, company_data)


@router.get("/me", response_model=CompanyOut)
async def get_current_company_info(
    current_company: Company = Depends(get_current_active_company)
):
    """Get current company information."""
    return current_company


@router.put("/me", response_model=CompanyOut)
async def update_current_company(
    company_data: CompanyUpdate,
    current_company: Company = Depends(get_current_active_company),
    db: AsyncSession = Depends(get_db)
):
    """Update current company information."""
    return await CompanyService.update_company(db, current_company, company_data)


@router.get("/{company_id}", response_model=CompanyOut)
async def get_company_by_id(
    company_id: int,
    db: AsyncSession = Depends(get_db)
):
    """Get company by ID (public endpoint)."""
    company = await CompanyService.get_company_by_id(db, company_id)
    if not company:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Company not found"
        )
    return company
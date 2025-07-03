from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_db
from app.schemas import TagOut
from app.services import TagService

router = APIRouter(prefix="/tags", tags=["Tags"])


@router.get("/", response_model=List[TagOut])
async def get_all_tags(db: AsyncSession = Depends(get_db)):
    """Get all available tags."""
    return await TagService.get_all_tags(db) 
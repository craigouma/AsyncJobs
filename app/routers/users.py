from typing import Union
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_db
from app.schemas import UserCreate, UserUpdate, UserOut
from app.services import UserService
from app.auth.dependencies import get_current_active_user
from app.models import User, Company

router = APIRouter(prefix="/users", tags=["Users"])


@router.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
async def register_user(
    user_data: UserCreate,
    db: AsyncSession = Depends(get_db)
):
    """Register a new user."""
    return await UserService.create_user(db, user_data)


@router.get("/me", response_model=UserOut)
async def get_current_user_info(
    current_user: Union[User, Company] = Depends(get_current_active_user)
):
    """Get current user information."""
    if isinstance(current_user, Company):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="This endpoint is for users only"
        )
    return current_user


@router.put("/me", response_model=UserOut)
async def update_current_user(
    user_data: UserUpdate,
    current_user: Union[User, Company] = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    """Update current user information."""
    if isinstance(current_user, Company):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="This endpoint is for users only"
        )
    return await UserService.update_user(db, current_user, user_data) 
from typing import Union
from fastapi import Depends, HTTPException, status
from app.models import User, Company
from .security import get_current_user, get_current_company


async def get_current_active_user(
    current_user: Union[User, Company] = Depends(get_current_user)
) -> Union[User, Company]:
    """Get current active user or company."""
    if not current_user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Inactive user"
        )
    return current_user


async def get_current_active_company(
    current_company: Company = Depends(get_current_company)
) -> Company:
    """Get current active company."""
    if not current_company.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Inactive company"
        )
    return current_company 
from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.models import Tag
from app.schemas import TagCreate


class TagService:
    @staticmethod
    async def get_or_create_tag(db: AsyncSession, tag_name: str) -> Tag:
        """Get existing tag or create new one."""
        # Try to get existing tag
        result = await db.execute(
            select(Tag).where(Tag.name == tag_name.lower())
        )
        tag = result.scalar_one_or_none()
        
        if not tag:
            # Create new tag
            tag = Tag(name=tag_name.lower())
            db.add(tag)
            await db.commit()
            await db.refresh(tag)
        
        return tag
    
    @staticmethod
    async def get_or_create_tags(db: AsyncSession, tag_names: List[str]) -> List[Tag]:
        """Get or create multiple tags."""
        tags = []
        for tag_name in tag_names:
            if tag_name.strip():  # Skip empty strings
                tag = await TagService.get_or_create_tag(db, tag_name.strip())
                tags.append(tag)
        return tags
    
    @staticmethod
    async def get_all_tags(db: AsyncSession) -> List[Tag]:
        """Get all tags."""
        result = await db.execute(select(Tag).order_by(Tag.name))
        return result.scalars().all()
    
    @staticmethod
    async def get_tag_by_name(db: AsyncSession, tag_name: str) -> Optional[Tag]:
        """Get tag by name."""
        result = await db.execute(
            select(Tag).where(Tag.name == tag_name.lower())
        )
        return result.scalar_one_or_none() 
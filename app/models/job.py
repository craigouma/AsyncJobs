from sqlalchemy import Column, Integer, String, Text, Boolean, ForeignKey, Enum
from sqlalchemy.orm import relationship
from enum import Enum as PyEnum
from .base import Base, TimestampMixin
from .associations import job_tags_table


class JobType(PyEnum):
    REMOTE = "remote"
    HYBRID = "hybrid"
    ONSITE = "onsite"


class JobLevel(PyEnum):
    ENTRY = "entry"
    MID = "mid"
    SENIOR = "senior"
    LEAD = "lead"
    EXECUTIVE = "executive"


class Job(Base, TimestampMixin):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False, index=True)
    description = Column(Text, nullable=False)
    location = Column(String(255))
    job_type = Column(Enum(JobType), default=JobType.ONSITE)
    job_level = Column(Enum(JobLevel), default=JobLevel.MID)
    salary_min = Column(Integer)
    salary_max = Column(Integer)
    is_active = Column(Boolean, default=True)
    
    # Foreign keys
    company_id = Column(Integer, ForeignKey("companies.id"), nullable=False)
    
    # Relationships
    company = relationship("Company", back_populates="jobs")
    tags = relationship("Tag", secondary=job_tags_table, back_populates="jobs") 
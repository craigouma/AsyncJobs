from sqlalchemy import Table, Column, Integer, ForeignKey
from .base import Base

job_tags_table = Table(
    "job_tags",
    Base.metadata,
    Column("job_id", Integer, ForeignKey("jobs.id"), primary_key=True),
    Column("tag_id", Integer, ForeignKey("tags.id"), primary_key=True),
) 
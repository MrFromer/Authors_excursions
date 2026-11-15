from datetime import datetime
from sqlalchemy import Boolean, CheckConstraint, DateTime, Integer, String, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column
from .database import Base

class Excursion(Base):
    __tablename__='excursions'
    id: Mapped[int]=mapped_column(primary_key=True)
    city: Mapped[str]=mapped_column(String(30),nullable=False)
    title: Mapped[str]=mapped_column(String(100),nullable=False)
    description: Mapped[str]=mapped_column(Text,nullable=False,default='')
    has_children: Mapped[bool]=mapped_column(Boolean,nullable=False,default=False)
    persons_count: Mapped[int]=mapped_column(Integer,nullable=False,default=1)
    date: Mapped[datetime]=mapped_column(DateTime(timezone=True),nullable=False)
    status: Mapped[str]=mapped_column(String(20),nullable=False,default='change')
    __table_args__=(
        CheckConstraint('persons_count BETWEEN 1 AND 100',name='persons_count_range'),
        CheckConstraint("status IN ('approved','disapproved','change')",name='valid_status'),
        UniqueConstraint('city','title','date',name='unique_excursion'),
    )

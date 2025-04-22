from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String
from .base import Base
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .user_guide import User_Guide

class User(Base):
    username: Mapped[str] = mapped_column(String(32), unique=True)
    role: Mapped[str] = mapped_column(String(6), unique=False)
    
    # Отношение один-к-одному с User_Guide
    user_guide: Mapped["User_Guide"] = relationship(
        "User_Guide", 
        back_populates="user",
        uselist=False,
        cascade="all, delete-orphan"  # При удалении User удаляется связанный User_Guide
    )
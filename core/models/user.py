from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String
from .base import Base
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .user_guide import User_Guide
    from .booking import Book

class User(Base):
    username: Mapped[str] = mapped_column(String(32), unique=True)
    role: Mapped[str] = mapped_column(String(6), unique=False)
    
    # Отношение один-к-одному с User_Guide
    user_guide: Mapped["User_Guide"] = relationship(
        "User_Guide", 
        back_populates="user",
        uselist=False,
        cascade="all, delete-orphan",  # При удалении User удаляется связанный User_Guide
        foreign_keys="User_Guide.id" #явная ссылка на гида по внешнему ключу
    )

    booking: Mapped[list["Book"]] = relationship(
        back_populates="user",
        cascade="all, delete-orphan"
    )

    def __str__(self):
        return f"{self.__class__.__name__}(id={self.id}, username={self.username!r})"
    
    def __repr__(self):
        return str(self)
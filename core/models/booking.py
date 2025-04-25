from datetime import datetime, timezone
from sqlalchemy.orm import Mapped, mapped_column, relationship, validates
from sqlalchemy import CheckConstraint, DateTime, String, ForeignKey
from typing import TYPE_CHECKING
from .base import Base
from .mixins import UserRelations

if TYPE_CHECKING:
    from .post import Post_Excurtion

class Book(Base, UserRelations):

    date_book: Mapped[datetime] = mapped_column( # время храниться в UTC
        DateTime, nullable=False
    )  

    #связь с экскурсией
    excursion_id: Mapped[int] = mapped_column(ForeignKey("post_excurtions.id"))
    excursion: Mapped["Post_Excurtion"] = relationship(back_populates="booking")
    
    # Настройки миксина (связь с пользователем)
    _user_id_unique = True
    _user_back_populates = "booking"

    __table_args__ = (
        CheckConstraint(# Для SQLite проверки на дату из прошлого
            "date_book >= datetime('now')", name="date_not_in_past"
        ),  
    )

    @validates("date_book")  # python проверка на дату из прошлого
    def validate_date(self, value):
        if value < datetime.now(timezone.utc).replace(tzinfo=None):
            raise ValueError("Дата экскурсии должна быть в будущем")
        return value
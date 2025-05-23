from sqlalchemy.orm import Mapped, mapped_column, validates, relationship
from sqlalchemy import Boolean, Integer, String, Text, DateTime, CheckConstraint
from datetime import datetime, timezone

from .base import Base
from .mixins import UserGuideRelations
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .excursion_photo import Excursion_Photo
    from .booking import Book


class Post_Excurtion(UserGuideRelations, Base):
    _user_guide_back_populates = "posts"
    _user_back_populates = "posts"

    city: Mapped[str] = mapped_column(String(30))
    title: Mapped[str] = mapped_column(String(100))
    description: Mapped[str] = mapped_column(Text, default="", server_default="")
    has_children: Mapped[bool] = mapped_column(
        Boolean, default=False, server_default="false"
    )
    persons_count: Mapped[int] = mapped_column(
        Integer, nullable=False, default=1, server_default="1"
    )
    date: Mapped[datetime] = mapped_column( # время храниться в UTC
        DateTime, nullable=False
    )  
    status: Mapped[str] = mapped_column(
        String(20), nullable=False, default="change", server_default="change"
    )

    # Связь с фотографиями (исправленный back_populates)
    photos: Mapped[list["Excursion_Photo"]] = relationship(
        back_populates="excursion",  # Теперь совпадает с Excursion_Photo
        cascade="all, delete-orphan"
    )

    booking: Mapped["Book"] = relationship(back_populates="excursion")

    __table_args__ = (
        # CheckConstraint(# Для SQLite проверки на дату из прошлого
        #     "date >= datetime('now')", name="date_not_in_past"
        # ),  
        CheckConstraint(  # проверка, что статус экскурсии один из этих 3-х
            "status IN ('approved', 'disapproved', 'change')",
            name="check_status_values",
        ),
    )

    @validates("date")
    def validate_date(self, key, value):
        if value.tzinfo is not None:
            value = value.replace(tzinfo=None)
        
        if value < datetime.now():
            raise ValueError("Дата экскурсии должна быть в будущем")
        return value
    
    
    def __str__(self):
        return f"{self.__class__.__name__}(id={self.id}, username={self.title!r}, user_guide_id={self.user_guide_id})"
    
    def __repr__(self):
        return str(self)
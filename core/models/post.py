from sqlalchemy.orm import Mapped, mapped_column, validates, relationship
from sqlalchemy import Boolean, Integer, String, Text, DateTime, CheckConstraint
from datetime import datetime, timezone

from .base import Base
from .mixins import UserGuideRelations
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .excursion_photo import Excursion_Photo


class Post_Excurtion(UserGuideRelations, Base):
    _user_guide_back_populates = "posts"
    _user_back_populates = "posts"

    city: Mapped[str] = mapped_column(String(30))
    title: Mapped[str] = mapped_column(String(100))
    description: Mapped[str] = mapped_column(Text, default="", server_default="")
    has_childen: Mapped[bool] = mapped_column(
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
        CheckConstraint(# Для SQLite проверки на дату из прошлого
            "date >= datetime('now')", name="date_not_in_past"
        ),  
        CheckConstraint(  # проверка, что статус экскурсии один из этих 3-х
            "status IN ('approved', 'disapproved', 'change')",
            name="check_status_values",
        ),
    )

    @validates("date")  # python проверка на дату из прошлого
    def validate_date(self, value):
        if value < datetime.now(timezone.utc).replace(tzinfo=None):
            raise ValueError("Дата экскурсии должна быть в будущем")
        return value
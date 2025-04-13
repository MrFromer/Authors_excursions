from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Text, ForeignKey

from typing import TYPE_CHECKING
from .base import Base

if TYPE_CHECKING:
    from .user_guide import User_Guide

class Post_Excurtion(Base):
    title: Mapped[str] = mapped_column(String(100))
    body: Mapped[str] = mapped_column(
        Text,
        default="",
        server_default="",
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("user_guides.id"),
    )

    user_guide: Mapped["User_Guide"] = relationship(back_populates="post_excutions")
    
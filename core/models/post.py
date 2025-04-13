from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Text, ForeignKey

from .base import Base


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
    
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String

from .base import Base


class User_Guide(Base):
    username: Mapped[str] = mapped_column(String(32), unique=True)
    
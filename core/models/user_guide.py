from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String
from typing import TYPE_CHECKING

from .base import Base

if TYPE_CHECKING:
    from .post import Post_Excurtion

class User_Guide(Base):
    username: Mapped[str] = mapped_column(String(32), unique=True)
    
    post_excutions: Mapped[list["Post_Excurtion"]] = relationship(back_populates="user_guide")
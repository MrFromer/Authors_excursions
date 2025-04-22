from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, ForeignKey
from typing import TYPE_CHECKING

from .mixins import UserGuideRelations
from .base import Base


class Profile_Guide(UserGuideRelations, Base):
    _user_guide_id_unique = True
    _user_guide_back_populates = "profile_guide"
    
    username: Mapped[str] = mapped_column(String(32))
    first_name: Mapped[str] = mapped_column(String(32))
    last_name: Mapped[str] = mapped_column(String(32))
    
    
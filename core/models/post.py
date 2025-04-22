from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Text

from .base import Base
from .mixins import UserGuideRelations, UserRelations

class Post_Excurtion(UserRelations, UserGuideRelations,Base):
    _user_guide_back_populates = "posts"
    _user_back_populates = "posts"

    title: Mapped[str] = mapped_column(String(100))
    body: Mapped[str] = mapped_column(
        Text,
        default="",
        server_default="",
    )

    

    
  
    
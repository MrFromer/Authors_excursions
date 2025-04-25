from datetime import datetime
from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base 
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .post import Post_Excurtion

class Excursion_Photo(Base):

    file_path: Mapped[str] = mapped_column(String(255))  # Путь к файлу
    photo_number: Mapped[int] = mapped_column(
        Integer, nullable=False
    )
    
    # Связь с экскурсией
    excursion_id: Mapped[int] = mapped_column(ForeignKey("post_excurtions.id"))
    excursion: Mapped["Post_Excurtion"] = relationship(back_populates="excursion_photo")
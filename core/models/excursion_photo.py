# from datetime import datetime
# from sqlalchemy import ForeignKey, String
# from sqlalchemy.orm import Mapped, mapped_column, relationship
# from .base import Base 
# from .post import Post_Excurtion

# class ExcursionPhoto(Base):
#     __tablename__ = "excursion_photos"
    
#     id: Mapped[int] = mapped_column(primary_key=True)
#     file_path: Mapped[str] = mapped_column(String(255))  # Путь к файлу
#     is_main: Mapped[bool] = mapped_column(default=False)  # Главное фото
    
#     # Связь с экскурсией
#     excursion_id: Mapped[int] = mapped_column(ForeignKey("post.id"))
#     excursion: Mapped["Post_Excurtion"] = relationship(back_populates="excursion_photo")
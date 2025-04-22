from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, ForeignKey
from typing import TYPE_CHECKING
from .base import Base
from .mixins import UserRelations

if TYPE_CHECKING:
    from .post import Post_Excurtion

class User_Guide(Base, UserRelations):
    __table_args__ = {'extend_existing': True}  # Позволяет переопределить столбец id
    
    # Переопределяем id, делая его FK на User.id
    id: Mapped[int] = mapped_column(
        ForeignKey("users.id"), 
        primary_key=True,
        autoincrement=False  # Отключаем автоинкремент, так как ID берется из User
    )
    
    first_name: Mapped[str] = mapped_column(String(32), unique=False)
    last_name: Mapped[str] = mapped_column(String(32), unique=False)
    avatar: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,  # Поле необязательное
        photo_path="Путь к файлу фотографии",
    )

    post_excutions: Mapped[list["Post_Excurtion"]] = relationship(back_populates="user_guide")
    
    # Настройки миксина
    _user_id_unique = True
    _user_back_populates = "user_guide"
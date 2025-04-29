from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey
from sqlalchemy.orm import declared_attr, Mapped, mapped_column, relationship

if TYPE_CHECKING:
    from .user_guide import User_Guide
    from .user import User

class UserGuideRelations:
    _user_guide_id_nullable: bool = False
    _user_guide_id_unique: bool = False
    _user_guide_back_populates: str | None = None

    #связь по внешнему ключу с гидом
    @declared_attr
    def user_guide_id(cls) -> Mapped[int]:
        return mapped_column(
            ForeignKey("user_guides.id"),
            unique=cls._user_guide_id_unique,
            nullable=cls._user_guide_id_nullable,
        )

    #ссылаемся на гида (создаём связь между ними)
    @declared_attr
    def user_guide(cls) -> Mapped["User_Guide"]:
        return relationship(
            "User_Guide",
            back_populates=cls._user_guide_back_populates,
        )

class UserRelations:
    _user_id_nullable: bool = False
    _user_id_unique: bool = False
    _user_back_populates: str | None = None

    #связь по внешнему ключу с юзером
    @declared_attr
    def user_id(cls) -> Mapped[int]:
        return mapped_column(
            ForeignKey("users.id"),
            unique=cls._user_id_unique,
            nullable=cls._user_id_nullable,
        )

    #ссылаемся на пользователя (создаём связь между ними)
    @declared_attr
    def user(cls) -> Mapped["User"]:
        return relationship(
            "User",
            back_populates=cls._user_back_populates,
        )
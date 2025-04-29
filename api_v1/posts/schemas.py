from datetime import datetime
from pydantic import BaseModel, ConfigDict, field_validator
from typing import Optional, Union

class PostBase(BaseModel):
    city: str
    title: str
    description: str = ""
    has_children: bool = False
    persons_count: int = 1
    date: datetime  # Pydantic сам преобразует строку в datetime
    status: str = "change"

class PostCreate(PostBase):
    user_guide_id: int  # Добавьте это обязательное поле

class PostUpdate(BaseModel):
    city: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    has_children: Optional[bool] = None
    persons_count: Optional[int] = None
    date: Optional[str] = None  # Принимаем как строку
    status: Optional[str] = None
    user_guide_id: Optional[int] = None

    @field_validator('date')
    def validate_date(cls, v):
        if v is None:
            return None
        try:
            # Преобразуем строку в datetime
            dt = datetime.fromisoformat(v.replace('Z', '+00:00'))
            if dt < datetime.now():
                raise ValueError("Дата должна быть в будущем")
            return dt
        except ValueError:
            raise ValueError("Неверный формат даты. Используйте ISO формат (например, 2025-04-29T11:36:36)")

class PostUpdatePartial(BaseModel):
    city: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    has_children: Optional[bool] = None
    persons_count: Optional[int] = None
    date: Optional[Union[datetime, str]] = None  # Принимаем и строку и datetime
    status: Optional[str] = None
    user_guide_id: Optional[int] = None

    @field_validator('date')
    def validate_date(cls, v):
        if v is None:
            return None
        if isinstance(v, str):
            try:
                v = datetime.fromisoformat(v.replace('Z', '+00:00'))
            except ValueError:
                raise ValueError("Invalid date format. Use ISO format (e.g. 2023-12-31T12:00:00)")
        if v < datetime.now():
            raise ValueError("Date must be in the future")
        return v

class Post(PostBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    user_guide_id: int
    user_id: int | None = None  # Сделайте поле необязательным, если оно может отсутствовать
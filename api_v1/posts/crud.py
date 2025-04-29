from datetime import datetime
from typing import Union
from sqlalchemy import select
from sqlalchemy.engine import Result
from sqlalchemy.ext.asyncio import AsyncSession
from core.models import Post_Excurtion
from .schemas import PostCreate, PostUpdate, PostUpdatePartial


async def get_posts(session: AsyncSession) -> list[Post_Excurtion]:
    stmt = select(Post_Excurtion).order_by(Post_Excurtion.id)
    result: Result = await session.execute(stmt)
    posts = result.scalars().all()
    return list(posts)


async def get_post(session: AsyncSession, post_id: int) -> Post_Excurtion | None:
    return await session.get(Post_Excurtion, post_id)


async def create_post(session: AsyncSession, post_in: PostCreate) -> Post_Excurtion:
    post = Post_Excurtion(**post_in.model_dump())
    session.add(post)
    await session.commit()
    return post


async def update_post(
    session: AsyncSession,
    post: Post_Excurtion,
    post_update: Union[PostUpdate, PostUpdatePartial],
    partial: bool = False  # Добавляем параметр partial
) -> Post_Excurtion:
    update_data = post_update.model_dump(exclude_unset=partial)
    
    # Обработка даты, если она есть в обновлении
    if 'date' in update_data:
        if isinstance(update_data['date'], str):
            try:
                update_data['date'] = datetime.fromisoformat(update_data['date'].replace('Z', '+00:00'))
            except ValueError as e:
                raise ValueError(f"Invalid date format: {e}")
    
    # Применяем обновления
    for field, value in update_data.items():
        setattr(post, field, value)
    
    await session.commit()
    await session.refresh(post)
    return post


async def delete_post(
    session: AsyncSession,
    post: Post_Excurtion,
) -> None:
    await session.delete(post)
    await session.commit()
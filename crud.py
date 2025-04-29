import asyncio
from datetime import datetime, timezone

from sqlalchemy import select
from sqlalchemy.engine import Result
from sqlalchemy.orm import joinedload, selectinload
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import db_helper, User, Post_Excurtion, User_Guide


async def create_user(session: AsyncSession, username: str, role: str) -> User:
    user = User(username=username, role=role)
    session.add(user)
    await session.commit()
    print("user", user)
    return user

async def get_user_by_username(session: AsyncSession, username: str) -> User | None:
    stmt = select(User).where(User.username == username)
    # result: Result = await session.execute(stmt)
    # # user: User | None = result.scalar_one_or_none()
    # user: User | None = result.scalar_one()
    user: User | None = await session.scalar(stmt)
    print("found user", username, user)
    return user

async def create_user_guide(
    session: AsyncSession,
    id: int,
    first_name: str | None = None,
    last_name: str | None = None,
) -> User_Guide:
    user_guide = User_Guide(
        id=id,
        first_name=first_name,
        last_name=last_name,
    )
    session.add(user_guide)
    await session.commit()
    return user_guide

async def show_users_with_guide_info(session: AsyncSession):
    stmt = select(User).options(joinedload(User.user_guide)).order_by(User.id) 
    # result: Result = await session.execute(stmt)
    # users = result.scalars()
    users = await session.scalars(stmt)
    for user in users:
        print(user)
        print(user.user_guide.last_name)


async def create_posts_excurtion(
    session: AsyncSession,
    user_guide_id: int,  # ID гида, который создает экскурсию
    title: str,
    city: str,
    description: str = "",  # Используем значение по умолчанию как в модели
    has_children: bool = False,  # Значение по умолчанию
    persons_count: int = 1,  # Значение по умолчанию
    date: datetime = None,  # Должна быть передана или установлена по умолчанию
    status: str = "change"  # Значение по умолчанию
) -> Post_Excurtion:
    if date is None:
        date = datetime.now(timezone.utc)  # Установка текущей даты, если не передана
    post = Post_Excurtion(
        user_guide_id=user_guide_id,  # Важно установить связь с гидом
        city=city,
        title=title,
        description=description,
        has_children=has_children,  # Исправлено: has_children вместо has_childen
        persons_count=persons_count,
        date=date,
        status=status
    )
    session.add(post)
    await session.commit()
    print(post)
    return post

async def get_guides_with_excurtions(
    session: AsyncSession,
):
    stmt = (
        select(User_Guide)
        .options(
            selectinload(User_Guide.posts),
        )
        .order_by(User_Guide.id)
    )
    guides = await session.scalars(stmt)

    # for user in users.unique():  # type: User
    for guide in guides:  # type: User
        print("**" * 10)
        print(guide)
        for excurtion in guide.posts:
            print("-", excurtion)

async def get_excurtions_with_guides(session: AsyncSession):
    stmt = select(Post_Excurtion).options(joinedload(Post_Excurtion.user_guide)).order_by(Post_Excurtion.id)
    posts = await session.scalars(stmt)

    for post in posts:  # type: Post
        print("post:", post)
        print("author:", post.user_guide)


async def main():
    async with db_helper.session_factory() as session:
        #await create_user(session=session, username="nelson", role="guide")
        user_john = await get_user_by_username(session=session,username="john")
        user_bob = await get_user_by_username(session=session,username="bob")
        user_mike = await get_user_by_username(session=session,username="mike")
        user_nelson = await get_user_by_username(session=session,username="nelson")
        #await create_user_guide(session=session, id = user_nelson.id, first_name='nelson', last_name='Oden')
        #await show_users_with_guide_info(session=session)
        # await create_posts_excurtion(
        #     session=session,
        #     user_guide_id=user_bob.id,  # ID гида
        #     title="Экскурсия по Москве",
        #     city="Москва",
        #     description="Интересная экскурсия по центру города",
        #     date=datetime(2025, 5, 15, 10, 0)  # Явное указание даты
        # )

        # await create_posts_excurtion(
        #     session=session,
        #     user_guide_id=user_mike.id,  # ID гида
        #     title="Экскурсия по Москве",
        #     city="Москва",
        #     description="Интересная экскурсия по центру города",
        #     date=datetime(2025, 5, 15, 10, 0)  # Явное указание даты
        # )
        await get_excurtions_with_guides(session=session)

if __name__ == "__main__":
    asyncio.run(main())
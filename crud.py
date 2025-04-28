import asyncio

from sqlalchemy import select
from sqlalchemy.engine import Result
from sqlalchemy.orm import joinedload, selectinload
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import db_helper, User, Post_Excurtion


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

async def main():
    async with db_helper.session_factory() as session:
        #await create_user(session=session, username="john", role="user")
        await get_user_by_username(session=session,username="john")


if __name__ == "__main__":
    asyncio.run(main())
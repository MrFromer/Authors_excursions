from typing import Annotated

from fastapi import Path, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import db_helper, Post_Excurtion

from . import crud


async def post_by_id(
    post_id: Annotated[int, Path],
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> Post_Excurtion:
    post = await crud.get_post(session=session, post_id=post_id)
    if post is not None:
        return post

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Post {post_id} not found!",
    )
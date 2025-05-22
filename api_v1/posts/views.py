from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import db_helper
from . import crud
from .dependencies import post_by_id
from .schemas import Post, PostCreate, PostUpdate, PostUpdatePartial

router = APIRouter(tags=["Posts"])


@router.get("/", response_model=list[Post])
async def get_posts(
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    return await crud.get_posts(session=session)


@router.post(
    "/",
    response_model=Post,
    status_code=status.HTTP_201_CREATED,
)
async def create_post(
    post_in: PostCreate,
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    return await crud.create_post(session=session, post_in=post_in)


@router.get("/{post_id}/", response_model=Post)
async def get_post(
    post: Post = Depends(post_by_id),
):
    return post


@router.put("/{post_id}/")
async def update_post(
    post_update: PostUpdate,
    post: Post = Depends(post_by_id),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    return await crud.update_post(
        session=session,
        post=post,
        post_update=post_update,
    )


@router.patch("/{post_id}/", response_model=Post)
async def update_post_partial(
    post_update: PostUpdatePartial,
    post: Post = Depends(post_by_id),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    try:
        return await crud.update_post(
            session=session,
            post=post,
            post_update=post_update,
            partial=True  # Теперь этот параметр поддерживается
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.delete("/{post_id}/", status_code=status.HTTP_204_NO_CONTENT)
async def delete_post(
    post: Post = Depends(post_by_id),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> None:
    await crud.delete_post(session=session, post=post)
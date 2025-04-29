from fastapi import APIRouter

from .posts.views import router as posts_router
from .demo_auth.views import router as demo_auth_router

router = APIRouter()
router.include_router(router=posts_router, prefix="/posts")
router.include_router(router=demo_auth_router)
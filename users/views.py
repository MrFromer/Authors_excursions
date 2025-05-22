from users.schemas import CreateUser
from fastapi import APIRouter
from users import crud

router = APIRouter(prefix="/users" , tags=["Users"])

@router.post("/")
def create_user(user: CreateUser):
    return crud.create_user(user_in = user)
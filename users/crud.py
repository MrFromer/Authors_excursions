
from users.schemas import CreateUser


def create_user(user_in: CreateUser) -> dict:
    user = user_in.model__dump()
    return {
        "success": True,
        "user": user,
    }
from pydantic import EmailStr, BaseModel, Field
from typing import Annotated
from annotated_types import MinLen, MaxLen

class CreateUser(BaseModel):
    username: Annotated[str, MinLen(5), MaxLen(30)]
    email: EmailStr
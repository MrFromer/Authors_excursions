from datetime import datetime,timezone
from typing import Annotated, Literal
from pydantic import BaseModel, ConfigDict, Field, AwareDatetime, StrictBool, StringConstraints, field_validator, model_validator

City=Annotated[str,StringConstraints(strip_whitespace=True,min_length=1,max_length=30)]
Title=Annotated[str,StringConstraints(strip_whitespace=True,min_length=1,max_length=100)]
Persons=Annotated[int,Field(strict=True,ge=1,le=100)]
Status=Literal['change','approved','disapproved']

def future_date(value):
    if value is not None:
        value=value.astimezone(timezone.utc)
        if value<=datetime.now(timezone.utc):
            raise ValueError('Дата экскурсии должна быть в будущем; укажите часовой пояс')
    return value

class ExcursionCreate(BaseModel):
    model_config=ConfigDict(extra='forbid',json_schema_extra={'example':{
        'city':'Томск','title':'Экскурсия по Томску','description':'Авторская прогулка по историческому центру',
        'has_children':True,'persons_count':8,'date':'2030-06-01T10:00:00Z','status':'change'}})
    city: City
    title: Title
    description: str=Field(default='',max_length=5000)
    has_children: StrictBool=False
    persons_count: Persons=1
    date: AwareDatetime
    status: Status='change'
    validate_date=field_validator('date')(future_date)

class ExcursionPatch(BaseModel):
    model_config=ConfigDict(extra='forbid')
    city: City|None=None
    title: Title|None=None
    description: str|None=Field(default=None,max_length=5000)
    has_children: StrictBool|None=None
    persons_count: Persons|None=None
    date: AwareDatetime|None=None
    status: Status|None=None
    validate_date=field_validator('date')(future_date)

    @model_validator(mode='before')
    @classmethod
    def nonempty_without_nulls(cls,data):
        if isinstance(data,dict) and (not data or any(v is None for v in data.values())):
            raise ValueError('PATCH должен содержать хотя бы одно поле; null не допускается')
        return data

class ExcursionRead(BaseModel):
    model_config=ConfigDict(from_attributes=True)
    id: int
    city: str
    title: str
    description: str
    has_children: bool
    persons_count: int
    date: datetime
    status: Status

class ErrorDetail(BaseModel):
    code: str
    message: str
    details: list[dict[str,str]]|None=None

class ErrorResponse(BaseModel):
    error: ErrorDetail

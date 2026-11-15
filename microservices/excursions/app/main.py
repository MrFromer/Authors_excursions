from contextlib import asynccontextmanager
from typing import Annotated
from fastapi import Depends, FastAPI, HTTPException, Path, Query, Response
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse, RedirectResponse
from sqlalchemy import select,text
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from sqlalchemy.orm import Session
from starlette.exceptions import HTTPException as StarletteHTTPException
from .database import Base, engine, session_dependency
from .models import Excursion
from .schemas import City, ExcursionCreate, ExcursionPatch, ExcursionRead, ErrorResponse

@asynccontextmanager
async def lifespan(app):
    Base.metadata.create_all(engine)
    yield
    engine.dispose()

app=FastAPI(title='Authors Excursions — каталог экскурсий',version='1.0.0',lifespan=lifespan,
    responses={code:{'model':ErrorResponse} for code in (404,409,422,503)},
    description='Самостоятельный сервис каталога из учебного Authors_excursions. Даты в ISO 8601 с часовым поясом, например 2030-06-01T10:00:00Z. Для PATCH передаются только изменяемые поля.')

def error_response(status,code,message,details=None):
    error={'code':code,'message':message}
    if details is not None: error['details']=details
    return JSONResponse(status_code=status,content={'error':error})

@app.exception_handler(RequestValidationError)
async def invalid_request(request,exc):
    return error_response(422,'VALIDATION_ERROR','Некорректные данные запроса',[
        {'field':'.'.join(str(p) for p in e['loc']),'message':e['msg']} for e in exc.errors()])

@app.exception_handler(StarletteHTTPException)
async def http_error(request,exc):
    return error_response(exc.status_code,'NOT_FOUND' if exc.status_code==404 else 'HTTP_ERROR',str(exc.detail))

@app.exception_handler(SQLAlchemyError)
async def database_error(request,exc):
    return error_response(503,'DATABASE_UNAVAILABLE','База данных временно недоступна. Повторите запрос позже.')

SessionDep=Annotated[Session,Depends(session_dependency)]
Id=Annotated[int,Path(ge=1)]
prefix='/api/v1/excursions'

def find(session,id):
    item=session.get(Excursion,id)
    if item is None: raise HTTPException(404,'Экскурсия не найдена')
    return item

def commit(session):
    try:
        session.commit()
    except IntegrityError:
        session.rollback()
        raise HTTPException(409,'Экскурсия с такими городом, названием и датой уже существует')

@app.exception_handler(HTTPException)
async def resource_error(request,exc):
    codes={404:'NOT_FOUND',409:'CONFLICT'}
    return error_response(exc.status_code,codes.get(exc.status_code,'HTTP_ERROR'),str(exc.detail))

@app.get('/',include_in_schema=False)
def index():
    return RedirectResponse('/docs')

@app.get('/health',tags=['Состояние'])
def health(session:SessionDep):
    session.execute(text('SELECT 1'))
    return {'status':'ok','database':'ok'}

@app.get(prefix,response_model=list[ExcursionRead],tags=['Экскурсии'],summary='Список экскурсий')
def list_excursions(session:SessionDep,city:City|None=None,limit:int=Query(20,ge=1,le=100),offset:int=Query(0,ge=0)):
    query=select(Excursion).order_by(Excursion.id).limit(limit).offset(offset)
    if city is not None: query=query.where(Excursion.city==city)
    return session.scalars(query).all()

@app.post(prefix,response_model=ExcursionRead,status_code=201,tags=['Экскурсии'],summary='Создать экскурсию')
def create_excursion(body:ExcursionCreate,response:Response,session:SessionDep):
    item=Excursion(**body.model_dump());session.add(item);commit(session)
    response.headers['Location']=f'{prefix}/{item.id}'
    return item

@app.get(prefix+'/{excursion_id}',response_model=ExcursionRead,tags=['Экскурсии'],summary='Получить экскурсию')
def read_excursion(excursion_id:Id,session:SessionDep):
    return find(session,excursion_id)

@app.put(prefix+'/{excursion_id}',response_model=ExcursionRead,tags=['Экскурсии'],summary='Полностью заменить экскурсию')
def replace_excursion(excursion_id:Id,body:ExcursionCreate,session:SessionDep):
    item=find(session,excursion_id)
    for k,v in body.model_dump().items(): setattr(item,k,v)
    commit(session)
    return item

@app.patch(prefix+'/{excursion_id}',response_model=ExcursionRead,tags=['Экскурсии'],summary='Частично изменить экскурсию')
def patch_excursion(excursion_id:Id,body:ExcursionPatch,session:SessionDep):
    item=find(session,excursion_id)
    for k,v in body.model_dump(exclude_unset=True).items(): setattr(item,k,v)
    commit(session)
    return item

@app.delete(prefix+'/{excursion_id}',status_code=204,tags=['Экскурсии'],summary='Удалить экскурсию')
def delete_excursion(excursion_id:Id,session:SessionDep):
    session.delete(find(session,excursion_id));commit(session)
    return Response(status_code=204)

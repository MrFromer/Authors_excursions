import os
from sqlalchemy import URL, create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

class Base(DeclarativeBase):
    pass

url = URL.create('postgresql+psycopg', username=os.environ['POSTGRES_USER'], password=os.environ['POSTGRES_PASSWORD'],
                 host=os.getenv('POSTGRES_HOST','db'), port=int(os.getenv('POSTGRES_PORT','5432')), database=os.environ['POSTGRES_DB'])
engine = create_engine(url, pool_pre_ping=True, pool_size=3, max_overflow=2, connect_args={'connect_timeout':3})
SessionLocal = sessionmaker(engine, expire_on_commit=False)

def session_dependency():
    with SessionLocal() as session:
        yield session

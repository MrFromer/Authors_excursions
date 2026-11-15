from datetime import datetime, timedelta, timezone
import os
import uuid

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import delete
from app.main import app
from app.database import SessionLocal, engine, Base
from app.models import Excursion

@pytest.fixture()
def client():
    assert os.environ['POSTGRES_DB'].endswith('_test'), 'Tests must use a separate database'
    with TestClient(app) as c:
        with SessionLocal() as session:
            session.execute(delete(Excursion)); session.commit()
        yield c

def payload(**updates):
    return dict(city='Томск', title='Экскурсия '+uuid.uuid4().hex[:8], description='Учебная прогулка', persons_count=5, has_children=True,
                date=(datetime.now(timezone.utc)+timedelta(days=30)).isoformat(), status='change', **updates)

def test_crud(client):
    data=payload()
    r=client.post('/api/v1/excursions',json=data); assert r.status_code==201
    id=r.json()['id']; url=f'/api/v1/excursions/{id}'
    assert r.headers['location']==url
    assert client.get(url).json()['title']==data['title']
    assert client.get('/api/v1/excursions',params={'city':'Томск'}).json()[0]['id']==id
    replacement={**data,'title':'Новая экскурсия','description':'Полная замена'}
    assert client.put(url,json=replacement).json()['title']=='Новая экскурсия'
    assert client.patch(url,json={'status':'approved'}).json()['status']=='approved'
    assert client.delete(url).status_code==204
    assert client.get(url).status_code==404

@pytest.mark.parametrize('update',[
    {'title':'  '},{'city':'x'*31},{'persons_count':0},{'persons_count':True},
    {'status':'unknown'},{'has_children':'yes'},{'unknown_field':1},
    {'date':'yesterday'},{'date':'2020-01-01T10:00:00Z'},{'date':'2030-01-01T10:00:00'}
])
def test_invalid_create_keeps_service_alive(client,update):
    data=payload();data.update(update)
    r=client.post('/api/v1/excursions',json=data)
    assert r.status_code==422
    assert r.json()['error']['code']=='VALIDATION_ERROR'
    assert client.get('/health').status_code==200

def test_duplicate_rollback(client):
    data=payload()
    assert client.post('/api/v1/excursions',json=data).status_code==201
    assert client.post('/api/v1/excursions',json=data).status_code==409
    assert client.post('/api/v1/excursions',json=payload()).status_code==201

@pytest.mark.parametrize('update',[{}, {'title':None},{'date':None},{'persons_count':-1}])
def test_invalid_patch_is_atomic(client,update):
    data=payload();r=client.post('/api/v1/excursions',json=data);url=f"/api/v1/excursions/{r.json()['id']}"
    assert client.patch(url,json=update).status_code==422
    assert client.get(url).json()['title']==data['title']

def test_bad_json_and_query(client):
    assert client.post('/api/v1/excursions',content='{broken',headers={'Content-Type':'application/json'}).status_code==422
    assert client.get('/api/v1/excursions',params={'limit':-1}).status_code==422
    assert client.get('/api/v1/excursions/not-a-number').status_code==422
    assert client.get('/api/v1/excursions/999999').status_code==404
    assert client.get('/health').status_code==200

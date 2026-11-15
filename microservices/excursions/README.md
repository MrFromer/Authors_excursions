# Каталог экскурсий — ЛР12

Самостоятельный REST-сервис, выделенный из учебного Authors_excursions: Python, FastAPI, SQLAlchemy, PostgreSQL 16. Реализован только каталог экскурсий; пользователи, бронирования, фотографии и клиентские приложения исходного проекта в эту работу не входят.

## Запуск

Нужны Git, Docker Engine и Docker Compose v2. Команды ниже для Linux/ВМ с sudo; при настроенном доступе к Docker без sudo его можно убрать.

```bash
git clone --branch lab12-excursions-service https://github.com/MrFromer/Authors_excursions.git
cd Authors_excursions/microservices/excursions
cp .env.example .env
chmod 600 .env
# Откройте .env и замените POSTGRES_PASSWORD своим случайным паролем.
mkdir -p evidence
sudo docker compose up -d --build --wait
curl http://127.0.0.1:8000/health
```

Swagger: http://127.0.0.1:8000/docs. Adminer: http://127.0.0.1:8088 — движок PostgreSQL, сервер `db`, пользователь и БД `excursions`, пароль из `.env`. Порты опубликованы только на localhost. Контейнеры связываются внутри сети Compose. PostgreSQL хранит данные в именованном томе `pgdata`. `docker compose down` сохраняет том; **`down -v` удаляет данные**.

При первом запуске SQLAlchemy создаёт таблицу `excursions`; `db/init.sql` создаёт отдельную БД `excursions_test` для тестов. Скрипты init PostgreSQL выполняются только на пустом томе. Это учебная схема без системы миграций.

## REST

Префикс `/api/v1/excursions`:

- `GET /` — список; фильтр `city`, пагинация `limit` (1–100), `offset` (от 0).
- `POST /` — создание, 201 и заголовок Location.
- `GET /{id}` — чтение одной записи, 200.
- `PUT /{id}` — полная замена, 200.
- `PATCH /{id}` — частичное изменение, 200.
- `DELETE /{id}` — удаление, 204 без тела.

Конечный слеш в примерах списка выше обозначает базовый маршрут: фактический URL — `/api/v1/excursions` без завершающего слеша. `/health` проверяет соединение с БД.

Пример POST (в Swagger: раскрыть POST → Try it out → Execute):

```json
{
  "city": "Томск",
  "title": "Прогулка по Томску",
  "description": "Исторический центр",
  "has_children": true,
  "persons_count": 8,
  "date": "2030-08-01T10:00:00Z",
  "status": "change"
}
```

Скопируйте возвращённый `id` для GET/PATCH/PUT/DELETE. Для PATCH достаточно `{"persons_count": 10}`. Для новой записи после удаления или повторной демонстрации используйте уникальное название/дату. Дата должна оставаться в будущем и содержать часовой пояс.

Проверяются непустые city/title, длины полей, число участников 1–100, строгие типы, дата в будущем, status из `change/approved/disapproved`. Неизвестные поля, пустой PATCH и null запрещены. Ошибки: 422 — некорректный запрос; 404 — нет записи; 409 — повтор city/title/date; 503 — БД недоступна. Ответ имеет форму `{"error":{"code":"...","message":"..."}}`, при 422 также есть details. Обработчики и rollback сохраняют работоспособность сервиса.

## Проверки

```bash
sudo docker compose --profile test run --build --rm tests
sudo docker compose --profile checks run --rm postman
```

Проверено на реальном PostgreSQL: **17 pytest-тестов**, **22 запроса / 40 проверок Postman**, 0 ошибок. В pytest есть одно предупреждение библиотеки Starlette/AnyIO, не влияющее на результат. Newman — официальный консольный запуск коллекций Postman; desktop-интерфейс Postman не использовался.

Для показа в Postman: Import → файл `postman/excursions.postman_collection.json` → переменная коллекции `base_url` → Run collection. Для локального Docker укажите `http://127.0.0.1:8000`, для туннеля ниже оставьте `http://127.0.0.1:18000`. Коллекция генерирует отдельную запись и удаляет её после проверки; демоданные не удаляются. JSON и JUnit результаты Newman сохраняются в `evidence/` и не попадают в Git.

Dockerfile содержит стадии `builder` (wheel-зависимости), `runtime` (приложение), `test` (pytest) и `production` (конечный образ без тестовых зависимостей). Процесс API работает от UID 10001. API ждёт готовности PostgreSQL через healthcheck.

## Готовая ВМ и другой ноутбук

Проект на ВМ: `/home/user1/lab12/excursions`, адрес `194.113.35.227`. Оставьте это окно терминала открытым:

```powershell
ssh -N -o ExitOnForwardFailure=yes -L 127.0.0.1:18000:127.0.0.1:8000 -L 127.0.0.1:18088:127.0.0.1:8088 user1@194.113.35.227
```

При нестандартном расположении ключа добавьте `-i "путь_к_приватному_ключу"`. Откройте [Swagger](http://127.0.0.1:18000/docs) и [Adminer](http://127.0.0.1:18088). Пароль БД можно посмотреть отдельно через SSH:

```bash
ssh user1@194.113.35.227 'grep POSTGRES_PASSWORD ~/lab12/excursions/.env'
```

Не публикуйте этот пароль и приватный ключ. База и пользователь: `excursions`, сервер в форме Adminer: `db`, движок PostgreSQL.

Для перезапуска или проверки на ВМ:

```bash
cd ~/lab12/excursions
sudo docker compose ps
sudo docker compose up -d --build --wait
sudo docker compose logs --tail=30 api
sudo docker compose exec db psql -U excursions -d excursions
```

Сервис предназначен для учебной демонстрации через SSH: авторизации пользователей и публичного доступа к API здесь нет. GitLab/Jenkins предыдущей работы продолжают работать отдельно.

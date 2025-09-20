# Проект по доставке напоминаний зарегистрированным пользователям

## Стек используемых технологий:
* Backend: FastApi, Celery
* Frontend: Angular
* СУБД: SQLite

## Для запуска бэкэнда необходимо:
1. Перейти в директорию **NotificationService\server**
2. Прописать в терминале команду **pip install -r requirements.txt**
3. Прописать в терминале команду **docker compose up**
4. Прописать в терминал команду **uvicorn src.main:app --reload**
5. Прописать в терминал команду **celery -A src.worker worker -l info -P solo**

## Для запуска тестов бэкэнда необходимо:
1. Перейти в директорию **NotificationService\server**
2. Прописать в терминале команду **python -m unittest src.tests.test_notification**

## Для запуска фронтенда необходимо:
1. Перейти в директорию **NotificationService\client\notification-service**
2. Прописать в терминале команду **ng serve**
3. Перейти в браузере по адресу **http://localhost:4200/**

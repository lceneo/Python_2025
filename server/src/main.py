from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from .database.database import Base, engine, SessionLocal
from .database.init import init_db_data
from .notifications.orm_schemas import NotificationORM, NotificationTaskORM
from .auth.orm_schemas import RoleORM, UserORM
from .router import main_router

app = FastAPI()
app.include_router(main_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # или ["*"] для разрешения запросов со всех доменов
    allow_credentials=True,
    allow_methods=["*"],  # разрешить все HTTP методы
    allow_headers=["*"],  # разрешить все заголовки
)
Base.metadata.create_all(bind=engine)
db = SessionLocal()
try:
    init_db_data(db)
finally:
    db.close()

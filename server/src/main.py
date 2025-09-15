from fastapi import FastAPI
from .database.database import Base, engine, SessionLocal
from .database.init import init_db_data
from .router import main_router

app = FastAPI()
app.include_router(main_router)
Base.metadata.create_all(bind=engine)
db = SessionLocal()
try:
    init_db_data(db)
finally:
    db.close()
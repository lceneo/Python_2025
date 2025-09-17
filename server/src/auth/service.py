from sqlalchemy.orm import Session
from .orm_schemas import UserORM


def get_user_by_name(user_name: str, db: Session) -> type[UserORM] | None:
    return db.query(UserORM).filter(UserORM.user_name == user_name).first()

def get_user(user_id: int, db: Session) -> type[UserORM] | None:
    return db.query(UserORM).get(user_id)
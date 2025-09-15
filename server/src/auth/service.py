from sqlalchemy.orm import Session
from .orm_schemas import UserORM


def get_user(user_name: str, db: Session) -> type[UserORM] | None:
    return db.query(UserORM).filter(UserORM.user_name == user_name).first()

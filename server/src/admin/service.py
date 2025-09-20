from sqlalchemy.exc import NoResultFound
from sqlalchemy.orm import Session
from ..auth.orm_schemas import UserORM
from ..auth.types.roles_enum import RoleEnum
from ..notifications.orm_schemas import NotificationORM


def set_user_ban_state(user_id: int, ban_state: bool, db: Session):
    user = db.query(UserORM).get(user_id)
    if user:
        user.user_banned = ban_state
        db.commit()
    else:
        raise Exception("User doesn't exist")

def get_all_notifications(db: Session):
    return db.query(NotificationORM).all()

def get_all_users(db: Session):
    return db.query(UserORM).filter(UserORM.role_id == RoleEnum.USER.value).all()
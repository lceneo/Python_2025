from sqlalchemy.orm import Session
from ..auth.orm_schemas import UserORM
from ..notifications.orm_schemas import NotificationORM


def set_user_ban_state(user_id: int, ban_state: bool, db: Session):
    user = db.query(UserORM).get(UserORM.user_id == user_id)
    if user:
        user.user_banned = ban_state
        db.commit()
    else:
        raise Exception("User doesn't exist")

def get_all_notifications(db: Session):
    return db.query(NotificationORM).all()
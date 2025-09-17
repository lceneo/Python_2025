from sqlalchemy.orm import Session
from ..auth.orm_schemas import RoleORM, UserORM
from ..auth.types.roles_enum import RoleEnum


def init_db_data(db: Session):
    if db.query(RoleORM).count() == 0:
        roles = [RoleORM(role_name="admin", role_id=RoleEnum.ADMIN.value),
                 RoleORM(role_name="user", role_id=RoleEnum.USER.value)]
        db.add_all(roles)
    if db.query(UserORM).count() == 0:
        users = [UserORM(user_name="admin", role_id=RoleEnum.ADMIN.value, user_email="admin@mail.ru"),
                 UserORM(user_name="user", role_id=RoleEnum.USER.value, user_email="nikita.karpinskiy@mail.ru")]
        db.add_all(users)
    db.commit()
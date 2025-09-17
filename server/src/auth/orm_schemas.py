from sqlalchemy import ForeignKey
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm.attributes import Mapped
from ..database.database import Base

class RoleORM(Base):
    __tablename__ = 'roles'
    role_id: Mapped[int] = mapped_column(primary_key=True)
    role_name: Mapped[str] = mapped_column(unique=True)

class UserORM(Base):
    __tablename__ = 'users'
    user_id: Mapped[int] = mapped_column(primary_key=True)
    user_name: Mapped[str] = mapped_column(unique=True)
    user_email: Mapped[str] = mapped_column(unique=True)
    role_id: Mapped[int] = mapped_column(ForeignKey('roles.role_id'))
    user_banned: Mapped[bool] = mapped_column(default=False)

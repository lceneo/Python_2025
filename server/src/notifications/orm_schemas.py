from datetime import datetime
from sqlalchemy import ForeignKey, DateTime
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm.attributes import Mapped
from sqlalchemy_utc import UtcDateTime

from ..database.database import Base

class NotificationORM(Base):
    __tablename__ = 'notifications'
    notification_id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey('users.user_id'))
    notification_text: Mapped[str] = mapped_column(nullable=False)
    notification_time: Mapped[datetime] = mapped_column(UtcDateTime, nullable=False)

class NotificationTaskORM(Base):
    __tablename__ = 'notifications_tasks'
    task_id: Mapped[str] = mapped_column(primary_key=True)
    notification_id: Mapped[int] = mapped_column(ForeignKey('notifications.notification_id'))

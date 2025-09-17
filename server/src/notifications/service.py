from sqlalchemy.orm import Session
from .orm_schemas import NotificationORM, NotificationTaskORM
from .pydantic_schemas import CreateNotificationSchema, ChangeNotificationSchema
from ..auth.orm_schemas import UserORM
from ..worker import send_ya_mail_task, celery_app
from ..auth.service import get_user


def get_user_notifications(user_id: int, db: Session):
    return db.query(NotificationORM).filter(NotificationORM.user_id == user_id).all()

def get_task_by_notification(notification_id: int, db: Session) -> NotificationTaskORM | None:
    return db.query(NotificationTaskORM).filter(NotificationTaskORM.notification_id == notification_id).first()

def create_user_notification(user_id: int, notification: CreateNotificationSchema, db: Session):
    new_notification = NotificationORM(
        user_id=user_id,
        notification_text=notification.notification_text,
        notification_time=notification.notification_time
    )
    db.add(new_notification)
    db.commit()
    db.refresh(new_notification)
    user = get_user(user_id, db)
    notification_task = send_ya_mail_task.apply_async(
        args=[user.user_email, new_notification.notification_text],
        eta=new_notification.notification_time)
    notification_task_orm = NotificationTaskORM(
        notification_id = new_notification.notification_id,
        task_id = notification_task.id
    )
    db.add(notification_task_orm)
    db.commit()
    return new_notification

def change_user_notification(notification_id: int, changed_notification: ChangeNotificationSchema, db: Session):
    notification = db.query(NotificationORM).get(notification_id)
    if not notification:
       raise Exception("Notification with specified id doesn't exist")
    update_data = changed_notification.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        if field != "notification_id":
            setattr(notification, field, value)
    if update_data.get("notification_time"):
        owner_of_notification = db.query(UserORM).get(notification.user_id)
        task_to_revoke = get_task_by_notification(notification_id, db)
        celery_app.control.revoke(task_id=task_to_revoke.task_id, terminate=True)
        notification_task = send_ya_mail_task.apply_async(
            args=[owner_of_notification.user_email, notification.notification_text],
            eta=notification.notification_time)
        notification_task_orm = NotificationTaskORM(
            notification_id=notification.notification_id,
            task_id=notification_task.id
        )
        db.delete(task_to_revoke)
        db.add(notification_task_orm)
    db.commit()

def delete_user_notification(notification_id: int, db: Session):
    notification_to_delete = db.query(NotificationORM).get(notification_id)
    if not notification_to_delete:
       raise Exception("Notification with specified id doesn't exist")
    task_to_delete = get_task_by_notification(notification_id, db)
    celery_app.control.revoke(task_id=task_to_delete.task_id, terminate=True)
    db.delete(notification_to_delete)
    db.delete(task_to_delete)
    db.commit()



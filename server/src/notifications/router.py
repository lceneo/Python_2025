from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .pydantic_schemas import CreateNotificationSchema, ChangeNotificationSchema
from .service import get_user_notifications, create_user_notification, delete_user_notification, \
    change_user_notification
from ..auth.config import security
from ..auth.middlewares.get_user_id_from_token import get_user_id_from_token
from ..database.database import get_db

router = APIRouter(
    prefix="/notifications",
    tags=["notifications"],
    dependencies = [Depends(security.access_token_required)]
)

@router.get("/get")
async def get_notifications_endpoint(user_id = Depends(get_user_id_from_token), db: Session = Depends(get_db)):
    return get_user_notifications(user_id, db)

@router.post("/create")
async def create_notification_endpoint(notification: CreateNotificationSchema, user_id = Depends(get_user_id_from_token), db: Session = Depends(get_db)):
    try:
        return create_user_notification(user_id, notification, db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/change")
async def change_notification_endpoint(notification_id: int, changed_notification: ChangeNotificationSchema, db: Session = Depends(get_db)):
    try:
        return change_user_notification(notification_id, changed_notification, db)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.delete("/delete")
async def delete_notification_endpoint(notification_id: int, db: Session = Depends(get_db)):
    try:
        delete_user_notification(notification_id, db)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

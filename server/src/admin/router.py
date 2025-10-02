from fastapi import APIRouter, HTTPException, Response, Depends
from sqlalchemy.orm import Session
from .pydantic_schemas import UserBanSchema
from .service import set_user_ban_state, get_all_notifications, get_all_users
from ..auth.middlewares.is_admin_middleware import is_admin
from ..database.database import get_db

router = APIRouter(
    prefix="/admin",
    tags=["admin"],
    dependencies=[Depends(is_admin)]
)

@router.post("/user_ban_state")
async def set_user_ban_state_endpoint(creds: UserBanSchema, db: Session = Depends(get_db)):
    if (creds.is_banned and creds.ban_reason is None):
        raise HTTPException(status_code=400, detail="Ban reason is required")
    try:
        set_user_ban_state(creds.user_id, creds.is_banned, creds.ban_reason, db)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.get("/get_all_notifications")
async def get_all_notifications_endpoint(db: Session = Depends(get_db)):
    return get_all_notifications(db)

@router.get("/get_all_users")
async def get_all_users_endpoint(db: Session = Depends(get_db)):
    return get_all_users(db)
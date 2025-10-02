from fastapi import APIRouter, HTTPException, Response, Depends
from sqlalchemy.orm import Session
from .config import security, config as auth_config
from .pydantic_schemas import UserLoginSchema
from .service import get_user_by_name
from ..database.database import get_db

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/login")
async def login(creds: UserLoginSchema, response: Response, db: Session = Depends(get_db)):
    user = get_user_by_name(creds.username, db)
    if user is None:
        raise HTTPException(status_code=404, detail="User doesn't exist")
    elif user.user_banned:
        raise HTTPException(status_code=403, detail=f"Banned for {str(user.ban_reason)}")
    token = security.create_access_token(uid = str(user.user_id), data={ "username": creds.username, "role_id": user.role_id })
    response.set_cookie(auth_config.JWT_ACCESS_COOKIE_NAME, token)
    return token

@router.post("/logout", dependencies = [Depends(security.access_token_required)])
async def logout(response: Response):
    response.delete_cookie(auth_config.JWT_ACCESS_COOKIE_NAME)
from fastapi import APIRouter, HTTPException, Response, Depends
from sqlalchemy.orm import Session

from .config import security, config as auth_config
from .pydantic_schemas import UserLoginSchema
from .service import get_user
from ..database.database import get_db

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/login")
async def login(creds: UserLoginSchema, response: Response, db: Session = Depends(get_db)):
    user = get_user(creds.username, db)
    if user:
        token = security.create_access_token(uid = str(user.user_id), identity=creds.username, role="role_test")
        response.set_cookie(auth_config.JWT_ACCESS_COOKIE_NAME, token)
        return token
    raise HTTPException(status_code=401, detail="Incorrect username")

@router.post("/logout", dependencies = [Depends(security.access_token_required)])
async def protected(response: Response):
    response.delete_cookie(auth_config.JWT_ACCESS_COOKIE_NAME)
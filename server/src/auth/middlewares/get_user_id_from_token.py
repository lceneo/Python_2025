from authx import TokenPayload
from fastapi import Request, HTTPException, Depends
from ..config import config as auth_config, security


def get_user_id_from_token(payload: TokenPayload = Depends(security.access_token_required)):
    return int(payload.sub)
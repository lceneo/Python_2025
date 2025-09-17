from authx import TokenPayload
from fastapi import Depends, HTTPException
from ..config import security
from ..types.roles_enum import RoleEnum


def is_admin(payload: TokenPayload = Depends(security.access_token_required)):
    user_role_id = getattr(payload, "role_id")
    if user_role_id != RoleEnum.ADMIN.value:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return payload
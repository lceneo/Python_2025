from typing import Optional

from pydantic import BaseModel


class UserBanSchema(BaseModel):
    user_id: int
    is_banned: bool
    ban_reason: Optional[str] = None
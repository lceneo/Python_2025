from pydantic import BaseModel


class UserBanSchema(BaseModel):
    user_id: int
    is_banned: bool
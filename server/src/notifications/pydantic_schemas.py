from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class CreateNotificationSchema(BaseModel):
    notification_text: str
    notification_time: datetime

class ChangeNotificationSchema(BaseModel):
    notification_text: Optional[str] = None
    notification_time: Optional[datetime] = None
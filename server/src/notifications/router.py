from fastapi import APIRouter

router = APIRouter(prefix="/notifications", tags=["notifications"])

@router.get("/get_notifications")
async def get_notifications():
    return {"message": "Список задач"}
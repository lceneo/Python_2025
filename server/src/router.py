from fastapi import APIRouter
from .auth.router import router as auth_router
from .notifications.router import router as notifications_router

main_router = APIRouter()
main_router.include_router(auth_router)
main_router.include_router(notifications_router)
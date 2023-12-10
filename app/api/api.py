from fastapi import APIRouter

from app.api.api_v1.restaurants import router as restaurants_router
from app.api.api_v1.upload import router as upload_router

api_router = APIRouter()
api_router.include_router(
    restaurants_router, prefix="/restaurants", tags=["restaurants"]
)
api_router.include_router(upload_router, prefix="/upload", tags=["upload"])
from fastapi import APIRouter, Query, Depends
from sqlmodel import Session

from app.utils.deps import get_session
from app import crud
from app.schema.restaurant import RestaurantsCreate, RestaurantsRead

router = APIRouter()


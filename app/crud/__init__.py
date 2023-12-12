from app.crud.crud_base import CRUDBase

from app.schema.restaurant import Restaurants, RestaurantsCreate, RestaurantsUpdate
from app.schema.card import Cards, CardsCreate, CardsUpdate

restaurants = CRUDBase[Restaurants, RestaurantsCreate, RestaurantsUpdate](Restaurants)
cards = CRUDBase[Cards, CardsCreate, CardsUpdate](Cards)

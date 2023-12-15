from crud.crud_base import CRUDBase

from schema.restaurant import Restaurants, RestaurantsCreate, RestaurantsUpdate
from schema.card import Cards, CardsCreate, CardsUpdate

restaurants = CRUDBase[Restaurants, RestaurantsCreate, RestaurantsUpdate](Restaurants)
cards = CRUDBase[Cards, CardsCreate, CardsUpdate](Cards)

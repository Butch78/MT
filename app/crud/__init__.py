from app.crud.crud_base import CRUDBase

from app.schema.restaurant import Restaurants, RestaurantsCreate, RestaurantsUpdate

restaurants = CRUDBase[Restaurants, RestaurantsCreate, RestaurantsUpdate](Restaurants)

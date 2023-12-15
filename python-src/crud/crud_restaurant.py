from crud.crud_base import CRUDBase

from schema.restaurant import Restaurants, RestaurantsCreate, RestaurantsUpdate


class CRUDRestaurant(CRUDBase[Restaurants, RestaurantsCreate, RestaurantsUpdate]):
    pass

restaurant = CRUDRestaurant(Restaurants)

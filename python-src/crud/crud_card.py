from crud.crud_base import CRUDBase

from schema.card import Cards, CardsCreate, CardsUpdate


class CRUDCard(CRUDBase[Cards, CardsCreate, CardsUpdate]):
    pass


card = CRUDCard(Cards)

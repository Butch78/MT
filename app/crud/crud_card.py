from app.crud.crud_base import CRUDBase

from app.schema.card import Cards, CardsCreate, CardsUpdate


class CRUDCard(CRUDBase[Cards, CardsCreate, CardsUpdate]):
    pass


card = CRUDCard(Cards)

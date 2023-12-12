from pydantic import BaseModel, Field
from sqlmodel import SQLModel

from typing import Optional


# Used primarily for Llamaindex for parsing PDf -> Card object
class Card(BaseModel):
    """Data model for card, It contains the question and answer"""

    question: str = Field(description="Question for the Card")
    answer: str = Field(description="Answer for the Card")


# Pydantic models
class CardsBase(SQLModel):
    question: str = Field(description="Question for the Card")
    answer: str = Field(description="Answer for the Card")


class Cards(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    question: str = Field(description="Question for the Card")
    answer: str = Field(description="Answer for the Card")

    class Config:
        from_attributes = True


class CardsCreate(CardsBase):
    pass


class CardsRead(CardsBase):
    pass


class CardsUpdate(CardsBase):
    pass

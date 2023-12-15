from pydantic import BaseModel, Field

from schema.card import Card


class Deck(BaseModel):
    """A Deck of Cards, It contains information from the relvant Document."""

    name: str = Field(description="Name of the Deck")
    description: str = Field(description="Description of the Deck")
    cards: list[Card] = Field(description="List of Cards in the Deck")

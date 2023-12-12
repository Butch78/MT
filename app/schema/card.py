from pydantic import BaseModel, Field


class Card(BaseModel):
    """Data model for card, It contains the question and answer"""
    question: str = Field(description="Question for the Card")
    answer: str = Field(description="Answer for the Card")

//  import card model from card.ts

import type { Card } from "./card";

export interface DeckCreate {
  user_id: string;
  name: string;
  description: string;
}

export interface DeckUpdate extends DeckCreate {
  id: string;
}

export interface Deck extends DeckCreate {
  id: string;
  lesson_id: string;
  ref_id: string;
  created_at: Date;
  cards: Card[];
}

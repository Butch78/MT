import { defineStore, type Store } from "pinia";
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/supabase';

import { useAuthStore } from '@/stores/authStore';
import { useCardStore } from "@/stores/cardStore";

import type { DeckCreate, DeckUpdate, Deck } from "@/models/deck";
import type { Card, CardUpdate, CardCreate } from "@/models/card";

type State = {
  Downloaded: boolean;
  currentDeckId: string | null;
  currentCardId: string | null;
  nextCardId: string | null;
  decks: Deck[];
};

type Getters = {
  isDownloaded(state: State): boolean;
  isValid(state: State): boolean;
  currentDeck(state: State): Deck;
};

type Actions = {
  getDecks(): void;
  getDeck(deckId: string): Deck | undefined;
  createDeck(deck: DeckCreate): void;
  updateDeck(deck: DeckUpdate): void;
  deleteDeck(deckId: string): void;
  setCurrentDeck(deckId: string): void;
  getCard(cardId: string): Promise<Card | undefined>;
  createCard(card: CardCreate): void;
  updateCard(updatedCard: CardUpdate): void;
};


export const useDeckStore = defineStore<"DeckStore", State, Getters, Actions>(
  "DeckStore", {
  state: (): State => {
    return {
      Downloaded: false,
      currentDeckId: null,
      currentCardId: null,
      nextCardId: null,
      decks: [],
    };
  },

  getters: {

    isDownloaded(state: State) {
      return state.Downloaded;
    },
    isValid(state: State) {
      return state.currentDeckId !== null;
    },
    currentDeck(state: State): Deck {
      const deck = state.decks.find((deck) => deck.id === state.currentDeckId);
      if (deck === undefined) {
        console.log("Current Deck not found", state.decks);
        return state.decks[0];
      } else {
        return deck;
      }
    },
  },
  actions: {
    async createDeck(deck: DeckCreate) {
      try {
        const authStore = useAuthStore();

        const { data: Deck, error } = await supabase
          .from('decks')
          .insert({
            ...deck,
            user_id: authStore.currentUser?.id,
          })
          .select()
        if (error) throw error;
        this.setCurrentDeck(Deck[0].id);
      }
      catch (error) {
        console.log(error);
      }
    },
    getDeck(id: string): Deck | undefined {
      try {
        // search the store for the deck
        const deck = this.decks.find((deck) => deck.id === id);
        if (deck !== undefined) {
          return deck;
        } else {
          throw new Error("Deck not found");
        }

      } catch (error) {
        console.log(error);
      }
    },

    async getDecks() {
      try {
        const authStore = useAuthStore();
        const { data: decks, error, status } = await supabase
          .from('decks')
          .select('*, cards(*)')
          .eq('user_id', authStore.currentUser?.id)

        if (error) throw error;
        this.decks = decks as Deck[];
        this.Downloaded = true;
      } catch (error) {
        console.log(error);
      }
    },

    async updateDeck(deck: DeckUpdate) {

      const authStore = useAuthStore();

      const user_id = authStore.currentUser?.id;

      if (user_id === undefined) {
        throw new Error("User not logged in");
      }

      const updateDeck = {
        user_id: authStore.currentUser?.id as string,
        id: deck.id,
        name: deck.name,
        description: deck.description
      }
      try {
        const { error } = await supabase
          .from('decks')
          .update(updateDeck)
          .eq('id', updateDeck.id)

        if (error) throw error;

      } catch (error) {
        console.log(error);
      }
    },

    async deleteDeck(deckId: string) {
      try {
        const { data: deck, error, status } = await supabase
          .from('decks')
          .delete()
          .eq('id', deckId)

        if (error) throw error;
      } catch (error) {
        console.log(error);
      }

    },

    async getCard(cardId: string): Promise<Card | undefined> {

      // get the current deck
      const deck = this.currentDeck;

      // search the deck for the card
      const card = deck.cards.find((card) => card.id === cardId);

      if (card === undefined) {
        const authStore = useAuthStore();
        const { data: cards, error, status } = await supabase
          .from('cards')
          .select('*')
          .eq('user_id', authStore.currentUser?.id).eq('id', cardId)

        if (error) throw error;

        if (cards !== undefined) {
          return cards[0] as Card;
        }

      } else {
        throw new Error("Card not found");
      }
    },

    async createCard(card: CardCreate) {
      try {

        const cardStore = useCardStore();

        const cardCreate = cardStore.createCard(card);


        const { data, error, status } = await supabase
          .from('cards')
          .insert({
            ...cardCreate,
          })
          .select()

        if (error) throw error;
        if (status !== 201 && data !== undefined) {
          this.decks.forEach((deck) => {
            if (deck.id === card.deck_id) {
              deck.cards.push(data[0] as Card);
            }
          });
        }

      } catch (error) {
        console.log(error);
      }
    },


    async updateCard(updatedCard: Card) {
      try {
        const { data: cardUpdate, error, status } = await supabase
          .from('cards')
          .update(updatedCard)
          .eq('id', updatedCard.id)

        if (error) throw error;


      } catch (error) {
        console.log(error);
      }
    },


    setCurrentDeck(deck_id: string) {
      this.currentDeckId = deck_id;
      this.Downloaded = true;
    },
  },
});


import { AbstractApiService } from "./AbstractApiService";
import type { DeckCreate, Deck } from "../models/deck";



class DeckApiService extends AbstractApiService {
  constructor() {
    super("/v1/decks");


  }

  // TODO: add user_id to params
  decks() {
    return this.http
      .get("")
      .then(this.handleResponse.bind(this))
      .catch(this.handleError.bind(this));
  }

  deck(ref_id: string) {
    return this.http
      .get(`/${ref_id}`)
      .then(this.handleResponse.bind(this))
      .catch(this.handleError.bind(this));
  }

  createDeck(deck: DeckCreate) {
    return this.http
      .post("", deck)
      .then(this.handleResponse.bind(this))
      .catch(this.handleError.bind(this));
  }

  updateDeck(deck: Deck) {
    return this.http
      .put(`/${deck.ref_id}`, deck)
      .then(this.handleResponse.bind(this))
      .catch(this.handleError.bind(this));
  }
}

export const deckApiService = new DeckApiService();

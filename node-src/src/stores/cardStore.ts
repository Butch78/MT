import { defineStore } from "pinia";

import type { Card, CardBase, CardCreate } from "@/models/card";

import { StateEnum, FruitEnum } from "@/models";

type State = {
    Loaded: boolean;
    deck: Card[];
    completedDeck: Card[];
};

type Getters = {
    isLoaded(state: State): boolean;
    getDeck(state: State): Card[];
    getCompletedDeck(state: State): Card[];
    getRandomFruit(): FruitEnum;
    getTomorrow(): Date;
};

type Actions = {
    loadDeck(deck: Card[]): void;
    shiftCard(): void;
    createCard(card: CardCreate): CardCreate;
    updateCard(card: Card, quality: number): Card;
};

export const useCardStore = defineStore("CardStore", {
    state: (): State => {
        return {
            Loaded: false,
            deck: [],
            completedDeck: [],
        };
    },
    getters: {
        isLoaded(state: State) {
            return state.Loaded;
        },
        getDeck(state: State): Card[] {
            return state.deck;
        },
        getCompletedDeck(state: State): Card[] {
            return state.completedDeck;
        },

        getRandomFruit(): FruitEnum {
            const fruits = Object.values(FruitEnum); // Get an array of all possible fruit values
            const randomIndex = Math.floor(Math.random() * fruits.length); // Pick a random index
            return fruits[randomIndex]; // Return the fruit at that index
        },

        getTomorrow(): Date {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return tomorrow;
        }
    },
    actions: {

        loadDeck(deck: Card[]): void {
            this.deck = deck;
            this.Loaded = true;
        },


        shiftCard(): void {
            this.deck.shift();
        },


        createCard(card: CardCreate): CardCreate {
            return {
                question: card.question,
                answer: card.answer,
                deck_id: card.deck_id,
                state: StateEnum.active,
                fruit: this.getRandomFruit,
                interval: 0,
                repetition: 0,
                easiness: 2.5,
                dueDate: this.getTomorrow,
                completed: false as boolean,
            } as CardCreate;
        },



        updateCard(card: Card, quality: number): Card {
            //  Use sm2 algorithm to update card values

            // 1. Calculate new easiness factor
            // 2. Calculate new repetition
            // 3. Calculate new interval
            // 4. Calculate new due date
            // 5. Update card

            console.log("CardStore current card", card);

            // 1. Calculate new easiness factor
            const easiness = card.easiness + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
            // 2. Calculate new repetition

            const repetition = quality < 3 ? 0 : card.repetition + 1;
            // 3. Calculate new interval
            const interval = repetition === 0 ? 0 : repetition === 1 ? 1 : repetition === 2 ? 6 : Math.round(card.interval * easiness);
            // 4. Calculate new due date by adding interval to current date
            const currentDate = new Date()
            const dueDate = new Date(currentDate.getTime() + interval * 86400000);


            dueDate.setDate(dueDate.getDate() + interval);

            if (dueDate.getDate() !== currentDate.getDate()) {

                const updatedCard = {
                    ...card,
                    easiness: easiness,
                    repetition: repetition,
                    interval: interval,
                    dueDate: dueDate,
                    state: StateEnum.completed
                }

                // Add card to the completed deck
                this.completedDeck.push(updatedCard)
                return updatedCard;

            } else {

                const updatedCard = {
                    ...card,
                    easiness: easiness,
                    repetition: repetition,
                    interval: interval,
                    dueDate: dueDate,
                    state: StateEnum.active

                }
                //  Add card to the back of the queue
                this.deck.push(updatedCard);
                return updatedCard;
            }
        }


    },
});

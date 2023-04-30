import { action, computed, makeAutoObservable } from "mobx";
import {
    CardValueType,
    CardValuesSuits,
    cardSuits,
    cardValues,
    defDeckCount,
} from "../../common/gameInfo";
import { autoSave } from "../../utils/autosave";

interface Card {
    value: CardValueType;
    suit: CardValuesSuits;
}
export class PlayingStore {
    cardDeck: Card[] = [];
    openedCardDeck: Card[] = [];
    openCards: Card[] = [];
    isEmptyDeck: boolean;
    lastOpenedCard: Card | null = null;
    deckCount: number = defDeckCount;

    constructor() {
        makeAutoObservable(this, {
            openNewCards: action.bound,
            remixDeck: action.bound,
            deckLength: computed,
            openedDeckLength: computed,
            updateDeckCount: action.bound,
        });
        autoSave(this, ["deckCount"]);
        this.cardDeck = [...this.generateNewDeck()];
        this.isEmptyDeck = false;
        this.openNewCards();
        this.openNewCards();
    }

    mixDeck(deck: Card[]) {
        for (let i = 0; i < deck.length; i++) {
            let j = Math.floor(Math.random() * deck.length);
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        return deck;
    }

    generateNewDeck = () => {
        const deck: Card[] = [];
        let i = 0;
        while (i < this.deckCount) {
            cardValues.forEach((value) => {
                cardSuits.forEach((suit) => {
                    deck.push({ value, suit });
                });
            });
            i++;
        }
        this.mixDeck(deck);
        return deck;
    };

    openNewCards() {
        if (this.openCards && this.openCards.length === 2) {
            this.lastOpenedCard = this.openCards.pop()!;        
            this.openedCardDeck.push(this.openCards.pop()!);
            this.openedCardDeck.push(this.lastOpenedCard);
        }
        this.openCards.push(this.cardDeck.pop()!);
        this.openCards.push(this.cardDeck.pop()!);
        if (this.cardDeck.length === 4) {
            this.isEmptyDeck = true;
        }
    }

    remixDeck() {
        this.openedCardDeck = [];
        this.openCards = [];
        this.lastOpenedCard = null;
        this.cardDeck = [...this.generateNewDeck()];
        this.isEmptyDeck = false;
    }

    get deckLength() {
        return this.cardDeck.length;
    }

    get openedDeckLength() {
        return this.openedCardDeck.length;
    }

    updateDeckCount(newValue: number) {
        this.deckCount = newValue;
    }
}

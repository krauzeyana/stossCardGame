import { action, computed, makeAutoObservable } from "mobx";
import {
    CardValueType,
    CardValuesSuits,
    cardSuits,
    cardValues,
    defDeckCount,
} from "../../common/gameInfo";
import { autoSave } from "../../utils/autosave";
import { RootStore } from "..";

interface Card {
    value: CardValueType;
    suit: CardValuesSuits;
}
export class PlayingStore {
    rootStore: RootStore;
    cardDeck: Card[] = [];
    openedCardDeck: Card[] = [];
    openCards: Card[] = [];
    isEmptyDeck: boolean;
    deckCount: number = defDeckCount;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
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
        this.rootStore.resetWin();
        if (this.openCards && this.openCards.length === 2) {
            const temp: Card = this.openCards.pop()!;
            this.openedCardDeck.push(this.openCards.pop()!);
            this.openedCardDeck.push(temp);
        }
        this.openCards.push(this.cardDeck.pop()!);
        this.openCards.push(this.cardDeck.pop()!);
        if (this.cardDeck.length === 4) {
            this.isEmptyDeck = true;
        }
    }

    remixDeck() {
        this.rootStore.resetWin();
        this.openedCardDeck = [];
        this.openCards = [];
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

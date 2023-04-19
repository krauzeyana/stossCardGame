import { action, computed, makeAutoObservable } from "mobx";
import { RootStore } from "..";
import { cardSuits, cardValues,defBetsCount, defDeckCount } from "../../common/gameInfo";
import { CardValuesType } from "../bankStore/bankStore";
import { autoSave } from "../../utils/autosave";


type CardValuesSuits = typeof cardSuits[number];
interface Card {
    value: CardValuesType;
    suit: CardValuesSuits;
}
export class PlayingStore {
    rootStore: RootStore;
    cardDeck: Card[] = [];
    openedCardDeck: Card[] = [];
    openCards: Card[] = [];
    isEmptyDeck: boolean;
    lastOpenedCard: Card | null = null;
    deckCount: number = defDeckCount;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.cardDeck = [...this.generateNewDeck()];
        this.isEmptyDeck = false;
        makeAutoObservable(
            this,
            {
                openNewCards: action.bound,
                remixDeck: action.bound,
                deckLength: computed,
                openedDeckLength: computed,
                updateDeckCount: action.bound,
            }
            // makeBet: action.bound, getBetChips: action.bound, removeBet: action.bound}
        );
        autoSave(this, ["deckCount"]);
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
    }

    openNewCards() {
        console.log("+++");

        if (this.openCards && this.openCards.length === 2) {
            this.openedCardDeck.push(this.openCards.pop()!);
            this.lastOpenedCard = this.openCards.pop()!;
            this.openedCardDeck.push(this.lastOpenedCard);
        }
        this.openCards.push(this.cardDeck.pop()!);
        this.openCards.push(this.cardDeck.pop()!);
        if (this.cardDeck.length === 0) {
            this.isEmptyDeck = true;
        }
    }

    remixDeck() {
        console.log("---");
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

    updateDeckCount(newValue: number){
        this.deckCount = newValue;
    }

    // getOpenCardByIndex(index: number) {
    //     return this.openCards ? this.openCards[index] : "";
    // }
}

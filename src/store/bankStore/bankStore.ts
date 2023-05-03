import { action, computed, makeAutoObservable } from "mobx";
import {
    ChipValueType,
    CardValueType,
    defBetsCount,
    defBalance,
    cardValues,
    ChipListType,
} from "../../common/gameInfo";
import { autoSave } from "../../utils/autosave";
import { createTypedObjectFromEntries } from "../../utils/objectFromEntries";

export class BankStore {
    balance: number = defBalance;
    betList: ChipListType = createTypedObjectFromEntries(
        cardValues.map((key) => [key, new Array<ChipValueType>()])
    );
    totalBet: number = 0;
    deltaAmount: number = 0;
    selectedBet: CardValueType | null = null;
    maxBetsCount: number = defBetsCount;

    constructor() {
        makeAutoObservable(this, {
            selectBet: action.bound,
            makeBet: action.bound,
            removeBet: action.bound,
            changeBalance: action.bound,
            clearBetLis: action.bound,
            getBetBalance: action.bound,
            nonEmptyBetsCount: computed,
            upateMaxBetsCount: action.bound,
            removeAllBets: action.bound,
            resetBalance: action.bound,
            unselectBet: action.bound,
            clearDeltaAmount: action.bound,
        });
        autoSave(this, ["maxBetsCount","balance","totalBet","betList"]);
    }

    get nonEmptyBetsCount() {
        let count = 0;
        let arr: CardValueType;
        for (arr in this.betList) {
            if (this.betList[arr].length > 0) {
                count++;
            }
        }
        return count;
    }

    selectBet(label: CardValueType) {
        if (this.nonEmptyBetsCount < this.maxBetsCount || this.betList[label].length > 0) {
            this.selectedBet = label;
        }
    }

    unselectBet() {
        this.selectedBet = null;
    }

    makeBet(value: ChipValueType) {
        if (this.selectedBet && this.balance >= value) {
            this.balance -= value;
            this.totalBet += value;
            this.betList[this.selectedBet].push(value);
        }
    }

    removeBet(label: CardValueType) {
        if (this.selectedBet === label && this.betList[this.selectedBet] !== null) {
            const value = this.betList[this.selectedBet].pop();
            if (value) {
                this.balance += value;
                this.totalBet -= value;
            }
        }
    }

    getBetBalance(label: CardValueType) {
        return this.betList[label].reduce((acc, val) => (acc += val), 0);
    }

    changeBalance(value: number) {
        this.deltaAmount = value;
        this.balance += value;
    }

    clearDeltaAmount() {
        this.deltaAmount = 0;
    }

    clearBetLis(label: CardValueType) {
        this.totalBet -= this.getBetBalance(label);
        this.betList[label] = [];
    }

    upateMaxBetsCount(newCount: number) {
        this.maxBetsCount = newCount;
    }

    resetBalance() {
        if (this.balance === 0 && this.nonEmptyBetsCount === 0) {
            this.balance = defBalance;
        }
    }

    removeAllBets() {
        let arr: CardValueType;
        for (arr in this.betList) {
            this.betList[arr] = [];
        }
        this.balance += this.totalBet;
        this.totalBet = 0;
        this.selectedBet = null;
    }
}

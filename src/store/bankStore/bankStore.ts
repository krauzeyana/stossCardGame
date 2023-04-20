import { action, computed, makeAutoObservable } from "mobx";
import { ChipValueType, CardValueType, defBetsCount, defBalance } from "../../common/gameInfo";
import { RootStore } from "..";
import { autoSave } from "../../utils/autosave";

export class BankStore {
    rootStore: RootStore;
    balance: number = defBalance;
    betList = {
        "2": new Array<ChipValueType>(),
        "3": new Array<ChipValueType>(),
        "4": new Array<ChipValueType>(),
        "5": new Array<ChipValueType>(),
        "6": new Array<ChipValueType>(),
        "7": new Array<ChipValueType>(),
        "8": new Array<ChipValueType>(),
        "9": new Array<ChipValueType>(),
        "10": new Array<ChipValueType>(),
        J: new Array<ChipValueType>(),
        Q: new Array<ChipValueType>(),
        K: new Array<ChipValueType>(),
        A: new Array<ChipValueType>(),
    };
    betAmount: number = 0;
    selectedBet: CardValueType | null = null;
    maxBetsCount: number = defBetsCount;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
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
            resetBalanceNewGame: action.bound,
        });
        autoSave(this, ["maxBetsCount"]);
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

    makeBet(value: ChipValueType) {
        if (this.selectedBet && this.balance >= value) {
            this.balance -= value;
            this.betList[this.selectedBet].push(value);
        }
    }

    removeBet(label: CardValueType) {
        if (this.selectedBet === label && this.betList[this.selectedBet] !== null) {
            const value = this.betList[this.selectedBet].pop();
            if (value) {
                this.balance += value;
            }
        }
    }

    getBetBalance(label: CardValueType) {
        return this.betList[label].reduce((acc, val) => (acc += val), 0);
    }

    changeBalance(value: number) {
        this.balance += value;
    }

    clearBetLis(label: CardValueType) {
        this.betList[label] = [];
        console.log(this.betList[label]);
    }

    upateMaxBetsCount(newCount: number) {
        this.maxBetsCount = newCount;
    }

    resetBalance() {
        if (this.balance === 0 && this.nonEmptyBetsCount === 0) {
            this.balance = defBalance;
        }
    }

    resetBalanceNewGame() {
        this.balance = defBalance;
    }

    removeAllBets() {
        let arr: CardValueType;
        for (arr in this.betList) {
            this.betList[arr] = [];
        }
        this.selectedBet = null;
    }
}

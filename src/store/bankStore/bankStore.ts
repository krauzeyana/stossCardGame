import { action, computed, makeAutoObservable, observable } from "mobx";
import { chipsList, cardValues, defBetsCount, defBalance } from "../../common/gameInfo";
import React from "react";
import { RootStore } from "..";
import { autoSave } from "../../utils/autosave";

export type ChipValue = typeof chipsList[number];
export type CardValuesType = typeof cardValues[number];
let Label: CardValuesType;

export class BankStore {
    rootStore: RootStore;
    balance: number = defBalance;
    betList = {
        //[Label]: new Array<ChipValue>(),
        "2": new Array<ChipValue>(),
        "3": new Array<ChipValue>(),
        "4": new Array<ChipValue>(),
        "5": new Array<ChipValue>(),
        "6": new Array<ChipValue>(),
        "7": new Array<ChipValue>(),
        "8": new Array<ChipValue>(),
        "9": new Array<ChipValue>(),
        "10": new Array<ChipValue>(),
        J: new Array<ChipValue>(),
        Q: new Array<ChipValue>(),
        K: new Array<ChipValue>(),
        A: new Array<ChipValue>(),
    };
    betAmount: number = 0;
    selectedBet: CardValuesType | null = null;
    maxBetsCount: number = defBetsCount;

    get nonEmptyBetsCount() {
        let count = 0;
        let arr: CardValuesType;
        for (arr in this.betList) {
            console.log(this.betList[arr]);
            if (this.betList[arr].length > 0) {
                count++;
            }
        }
        return count;
    }

    selectBet(label: CardValuesType) {
        if (this.nonEmptyBetsCount < this.maxBetsCount || this.betList[label].length > 0) {
            this.selectedBet = label;
        }
    }

    makeBet(value: ChipValue) {
        if (this.selectedBet && this.balance >= value) {
            this.balance -= value;
            this.betList[this.selectedBet].push(value);
        }
    }

    removeBet(label: CardValuesType) {
        if (this.selectedBet === label && this.betList[this.selectedBet] !== null) {
            const value = this.betList[this.selectedBet].pop();
            if (value) {
                this.balance += value;
            }
        }
    }

    getBetChips(label: CardValuesType) {
        return this.betList[label];
    }

    getBetBalance(label: CardValuesType) {
        return this.betList[label].reduce((acc, val) => (acc += val), 0);
    }

    changeBalance(value: number) {
        this.balance += value;
    }

    clearBetLis(label: CardValuesType) {
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

    resetBalanceNewGame(){
        this.balance = defBalance;
    }

    removeAllBets() {
        let arr: CardValuesType;
        for (arr in this.betList) {
            this.betList[arr] = [];
        }
        this.selectedBet = null;
    }

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this, {
            selectBet: action.bound,
            makeBet: action.bound,
            getBetChips: action.bound,
            removeBet: action.bound,
            changeBalance: action.bound,
            clearBetLis: action.bound,
            getBetBalance: action.bound,
            nonEmptyBetsCount: computed,
            upateMaxBetsCount: action.bound,
            removeAllBets: action.bound,
            resetBalance: action.bound,
            resetBalanceNewGame: action.bound
        });
        autoSave(this, ["maxBetsCount"]);
    }
}

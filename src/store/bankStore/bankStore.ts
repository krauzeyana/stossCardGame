import { action, computed, makeAutoObservable, observable } from "mobx";
import { chipsList, cardValues, startBalance, maxBetCount } from "../../common/gameInfo";
import React from "react";
import { RootStore } from "..";

export type ChipValue = typeof chipsList[number];
export type CardValuesType = typeof cardValues[number];
let Label: CardValuesType;

export class BankStore {
    rootStore: RootStore;
    balance: number = startBalance;
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
        "J": new Array<ChipValue>(),
        "Q": new Array<ChipValue>(),
        "K": new Array<ChipValue>(),
        "A": new Array<ChipValue>(),
    };
    betAmount: number = 0;
    selectedBet: CardValuesType | null = null;    

    get nonEmptyBetsCount(){
        let count = 0;
        let arr: CardValuesType;
        for(arr in this.betList){
            console.log(this.betList[arr])
            if(this.betList[arr].length > 0){
                count++;
            }
        }
        return count;
    }
    
    selectBet(label: CardValuesType){
        console.log(this.nonEmptyBetsCount)
        if(this.nonEmptyBetsCount < maxBetCount || this.betList[label].length > 0){
        this.selectedBet = label;
        }
    }

    makeBet(value: ChipValue){
        if(this.selectedBet && this.balance >= value){
            this.balance -= value;
            this.betList[this.selectedBet].push(value);
        }
    }

    removeBet(label: CardValuesType){
        if(this.selectedBet === label && this.betList[this.selectedBet]!== null){
            const value = this.betList[this.selectedBet].pop();
            if(value){
            this.balance += value;
            }
        }
    }

    getBetChips(label: CardValuesType){
        return this.betList[label];
    }

    getBetBalance(label: CardValuesType){

        return this.betList[label].reduce((acc, val) => acc+= val, 0);
    }

    changeBalance(value: number){
        this.balance += value;
    }

    clearBetLis(label: CardValuesType){
        this.betList[label] = [];
        console.log(this.betList[label])
    }

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this, {selectBet: action.bound,
            makeBet: action.bound, getBetChips: action.bound, removeBet: action.bound, changeBalance: action.bound, clearBetLis: action.bound, getBetBalance: action.bound, nonEmptyBetsCount: computed});
    }
}
/*
export const BankStoreContext = React.createContext<BankStore | null>(null);
export const bankStore = new BankStore();

export function useBankStore() {
  const context = React.useContext(BankStoreContext);
  if (!context) {
    throw new Error("Wrap element with context first!");
  }
  return context;
}*/
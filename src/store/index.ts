import React from "react";
import { BankStore } from "./bankStore/bankStore";
import { PlayingStore } from "./playingStore/playingStore";
import { action, makeAutoObservable } from "mobx";

export class RootStore {
    bankStore: BankStore;
    playingStore: PlayingStore;

    CheckBets = () => {
     // const {bankStore, playingStore} = useRootStore();
      const {openCards} = this.playingStore;
      const {getBetBalance, changeBalance, clearBetLis} = this.bankStore;
      if(openCards){
          let plus = getBetBalance(openCards[1].value);  
          if(plus > 0 && openCards[0].value !== openCards[1].value){
            plus*=2;
            
            changeBalance(plus);
          }
          if(getBetBalance(openCards[0].value) > 0){
            clearBetLis(openCards[0].value)
          }
          if(getBetBalance(openCards[1].value) > 0){
            clearBetLis(openCards[1].value)
          }

      }
  
  
      
  }

    constructor() {
        this.bankStore = new BankStore(this);
        this.playingStore = new PlayingStore(this);
        makeAutoObservable(this, {CheckBets : action.bound});
      }
}

export const RootStoreContext = React.createContext<RootStore | null>(null);
export const rootStore = new RootStore();

export function useRootStore() {
  const context = React.useContext(RootStoreContext);
  if (!context) {
    throw new Error("Wrap element with context first!");
  }
  return context;
}
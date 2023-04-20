import React from "react";
import { action, makeAutoObservable } from "mobx";
import { BankStore } from "./bankStore/bankStore";
import { PlayingStore } from "./playingStore/playingStore";
import { StatisticStore } from "./statisticStore/statisticStore";

export class RootStore {
    bankStore: BankStore;
    playingStore: PlayingStore;
    statisticStore: StatisticStore;

    constructor() {
        this.bankStore = new BankStore(this);
        this.playingStore = new PlayingStore(this);
        this.statisticStore = new StatisticStore(this);
        makeAutoObservable(this, { checkBets: action.bound });
    }

    checkBets = () => {
        const { openCards } = this.playingStore;
        const { getBetBalance, changeBalance, clearBetLis } = this.bankStore;
        const { saveStatistic } = this.statisticStore;
        if (openCards) {
            let plus = getBetBalance(openCards[1].value);
            const minus = getBetBalance(openCards[0].value);

            if (minus > 0) {
                clearBetLis(openCards[0].value);
                saveStatistic(openCards[0].value, minus, false);
            }
            if (plus > 0) {
                clearBetLis(openCards[1].value);
                if (openCards[0].value !== openCards[1].value) {
                    saveStatistic(openCards[1].value, plus, true);
                }
            }

            if (plus > 0 && openCards[0].value !== openCards[1].value) {
                plus *= 2;
                changeBalance(plus);
            }
        }
    };
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

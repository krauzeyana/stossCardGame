import React from "react";
import { action, makeAutoObservable } from "mobx";
import { BankStore } from "./bankStore/bankStore";
import { PlayingStore } from "./playingStore/playingStore";
import { StatisticStore } from "./statisticStore/statisticStore";
import { Sound } from "../components/sound";
import { StoreType } from "../common/gameInfo";

export class RootStore {
    bankStore: BankStore;
    playingStore: PlayingStore;
    statisticStore: StatisticStore;
    rootStore: RootStore;
    isWin: boolean = false;
    isLose: boolean = false;

    constructor() {
        this.rootStore = this;
        this.bankStore = new BankStore();
        this.playingStore = new PlayingStore(this);
        this.statisticStore = new StatisticStore();
        makeAutoObservable(this, { checkBets: action.bound, resetWin: action.bound });
    }

    resetWin = () => {
        this.isLose = false;
        this.isWin = false;
        this.bankStore.clearDeltaAmount();
    };

    checkBets = () => {
        const { openCards } = this.playingStore;
        const { getBetBalance, changeBalance, clearBetLis, clearDeltaAmount } = this.bankStore;
        const { saveStatistic } = this.statisticStore;

        if (openCards) {
            let plus = getBetBalance(openCards[1].value);
            const minus = getBetBalance(openCards[0].value);

            if (minus > 0) {
                clearBetLis(openCards[0].value);
                saveStatistic(openCards[0].value, minus, false);
                this.isLose = true;
            }
            if (plus > 0) {
                clearBetLis(openCards[1].value);
                if (openCards[0].value !== openCards[1].value) {
                    saveStatistic(openCards[1].value, plus, true);
                    this.isWin = true;
                }
            }

            if (plus > 0 && openCards[0].value !== openCards[1].value) {
                plus *= 2;
                Sound.playSound("win");
                changeBalance(plus);
            }
        }
    };
}

export const RootStoreContext = React.createContext<RootStore | null>(null);
export const rootStore = new RootStore();

export function useStore<K extends StoreType>(name: K) {
    const context = React.useContext(RootStoreContext);
    if (!context) {
        throw new Error("Wrap element with context first!");
    }
    return context[name];
}

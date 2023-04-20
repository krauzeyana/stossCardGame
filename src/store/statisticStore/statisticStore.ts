import { action, makeAutoObservable } from "mobx";
import { RootStore } from "..";
import { autoSave } from "../../utils/autosave";

type Statistic = {
    card: string;
    bets: number;
    isWin: boolean;
    time: number;
};
export class StatisticStore {
    rootStore: RootStore;
    statistic = new Array<Statistic>();

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.statistic = [];
        makeAutoObservable(this, { saveStatistic: action.bound, resetStatictic: action.bound });
        autoSave(this, ["statistic"]);
    }

    saveStatistic(card: string, bets: number, isWin: boolean) {
        this.statistic.push({ card, bets, isWin, time: Date.now() });
    }

    resetStatictic() {
        this.statistic = [];
    }
}

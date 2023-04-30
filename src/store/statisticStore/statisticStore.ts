import { action, makeAutoObservable } from "mobx";
import { autoSave } from "../../utils/autosave";

type Statistic = {
    card: string;
    bets: number;
    isWin: boolean;
    time: number;
};
export class StatisticStore {
    statistic = new Array<Statistic>();

    constructor() {
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

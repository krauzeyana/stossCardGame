import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store";

ChartJS.register(ArcElement, Tooltip, Legend);
interface IChartByNumProps {
    isByNum: boolean;
}

export const ChartByType = observer(({ isByNum }: IChartByNumProps) => {
    const { statistic } = useStore("statisticStore");
    let win = 0;
    let lose = 0;

    if (isByNum) {
        win = statistic.filter((record) => record.isWin).length;
        lose = statistic.length - win;
    } else {
        win = statistic.filter((record) => record.isWin).reduce((acc, cur) => acc + cur.bets, 0);
        lose = statistic.filter((record) => !record.isWin).reduce((acc, cur) => acc + cur.bets, 0);
    }

    const data = {
        labels: ["Win", "Lose"],
        datasets: [
            {
                label: isByNum ? "# of bets" : "amount of bets",
                data: [win, lose],
                backgroundColor: ["rgba(0, 255, 0, 0.2)", "rgba(255, 0, 0, 0.2)"],
                borderColor: ["rgba(0, 255, 0, 0.7)", "rgba(255, 0, 0, 0.7)"],
                borderWidth: 1,
            },
        ],
    };
    return <Pie data={data} />;
});

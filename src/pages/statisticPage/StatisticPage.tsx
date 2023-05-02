import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useStore } from "../../store";
import { ChartByType } from "./chart/Chart";
import style from "./statisticPage.module.scss";

export const StatisticPage = observer(() => {
    const { statistic } = useStore("statisticStore");
    const [isByNum, setIsByNum] = useState(false);

    return (
        <div className={style.statisticPage}>
            <h2>Game Statistic</h2>
            <div className={style.statisticContent}>
                <div className={style.tableScroll}>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Card</th>
                                <th scope="col">Bet Amount</th>
                                <th scope="col">Is Win?</th>
                                <th scope="col">Date/ Time</th>
                            </tr>
                        </thead>
                    </table>
                    <div className={style.tableScrollBody}>
                        <table>
                            <tbody>
                                {statistic
                                    .slice()
                                    .reverse()
                                    .map((record) => (
                                        <tr key={record.card + record.time}>
                                            <td>{record.card}</td>
                                            <td>{record.bets}</td>
                                            <td>{record.isWin ? "Yes" : "No"}</td>
                                            <td>{new Date(record.time).toLocaleString()}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={style.chart}>
                    <ChartByType isByNum={isByNum} />
                    <label className={style.switch}>
                        <input type="checkbox" onChange={(e) => setIsByNum(e.target.checked)} />
                        <span className={style.slider}></span>
                    </label>
                    <div>{isByNum ? "by number" : "by amount"}</div>
                </div>
            </div>
        </div>
    );
});

import { observer } from "mobx-react-lite";
import { NavBar } from "../../components/navBar";
import { useRootStore } from "../../store";
import "./statisticPage.scss";
import { ChartByType } from "./chart/Chart";
import { useState } from "react";

export const StatisticPage = observer(() => {
    const { statistic } = useRootStore().statisticStore;
    const [isByNum, setIsByNum] = useState(false);

    return (
        <>
            <NavBar />

            <div className="statisticPage">
                <h2>Game Statistic</h2>
                <div className="statisticContent">
                    <div className="tableScroll">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Card</th>
                                    <th scope="col">Bet Amount</th>
                                    <th scope="col">Is Win?</th>
                                    <th scope="col">Date/Time</th>
                                </tr>
                            </thead>
                        </table>
                        <div className="tableScrollBody">
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
                    <div className="chart">
                        <ChartByType isByNum={isByNum} />
                        <label className="switch">
                            <input type="checkbox" onChange={(e) => setIsByNum(e.target.checked)} />
                            <span className="slider round"></span>
                        </label>
                        <div>{isByNum ? "by number" : "by amount"}</div>
                    </div>
                </div>
            </div>
        </>
    );
});

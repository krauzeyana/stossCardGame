import { ChangeEvent, useCallback } from "react";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../store";
import { NavBar } from "../../components/navBar";
import { defDeckCount, defBetsCount } from "../../common/gameInfo";
import "./settingPage.scss";

export const SettingPage = observer(() => {
    const { upateMaxBetsCount, maxBetsCount, resetBalance } = useRootStore().bankStore;
    const { updateDeckCount, deckCount, remixDeck } = useRootStore().playingStore;
    const { resetStatictic } = useRootStore().statisticStore;

    const onChangeDeckCount = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            updateDeckCount(+e.target.value);
            remixDeck();
        },
        [updateDeckCount, remixDeck]
    );

    const onChangeMaxBetsCount = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            upateMaxBetsCount(+e.target.value);
        },
        [upateMaxBetsCount]
    );

    const resetToDefault = () => {
        if (defDeckCount !== deckCount) {
            updateDeckCount(defDeckCount);
            remixDeck();
        }
        upateMaxBetsCount(defBetsCount);
    };

    return (
        <>
            <NavBar />
            <div className="settingPage">
                <h2> Game Settings</h2>
                <div className="settingForm">
                    <div className="item">
                        <label htmlFor="deck">Number of the deck</label>
                        <span>
                            <input
                                type="range"
                                value={deckCount}
                                min="1"
                                max="5"
                                onChange={onChangeDeckCount}
                                name="deck"
                            />
                            <output id="rangevalue">{deckCount}</output>
                        </span>
                    </div>
                    <div className="item">
                        <label htmlFor="bets">Maximum number of the bets</label>
                        <span>
                            <input
                                type="range"
                                value={maxBetsCount}
                                min="1"
                                max="5"
                                onChange={onChangeMaxBetsCount}
                                name="bets"
                            />
                            <output id="rangevalue">{maxBetsCount}</output>
                        </span>
                    </div>
                    <div className="item">
                        <button
                            type="button"
                            className="button"
                            onClick={resetBalance}
                            title="Only with zero balance and empty bets"
                        >
                            Reset Balance
                        </button>
                    </div>
                    <div className="item">
                        <button type="button" className="button" onClick={resetStatictic}>
                            Reset Statistic
                        </button>
                    </div>
                    <br></br>
                    <div className="item">
                        <button type="button" className="button" onClick={resetToDefault}>
                            Reset Setting to default
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
});

import { ChangeEvent, useCallback } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
import { defDeckCount, defBetsCount } from "../../common/gameInfo";
import style from "./settingPage.module.scss";

export const SettingPage = observer(() => {
    const { upateMaxBetsCount, maxBetsCount, resetBalance } = useStore("bankStore");
    const { updateDeckCount, deckCount, remixDeck } = useStore("playingStore");
    const { resetStatictic } = useStore("statisticStore");

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

    const resetToDefault = useCallback(() => {
        if (defDeckCount !== deckCount) {
            updateDeckCount(defDeckCount);
            remixDeck();
        }
        upateMaxBetsCount(defBetsCount);
    }, [deckCount, updateDeckCount, upateMaxBetsCount, remixDeck]);

    const resetBalanceHandle = useCallback(() => {
        resetBalance(true);
    }, [resetBalance]);

    return (
        <div className={style.settingPage}>
            <h2> Game Settings</h2>
            <div className={style.settingForm}>
                <div className={style.item}>
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
                <div className={style.item}>
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
                <div className={style.item}>
                    <button
                        type="button"
                        className={style.button}
                        onClick={resetBalanceHandle}
                        title="Only with zero balance and empty bets"
                    >
                        Reset Balance
                    </button>
                </div>
                <div className={style.item}>
                    <button type="button" className={style.button} onClick={resetStatictic}>
                        Reset Statistic
                    </button>
                </div>
                <br></br>
                <div className={style.item}>
                    <button type="button" className={style.button} onClick={resetToDefault}>
                        Reset Setting to default
                    </button>
                </div>
            </div>
        </div>
    );
});

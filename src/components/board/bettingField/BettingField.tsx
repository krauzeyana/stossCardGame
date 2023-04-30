import { observer } from "mobx-react-lite";
import { cardValues } from "../../../common/gameInfo";
import { Bet } from "./bet/Bet";
import { useStore } from "../../../store";
import style from "./bettingField.module.scss";

export const BettingField = observer(() => {
    const { selectBet, selectedBet, removeBet, betList } = useStore("bankStore");
    return (
        <div className={style.betField}>
            {cardValues.map((item) => (
                <Bet
                    key={item}
                    betValue={item}
                    chipsList={betList[item].slice()}
                    selectBet={selectBet}
                    removeBet={removeBet}
                    isSelected={selectedBet === item}
                />
            ))}
        </div>
    );
});

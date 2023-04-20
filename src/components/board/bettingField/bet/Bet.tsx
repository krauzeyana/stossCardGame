import { observer } from "mobx-react-lite";
import { useCallback } from "react";
import { Chip } from "../../chipsList/chip";
import { useRootStore } from "../../../../store";
import { CardValueType, cardValues } from "../../../../common/gameInfo";
import "./bet.scss";

interface IBetProps {
    betValue: CardValueType;
}
export const Bet = observer(({ betValue }: IBetProps) => {
    const { selectBet, selectedBet, removeBet, betList } = useRootStore().bankStore;
    const chipsList = betList[betValue];

    const fromR = "246810QA".includes(betValue) ? 1 : 2;
    const toR = fromR + 1;
    const fromC = cardValues.indexOf(betValue) + 1;
    const toC = fromC + 2;

    const style = {
        gridArea: "" + fromR + " / " + fromC + " / " + toR + " / " + toC,
    };

    const onClickHandle = useCallback(() => {
        selectBet(betValue);
    }, [betValue, selectBet]);

    const onRemoveBet = useCallback(() => {
        removeBet(betValue);
    }, [betValue, removeBet]);

    return (
        <div
            className={"bet" + (selectedBet === betValue ? " selectedBet" : "")}
            style={style}
            onClick={onClickHandle}
        >
            {betValue}
            {chipsList.map((chip, index) => (
                <Chip value={chip} onClick={onRemoveBet} key={`${index}-${chip}`} />
            ))}
        </div>
    );
});

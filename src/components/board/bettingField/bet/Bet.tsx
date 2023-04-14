import { observer } from "mobx-react-lite";
import "./bet.scss";
import { CardValuesType, useBankStore } from "../../../../store/bankStore/bankStore";
import { useCallback } from "react";
import { Chip } from "../../chipsList/chip";

interface IBetProps {
    betValue: CardValuesType;
}
export const Bet = observer(({ betValue }: IBetProps) => {
    const { selectBet, selectedBet, getBetChips, removeBet } = useBankStore();
    const chipsList = getBetChips(betValue);

    const from = "246810QA".includes(betValue) ? 1 : 2;
    const to = from + 1;
    const betsArray = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    const fromG = betsArray.indexOf(betValue) + 1;
    const toG = fromG + 2;

    const style = {
        gridArea: "" + from + " / " + fromG + " / " + to + " / " + toG,
        background: "transparent",
    };

    if (selectedBet === betValue) {
        style.background = "rgba(0, 0, 0, 0.3)";
    }
    const onClickHandle = useCallback(() => {
        selectBet(betValue);
    }, [betValue, selectBet]);

    const onRemoveBet = useCallback(() => {
        removeBet(betValue);
    }, [betValue, removeBet]);

    return (
        <div className="bet" style={style} onClick={onClickHandle}>
            {betValue}
            {chipsList.map((chip) => (
                <Chip value={chip} onClick={onRemoveBet} />
            ))}
        </div>
    );
});

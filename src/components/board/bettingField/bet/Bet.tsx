import { useCallback } from "react";
import { Chip } from "../../chipsList/chip";
import { CardValueType, ChipValueType } from "../../../../common/gameInfo";
import style from "./bet.module.scss";
import { Sound } from "../../../sound";

interface IBetProps {
    betValue: CardValueType;
    chipsList: ChipValueType[];
    selectBet: (arg: CardValueType) => void;
    removeBet: (arg: CardValueType) => void;
    isSelected: boolean;
}
export const Bet = ({ betValue, chipsList, selectBet, removeBet, isSelected }: IBetProps) => {
    const onClickHandle = useCallback(() => {
        selectBet(betValue);
    }, [betValue, selectBet]);

    const onRemoveBet = useCallback(() => {
        if (isSelected) {         
            Sound.playSound("removeBet");
            removeBet(betValue);
        }
    }, [betValue, removeBet, isSelected]);

    return (
        <div
            className={style.bet + (isSelected ? " " + style.selectedBet : "")}
            onClick={onClickHandle}
        >
            {betValue}
            {chipsList.map((chip, index) => (
                <Chip value={chip} onClick={onRemoveBet} key={`${index}-${chip}`} />
            ))}
        </div>
    );
};

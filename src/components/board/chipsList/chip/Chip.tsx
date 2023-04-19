import { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { ChipValue } from "../../../../store/bankStore/bankStore";
import { useRootStore } from "../../../../store";
import "./chip.scss";

interface IChipProps {
    value: ChipValue;
    onClick?: () => void;
}

export const Chip = observer(({ value, onClick }: IChipProps) => {
    const [chip, setChip] = useState();
    const { makeBet } = useRootStore().bankStore;

    const getChipIcon = async () => {
        const icon = (await import(`../../../../assets/images/chips/${value}.svg`)).default;
        setChip(icon);
    };

    const onClickHandle = useCallback(() => {
        onClick ? onClick() : makeBet(value);
    }, [value, makeBet]);

    useEffect(() => {
        getChipIcon();
    }, [value]);

    return (
        <div onClick={onClickHandle} className="chip">
            <img src={chip} width="50" height="50" className="" alt="chip" />
        </div>
    );
});

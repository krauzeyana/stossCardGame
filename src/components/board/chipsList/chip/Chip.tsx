import { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../../../store";
import { ChipValueType } from "../../../../common/gameInfo";
import "./chip.scss";

interface IChipProps {
    value: ChipValueType;
    onClick?: () => void;
}

export const Chip = observer(({ value, onClick }: IChipProps) => {
    const [chip, setChip] = useState();
    const { makeBet } = useRootStore().bankStore;

    const getChipIcon = useCallback(async () => {
        const icon = (await import(`../../../../assets/images/chips/${value}.svg`)).default;
        setChip(icon);
    }, [value, setChip]);

    const onClickHandle = useCallback(() => {
        onClick ? onClick() : makeBet(value);
    }, [value, makeBet, onClick]);

    useEffect(() => {
        getChipIcon();
    }, [value, getChipIcon]);

    return (
        <div onClick={onClickHandle} className="chip">
            <img src={chip} width="50" height="50" className="" alt="chip" />
        </div>
    );
});

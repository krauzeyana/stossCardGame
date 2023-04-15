import { useCallback, useEffect, useState } from "react";
import { ChipValue } from "../../../../store/bankStore/bankStore";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../../../store";

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
        if (onClick) {
            onClick();
        } else {
            makeBet(value);
        }
    }, [value, makeBet]);

    useEffect(() => {
        getChipIcon();
    }, [value]);

    return (
        <div onClick={onClickHandle}>
            <img src={chip} width="50" height="50" className="" alt="chip" />
        </div>
    );
});

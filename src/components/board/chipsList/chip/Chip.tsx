import React from "react";
import { useCallback, useEffect, useState } from "react";
import { ChipValueType } from "../../../../common/gameInfo";
import style from "./chip.module.scss";

interface IChipProps {
    value: ChipValueType;
    onClick: () => void;
}

export const Chip = React.memo(({ value, onClick }: IChipProps) => {
    const [chip, setChip] = useState();
    
    const getChipIcon = useCallback(async () => {
        const icon = (await import(`../../../../assets/images/chips/${value}.svg`)).default;
        setChip(icon);
    }, [value, setChip]);

    useEffect(() => {
        getChipIcon();
    }, [value, getChipIcon]);

    return (
        <div onClick={onClick} className={style.chip}>
            <img src={chip}  className="" alt="chip" />
        </div>
    );
});

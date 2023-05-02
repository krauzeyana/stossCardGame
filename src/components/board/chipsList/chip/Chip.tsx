import React from "react";
import { ChipValueType } from "../../../../common/gameInfo";
import style from "./chip.module.scss";
import { ChipListIcons } from "../../../../utils/chipsListIcons";

interface IChipProps {
    value: ChipValueType;
    onClick: () => void;
}

export const Chip = React.memo(({ value, onClick }: IChipProps) => {
    const ChipIcon = ChipListIcons[value];

    return (
        <div className={style.chip} onClick={onClick}>
            <ChipIcon  />
        </div>
    );
});

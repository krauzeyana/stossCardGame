import { observer } from "mobx-react-lite";
import { ChipValueType, chipsList } from "../../../common/gameInfo";
import { Chip } from "./chip/Chip";
import { useStore } from "../../../store";
import { useCallback } from "react";
import { Sound } from "../../sound";
import style from "./chipsList.module.scss";

export const ChipsList = observer(() =>{
    const { makeBet } = useStore("bankStore");

    const onClickHandle = useCallback((value: ChipValueType) => { 
        return () => {     
            Sound.playSound("addBet");
            makeBet(value);
        }
    }, [makeBet]);
    
    return (
        <div className={style.chipsList}>
            {chipsList.map((chip) => (
                <Chip key={chip} value={chip} onClick={onClickHandle(chip)} />
            ))}
        </div>
    );
});

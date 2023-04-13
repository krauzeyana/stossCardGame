import { useEffect, useState } from "react";

interface IChipProps{
    value: number
}

export function Chip({value}:IChipProps) {
    const [chip, setChip] = useState("");
    const getChipIcon = async () => {
        const icon =  (await import(`../../../../assets/images/chips/${value}.svg`)).default;
        setChip(icon);
    }
    useEffect(() => {
        getChipIcon();
    }, [value])

    return (
        <div>
            <img src={chip} width="50" height="50" className="" alt="chip" />
        </div>
    );
}

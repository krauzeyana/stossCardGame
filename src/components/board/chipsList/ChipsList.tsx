import { Chip } from "./chip/Chip";
import "./chipsList.scss"
export function ChipsList () {
    const chipsList = [1, 5, 10, 25, 50, 100];
    return (<div className="chipsList">
        {chipsList.map(chip => <Chip key={chip} value={chip}/>)}
    </div>)
}
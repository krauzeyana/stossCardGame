import { chipsList } from "../../../common/gameInfo";
import { Chip } from "./chip/Chip";
import "./chipsList.scss";
export function ChipsList() {
    return (
        <div className="chipsList">
            {chipsList.map((chip) => (
                <Chip key={chip} value={chip} />
            ))}
        </div>
    );
}

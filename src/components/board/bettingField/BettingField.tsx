import { cardValues } from "../../../common/gameInfo";
import { Bet } from "./bet/Bet";
import "./bettingField.scss";

export function BettingField() {
    return (
        <div className="betField">
            {cardValues.map((item) => (
                <Bet key={item} betValue={item} />
            ))}
        </div>
    );
}

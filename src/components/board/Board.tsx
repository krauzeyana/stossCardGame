import { Balance } from "./balance";
import { BettingField } from "./bettingField";
import "./board.scss";
import { CardArea } from "./cardArea";
import { ChipsList } from "./chipsList";

export function Board() {
    return (
        <>
            <Balance />
            <div className="wood">
                <div className="red">
                    <CardArea />
                    <BettingField />
                    <ChipsList />
                </div>
            </div>
        </>
    );
}

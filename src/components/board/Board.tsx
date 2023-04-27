import { observer } from "mobx-react-lite";
import { Balance } from "./balance";
import { BettingField } from "./bettingField";
import "./board.scss";
import { CardArea } from "./cardArea";
import { ChipsList } from "./chipsList";
import { TotalBet } from "./totalBet";
import { useRootStore } from "../../store";

export const Board: React.FC = observer(() => {
    const {totalBet} = useRootStore().bankStore;
    return (
        <>
                <div className="red">
                    <CardArea />
                    <BettingField />
                    <ChipsList />
            </div>
            <div className="amounts">
            <Balance />
            <TotalBet totalBet={totalBet}/>
            </div>
        </>
    );
})

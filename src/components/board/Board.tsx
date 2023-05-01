import { observer } from "mobx-react-lite";
import { Balance } from "./balance";
import { BettingField } from "./bettingField";
import { CardArea } from "./cardArea";
import { ChipsList } from "./chipsList";
import { useStore } from "../../store";
import style from "./board.module.scss";
import { useWindowWidth } from "../../utils/useWindowWidth";

export const Board: React.FC = observer(() => {
    const { totalBet, balance, deltaAmount } = useStore("bankStore");
    const isMobile = useWindowWidth();

    return (
        <>
            <div className={style.red}>
                <CardArea isMobile={isMobile} />
                <BettingField />
                <ChipsList />
            </div>
            <div className={style.amounts}>
                <Balance title="Balance" amount={balance} deltaAmount={deltaAmount} />
                <Balance title="Total Bet" amount={totalBet} />
            </div>
        </>
    );
});

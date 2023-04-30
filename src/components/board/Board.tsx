import { observer } from "mobx-react-lite";
import { Balance } from "./balance";
import { BettingField } from "./bettingField";
import { CardArea } from "./cardArea";
import { ChipsList } from "./chipsList";
import { useStore } from "../../store";
import { useEffect, useState } from "react";
import style from "./board.module.scss";

export const Board: React.FC = observer(() => {
    const { totalBet, balance, deltaAmount } = useStore("bankStore");
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    });

    return (
        <>
            <div className={style.red}>
                <CardArea
                    width={isMobile ? 350 : 768} //708
                    height={isMobile ? 350 : 187}
                />
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

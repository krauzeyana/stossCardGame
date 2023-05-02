import { observer } from "mobx-react-lite";
import { Balance } from "./balance";
import { BettingField } from "./bettingField";
import { CardArea } from "./cardArea";
import { ChipsList } from "./chipsList";
import { useStore } from "../../store";
import style from "./board.module.scss";
import { useWindowWidth } from "../../utils/useWindowWidth";
//import { LazyLoadImage } from "react-lazy-load-image-component"
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../loadingSpinner";
import { cacheImg } from "../../utils/cacheImg";

export const Board: React.FC = observer(() => {
    const { totalBet, balance, deltaAmount } = useStore("bankStore");
    const isMobile = useWindowWidth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        cacheImg(["./assets/images/deskTexture.jpg"], () => {setLoading(false)});
    }, []);
//require("../../assets/images/deskTexture5-min-min.jpg")
    return (
        <>
            {loading && <LoadingSpinner />}
            <img className={style.boardImage} src={"./assets/images/deskTexture.jpg"} /> 

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

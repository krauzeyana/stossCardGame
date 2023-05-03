import { observer } from "mobx-react-lite";
import { Balance } from "./balance";
import { BettingField } from "./bettingField";
import { CardArea } from "./cardArea";
import { ChipsList } from "./chipsList";
import { useStore } from "../../store";
import { useWindowWidth } from "../../utils/useWindowWidth";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../loadingSpinner";
import { cacheImg, generateImageSet, imgList } from "../../utils/cacheImg";
import style from "./board.module.scss";

export const Board: React.FC = observer(() => {
    const { totalBet, balance, deltaAmount } = useStore("bankStore");
    const isMobile = useWindowWidth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const loadDeskImage = () => {
            cacheImg(
                ["./assets/images/deskTexture.jpg"],
                () => {
                    setLoading(false);
                },
                false
            );
        };
        if (imgList.size !== 54) {
            const cardImgList: string[] = [];
            generateImageSet(cardImgList);
            cacheImg(
                cardImgList,
                () => {
                    loadDeskImage();
                },
                true
            );
        } else loadDeskImage();
    }, []);

    return (
        <>
            {loading && <LoadingSpinner />}
            <img className={style.boardImage} src={"./assets/images/deskTexture.jpg"} alt="board"/>

            <div className={style.red}>
                {!loading && <CardArea isMobile={isMobile} />}
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

import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../../components/loadingSpinner";
import { useStore } from "../../store";
import style from "./startPage.module.scss";

import card1 from "../../assets/images/cards/4H.svg";
import card2 from "../../assets/images/cards/7C.svg";
import card3 from "../../assets/images/cards/10D.svg";
import card4 from "../../assets/images/cards/2S.svg";
import card5 from "../../assets/images/cards/QH.svg";
import card6 from "../../assets/images/cards/AD.svg";
import { cardSuits, cardValues } from "../../common/gameInfo";
import { cacheImg, cacheImgBG, imgList } from "../../utils/cacheImg";

export const StartPage = observer(() => {
    const [loading, setLoading] = useState(true);
    const { removeAllBets, resetBalance } = useStore("bankStore");
    const { remixDeck } = useStore("playingStore");
    const cardImgList: string[] = [
        "./assets/images/cards/1B.svg",
        "./assets/images/cards/refresh.svg",
    ];
    const generateImageSet = () => {
        cardValues.forEach((value) => {
            cardSuits.forEach((suit) => {
                cardImgList.push(`./assets/images/cards/${value}${suit}.svg`);
            });
        });
    };

    useEffect(() => {
        setLoading(true);
        generateImageSet();
        cacheImgBG(cardImgList, () => {
            setLoading(false);
            //console.log(imgList)
        });
    }, []);

    const onClickHandle = () => {
        removeAllBets();
        resetBalance(false);
        remixDeck();
    };

    return (
        <>
            {loading && <LoadingSpinner />}
            <div className={style.imgContainer}>
                <img src={card1} />
                <img src={card2} />
                <img src={card3} />
                <img src={card4} />
                <img src={card5} />
                <img src={card6} />
            </div>
            <div className={style.startPage}>
                <span className={style.gameName}>Stoss</span>
                <Link to="/game" className={style.startButton} onClick={onClickHandle}>
                    Start
                </Link>
            </div>
        </>
    );
});

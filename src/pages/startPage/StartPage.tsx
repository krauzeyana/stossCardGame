import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../../components/loadingSpinner";
import { useStore } from "../../store";
import { cacheImg, generateImageSet } from "../../utils/cacheImg";
import style from "./startPage.module.scss";

export const StartPage = observer(() => {
    const [loading, setLoading] = useState(true);
    const { removeAllBets } = useStore("bankStore");
    const { remixDeck } = useStore("playingStore");
    
    useEffect(() => {
        const cardImgList: string[] = [];
        setLoading(true);
        generateImageSet(cardImgList);
        cacheImg(
            cardImgList,
            () => {
                setLoading(false);
            },
            true
        );
    }, []);

    const onClickHandle = () => {
        removeAllBets();
        remixDeck();
    };

    return (
        <>
            {loading && <LoadingSpinner />}
            <div className={style.imgContainer}>
                <img src={"./assets/images/cards/4H.svg"} alt="4H" />
                <img src={"./assets/images/cards/7C.svg"} alt="7C"/>
                <img src={"./assets/images/cards/10D.svg"} alt="10D"/>
                <img src={"./assets/images/cards/2S.svg"} alt="2S"/>
                <img src={"./assets/images/cards/QH.svg"} alt="QH"/>
                <img src={"./assets/images/cards/AD.svg"} alt="AD"/>
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

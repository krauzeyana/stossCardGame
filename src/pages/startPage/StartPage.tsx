import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../../components/loadingSpinner";
import { useStore } from "../../store";
import style from "./startPage.module.scss";

export const StartPage = observer(() => {
    const [loading, setLoading] = useState(true);
    const { removeAllBets, resetBalanceNewGame } = useStore("bankStore");
    const { remixDeck } = useStore("playingStore");

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const onClickHandle = () => {
        removeAllBets();
        resetBalanceNewGame();
        remixDeck();
    };

    return (
        <div className={style.startPage}>
            {loading && <LoadingSpinner />}
            <span className={style.gameName}>Stoss</span>
            <Link to="/game" className={style.startButton} onClick={onClickHandle}>
                Start
            </Link>
        </div>
    );
});

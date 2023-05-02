import { useEffect, useState } from "react";
import { Board } from "../../components/board";
import { Sound } from "../../components/sound";
import style from "./mainPage.module.scss";
import { LoadingSpinner } from "../../components/loadingSpinner";

export function MainPage() {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);   
    }, []);
    return (
        <>
        {/* <img className={style.deskImage} src="./texture2-min.jpg"/> */}
        <div className={style.deskImage}></div>
         {/* {loading && <LoadingSpinner />} */}
            <div className={style.desk}>
                <Board />
                <Sound />
            </div>
        </>
    );
}

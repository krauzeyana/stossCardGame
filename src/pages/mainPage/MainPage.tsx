import { Board } from "../../components/board";
import { Sound } from "../../components/sound";
import style from "./mainPage.module.scss";

export function MainPage() {
    return (
        <>
            <div className={style.deskImage}></div>
            <div className={style.desk}>
                <Board />
                <Sound />
            </div>
        </>
    );
}

import { Board } from "../../components/board";
import { NavBar } from "../../components/navBar";
import { Sound } from "../../components/sound";
import style from "./mainPage.module.scss";

export function MainPage() {
    return (
        <>
            <NavBar />
            <div className={style.desk}>
                <Board />
                <Sound />
            </div>
        </>
    );
}

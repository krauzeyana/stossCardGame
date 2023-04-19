import { Board } from "../../components/board";
import { NavBar } from "../../components/navBar";
import "./mainPage.scss";

export function MainPage() {
    return (
        <>
            <NavBar />
            <div className="desk">
                <Board />
            </div>
        </>
    );
}

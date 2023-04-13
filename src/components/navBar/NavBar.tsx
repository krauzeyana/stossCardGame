import { Link, NavLink } from "react-router-dom";
import { NewGame } from "./newGame";
import { Statistic } from "./statistic";
import { Settings } from "./settings";
import "./navBar.scss";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../loadingSpinner";

export function NavBar() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const icon = require("../../assets/images/icon.svg").default;
    const dash = require("../../assets/images/dash.svg").default;
    return (
        <>
            {loading && <LoadingSpinner />}
            <nav className="navBar">
                <Link to="/">
                    <img src={icon} width="30" height="30" className="" alt="logo" />
                    <span className="iconLabel">Stoss</span>
                </Link>
                <ul className="list">
                    <li className="list-item">
                        <Link className="" to="/game">
                            <NewGame />
                        </Link>
                    </li>
                    <img src={dash} width="30" height="30" className="" alt="dash" />
                    <li className="list-item">
                        <Link className="" to="/statistics">
                            <Statistic />
                        </Link>
                    </li>
                    <img src={dash} width="30" height="30" className="" alt="dash" />
                    <li className="list-item">
                        <Link className="" to="/settings">
                            <Settings />
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}

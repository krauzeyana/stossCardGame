import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Game } from "./game";
import { Statistic } from "./statistic";
import { Settings } from "./settings";
import { LoadingSpinner } from "../loadingSpinner";
import style from "./navBar.module.scss";

export function NavBar() {
    const [loading, setLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const icon = require("../../assets/images/icon.svg").default;
    const dash = require("../../assets/images/dash.svg").default;
    return (
        <>
            {loading && <LoadingSpinner />}
            <nav className={style.navBar}>
                <Link to="/">
                    <img src={icon} width="30" height="30" className="" alt="logo" />
                    <span className={style.iconLabel}>Stoss</span>
                </Link>
                <ul className={style.list}>
                    <li className={style.listItem}>
                        <NavLink
                            className={({ isActive }) => (isActive ? style.active : "")}
                            to="/game"
                        >
                            <Game isMobile={isMobile} />
                        </NavLink>
                    </li>
                    {!isMobile && <img src={dash} width="30" height="30" className="" alt="dash" />}
                    <li className={style.listItem}>
                        <NavLink
                            className={({ isActive }) => (isActive ? style.active : "")}
                            to="/statistics"
                        >
                            <Statistic isMobile={isMobile} />
                        </NavLink>
                    </li>
                    {!isMobile && <img src={dash} width="30" height="30" className="" alt="dash" />}
                    <li className={style.listItem}>
                        <NavLink
                            className={({ isActive }) => (isActive ? style.active : "")}
                            to="/settings"
                        >
                            <Settings isMobile={isMobile} />
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </>
    );
}

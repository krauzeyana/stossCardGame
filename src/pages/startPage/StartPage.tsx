import { Link } from "react-router-dom";
import "./startPage.scss";

export function StartPage() {
    return (
        <div className="startPage">
            <span className="gameName">Stoss</span>
            <Link to="/game" className="startButton">Start</Link>
        </div>
    );
}

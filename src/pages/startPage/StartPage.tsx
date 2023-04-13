import { Link } from "react-router-dom";
import "./startPage.scss";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../../components/loadingSpinner";

export function StartPage() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);
    
    return (
        <div className="startPage">
            {loading && <LoadingSpinner />}
            <span className="gameName">Stoss</span>
            <Link to="/game" className="startButton">Start</Link>
        </div>
    );
}

import { Link } from "react-router-dom";
import "./startPage.scss";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../../components/loadingSpinner";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../store";

export const StartPage = observer(() => {
    const [loading, setLoading] = useState(true);
    
    const {removeAllBets, resetBalanceNewGame} = useRootStore().bankStore;
    const {remixDeck} = useRootStore().playingStore;

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const onClickHandle = () =>{
        removeAllBets();
        resetBalanceNewGame();
        remixDeck();
    }
    
    return (
        <div className="startPage">
            {loading && <LoadingSpinner />}
            <span className="gameName">Stoss</span>
            <Link to="/game" className="startButton" onClick={onClickHandle}>Start</Link>
        </div>
    );
});

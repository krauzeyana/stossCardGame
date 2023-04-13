import { Bet } from "./bet/Bet";
import "./bettingField.scss";

export function BettingField () {
    const betsArray = ["2", "3", "4", "5", "6", "7", "8", "9","10", "J", "Q", "K", "A"];

    return (<div className="betField">
        {betsArray.map(item => <Bet key={item} betValue={item}/>)}
    </div>)
};
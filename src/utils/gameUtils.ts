import { observer } from "mobx-react-lite";
import { useRootStore } from "../store";

export const CheckBets = () => {
    const {bankStore, playingStore} = useRootStore();
    const {openCards} = playingStore;
    const {getBetBalance, changeBalance, clearBetLis} = bankStore;
    if(openCards){
        let minus = getBetBalance(openCards[0].value);
        if (minus > 0){
            clearBetLis(openCards[0].value)
        }
        let plus = getBetBalance(openCards[1].value);
        if (plus > 0){
            clearBetLis(openCards[1].value)
        }

        if(openCards[0].value === openCards[1].value){
            minus += plus;
            plus = 0;
        }

        const change = plus - minus;
        if (change !== 0){
            changeBalance(change);
        }
        
    }


    
}
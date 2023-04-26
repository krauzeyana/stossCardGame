import { observer } from "mobx-react-lite";

interface ITotalBetProps{
    totalBet: number;
}
export const TotalBet: React.FC<ITotalBetProps> = observer(({totalBet}: ITotalBetProps) => {
    return (
        <div className="balance">
            <h2>Total Bet: {totalBet}$</h2>
        </div>
    );
});

import "./bet.scss";

interface IBetProps {
    betValue: string;
}
export function Bet({ betValue }: IBetProps) {
    const from = "246810QA".includes(betValue) ? 1 : 2;
    const to = from + 1;
    const betsArray = ["2", "3", "4", "5", "6", "7", "8", "9","10", "J", "Q", "K", "A"];
    const fromG = betsArray.indexOf(betValue) + 1;
    const toG = fromG + 2;

    const style = {
        gridArea: "" + from + " / " + fromG + " / " + to + " / " + toG,
    };
    return (
        <div className="bet" style={style}>
            {betValue}
        </div>
    );
}

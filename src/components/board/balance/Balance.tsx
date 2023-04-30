import React from "react";
import style from "./balance.module.scss";

interface IBalanceProps{
    title:string;
    amount:number;
    deltaAmount?: number;
}
export const Balance: React.FC<IBalanceProps> = React.memo(({ title, amount, deltaAmount}: IBalanceProps) => {
    return (
        <div className={style.balance}>
            <h2>{title}: {amount}$</h2>
            {(deltaAmount && deltaAmount > 0) ? <h3>+{deltaAmount}$</h3> : ""}
        </div>
    );
});

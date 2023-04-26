import { observer } from "mobx-react-lite";
import { useRootStore } from "../../../store";
import "./balance.scss";

export const Balance: React.FC = observer(() => {
    const { balance, deltaAmount } = useRootStore().bankStore;

    return (
        <div className="balance">
            <h2>Balance: {balance}$</h2>
            {deltaAmount > 0 && <h3>+{deltaAmount}$</h3>}
        </div>
    );
});

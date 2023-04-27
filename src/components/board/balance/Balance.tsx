import { observer } from "mobx-react-lite";
import { useRootStore } from "../../../store";
import "./balance.scss";

export const Balance: React.FC = observer(() => {
    const { balance, deltaAmount } = useRootStore().bankStore;

    return (
        <div className="balance">
            <h2>Balance: {1200}$</h2>
            {500 > 0 && <h3>+{500}$</h3>}
        </div>
    );
});

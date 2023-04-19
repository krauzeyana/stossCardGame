import { observer } from "mobx-react-lite";
import { useRootStore } from "../../../store";
import "./balance.scss";

export const Balance: React.FC = observer(() => {
    const { balance } = useRootStore().bankStore;

    return (
        <div className="balance">
            <h2>{balance}$</h2>
        </div>
    );
});

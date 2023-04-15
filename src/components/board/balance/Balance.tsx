import { observer } from "mobx-react-lite";
import { useRootStore } from "../../../store";

export const Balance: React.FC = observer(() =>  {
    const {balance} = useRootStore().bankStore;

return <div><h2>{balance}$</h2></div>;
});
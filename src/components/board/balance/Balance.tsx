import { observer } from "mobx-react-lite";
import { useBankStore } from "../../../store/bankStore/bankStore";

export const Balance: React.FC = observer(() =>  {
    const {balance} = useBankStore();

return <div><h2>{balance}$</h2></div>;
});
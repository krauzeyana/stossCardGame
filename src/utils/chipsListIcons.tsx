import { ReactComponent as Chip1} from "../assets/images/chips/1.svg";
import { ReactComponent as Chip5} from "../assets/images/chips/5.svg";
import { ReactComponent as Chip10} from "../assets/images/chips/10.svg";
import { ReactComponent as Chip25} from "../assets/images/chips/25.svg";
import { ReactComponent as Chip50} from "../assets/images/chips/50.svg";
import { ReactComponent as Chip100} from "../assets/images/chips/100.svg";
import { ChipValueType } from "../common/gameInfo";
import { SVGProps } from "react";

type ChipListType = {
    [K in ChipValueType] : React.FunctionComponent<SVGProps<SVGSVGElement>>;
}
export const ChipListIcons:ChipListType = {
    1: Chip1,
    5: Chip5,
    10: Chip10,
    25: Chip25,
    50: Chip50,
    100: Chip100
}
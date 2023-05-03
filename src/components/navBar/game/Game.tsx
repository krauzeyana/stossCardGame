import { INavItemProps } from "../settings/Settings";
import { Play } from "../svgIcon/Play";

export const Game: React.FC<INavItemProps> = ({ isMobile }: INavItemProps) => {
    return isMobile ? <Play /> : <span>Game</span>;
};

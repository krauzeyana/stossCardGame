import { INavItemProps } from "../settings/Settings";
import { Stats } from "../svgIcon/Stats";

export const Statistic: React.FC<INavItemProps> = ({ isMobile }: INavItemProps) => {
    return isMobile ? <Stats /> : <span>Statistic</span>;
};

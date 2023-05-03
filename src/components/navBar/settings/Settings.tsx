import React from "react";
import { Cog } from "../svgIcon/Cog";

export interface INavItemProps {
    isMobile: boolean;
}
export const Settings: React.FC<INavItemProps> = ({ isMobile }: INavItemProps) => {
    return isMobile ? <Cog /> : <span>Settings</span>;
};

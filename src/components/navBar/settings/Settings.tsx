import React from "react";

export interface INavItemProps {
    isMobile: boolean;
}
export const Settings: React.FC<INavItemProps> = ({ isMobile }: INavItemProps) => {
    return isMobile ? (
        <svg
            fill="#ffffff"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 34.5 34.5"
            xmlSpace="preserve"
            width="40px"
            height="40px"
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <g>
                    <path d="M34.5,20.375v-6.25h-4.514c-0.32-1.313-0.838-2.545-1.521-3.669l3.193-3.193l-4.42-4.419l-3.193,3.193 c-1.125-0.683-2.355-1.2-3.67-1.521V0.001h-6.25v4.515c-1.313,0.321-2.546,0.838-3.671,1.521L7.262,2.844L2.843,7.263l3.193,3.193 c-0.684,1.125-1.2,2.357-1.521,3.669H0v6.25h4.516c0.32,1.312,0.838,2.545,1.521,3.669l-3.193,3.191l4.419,4.421l3.192-3.193 c1.125,0.685,2.357,1.2,3.671,1.521v4.516h6.25v-4.516c1.313-0.32,2.545-0.838,3.67-1.521l3.192,3.193l4.421-4.421l-3.193-3.191 c0.685-1.125,1.199-2.355,1.521-3.669H34.5z M17.25,23.5c-3.451,0-6.25-2.798-6.25-6.25S13.799,11,17.25,11s6.25,2.798,6.25,6.25 S20.701,23.5,17.25,23.5z"></path>{" "}
                </g>
            </g>
        </svg>
    ) : (
        <span>Settings</span>
    );
};

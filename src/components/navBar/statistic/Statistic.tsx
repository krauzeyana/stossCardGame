import { INavItemProps } from "../settings/Settings";

export const Statistic: React.FC<INavItemProps> = ({ isMobile }: INavItemProps) => {
    return isMobile ? (
        // <svg
        //     enable-background="new 0 0 63 47"
        //     height="47px"
        //     id="Layer_1"
        //     version="1.1"
        //     viewBox="0 0 63 47"
        //     width="63px"
        //     xmlSpace="preserve"
        //     xmlns="http://www.w3.org/2000/svg"
        //     xmlnsXlink="http://www.w3.org/1999/xlink"
        // >
        //     <g>
        //         <path
        //             d="M10,1H2C0.896,1,0,1.896,0,3v40c0,1.104,0.896,2,2,2h8c1.104,0,2-0.896,2-2V3C12,1.896,11.104,1,10,1z"
        //             fill="#FFF"
        //         />
        //         <path
        //             d="M27.833,15h-8C18.729,15,17,15.11,17,15.864v27.273C17,43.89,18.729,45,19.833,45h8   C28.938,45,29,43.89,29,43.137V15.864C29,15.11,28.938,15,27.833,15z"
        //             fill="#FFF"
        //         />
        //         <path
        //             d="M44.5,4h-8C35.396,4,34,4.334,34,5.364v37.273C34,43.666,35.396,45,36.5,45h8c1.104,0,1.5-1.334,1.5-2.363   V5.364C46,4.334,45.604,4,44.5,4z"
        //             fill="#FFF"
        //         />
        //         <path
        //             d="M61.5,29h-8c-1.104,0-2.5-0.175-2.5,0.228v14.545C51,44.175,52.396,45,53.5,45h8   c1.104,0,1.5-0.825,1.5-1.228V29.228C63,28.825,62.604,29,61.5,29z"
        //             fill="#FFF"
        //         />
        //     </g>
        // </svg>

        <svg
            className="svg-icon"
           // style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
           width="40px"
           height=" 40px"
           fill="#FFF"
           viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M93.090909 930.909091h930.909091v93.090909H0V0h93.090909v930.909091z m93.090909-442.181818h93.090909v372.363636H186.181818V488.727273z m209.454546-139.636364h93.090909v512h-93.090909V349.090909z m209.454545 139.636364h93.090909v372.363636h-93.090909V488.727273z m209.454546-186.181818h93.090909v558.545454h-93.090909V302.545455z m-555.985455 15.45309l-51.665455-77.451636L442.181818 83.688727l205.381818 136.936728 182.597819-162.327273 61.858909 69.585454-236.311273 210.036364L442.181818 195.584l-183.621818 122.414545z"
                fill="#FFF"
            />
        </svg>
    ) : (
        <span>Statistic</span>
    );
};

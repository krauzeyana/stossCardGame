import { useLayoutEffect, useState } from "react";

export const useWindowWidth = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    useLayoutEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return isMobile;
};

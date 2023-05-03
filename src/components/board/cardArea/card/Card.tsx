import { useEffect, useState } from "react";
import { Sprite, useTick } from "@pixi/react";
import { Texture, Ticker } from "pixi.js";
import * as PIXI from "pixi.js";
import { imgList } from "../../../../utils/cacheImg";

interface ICardProps {
    cardName: string;
    isAnimated: boolean;
    position?: { x: number; y: number };
    moveSpeed?: number;
    flipBefore?: number;
}
export function Card({ cardName, isAnimated, position, flipBefore, moveSpeed }: ICardProps) {
    const [X, setX] = useState(position ? position.x : 0);
    const [Y, setY] = useState(position ? position.y : 0);
    const [ticker, setTicker] = useState<Ticker | null>(null);
    const [width, setWidth] = useState(80);
    const [isCollapse, setIsCollapse] = useState(true);
    const backTexture = PIXI.Texture.from(imgList.get(`./assets/images/cards/1B.svg`)!)
    const [texture, setTexture] = useState<Texture>(backTexture);

    useTick((delta, ticker) => {
        setTicker(ticker);
        setX((prev) => prev + (moveSpeed ? moveSpeed : 1));
        if (flipBefore) {
            if (isCollapse && X <= flipBefore) {
                setIsCollapse(false);
                setWidth((prev) => prev + 2 * 8);
            } else {
                setWidth((prev) => prev + (isCollapse ? -0.5 : 2) * 8);
            }
        }
        if (flipBefore && X <= 0) {
            ticker.stop();
        }
    }, !!isAnimated);

    useEffect(() => {
        if (position) {
            setX(position.x);
            setY(position.y);
        }

        if (isAnimated) {
            if (flipBefore) {
                setWidth(80);
                setIsCollapse(true);
            }
            if (ticker) {
                ticker.start();
            }
        }

        if (cardName !== "" && cardName !== "1B") {
            setTexture(PIXI.Texture.from(imgList.get(`./assets/images/cards/${cardName}.svg`)!));
        }
    },[position, isAnimated, cardName, flipBefore, ticker]);

    return (
        <>
            {cardName && (
                <Sprite
                    position={{ x: X, y: Y }}
                    width={width}
                    height={112}
                    texture={flipBefore && isCollapse ? backTexture : texture}
                    zIndex={isAnimated ? 5 : 0}
                />
            )}
        </>
    );
}

import { useEffect, useState } from "react";
import { Sprite, useTick } from "@pixi/react";
import cardBack from "../../../../assets/images/cards/1B.svg";
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
    const [card, setCard] = useState("");
    const [X, setX] = useState(position ? position.x : 0);
    const [Y, setY] = useState(position ? position.y : 0);
    const [isOpen, setIsOpen] = useState(false);
    const [ticker, setTicker] = useState<Ticker | null>(null);
    const [width, setWidth] = useState(80);
    const [isCollapse, setIsCollapse] = useState(true);
    const backTexture = PIXI.Texture.from(cardBack);
    const [texture, setTexture] = useState<Texture>(PIXI.Texture.from(imgList.get(`./assets/images/cards/1B.svg`)!));
    const getCardIcon = async () => {
        const icon = (await import(`../../../../assets/images/cards/${cardName}.svg`)).default;
        setCard(icon);
        setIsOpen(true);
    };

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

        // if (cardName) {
        //     getCardIcon();
        // } else {
        //     setCard("");
        //     setIsOpen(false);
        // }
        //setTexture(PIXI.Texture.from(`../../../../assets/images/cards/${cardName}.svg`))
        if (cardName !== "" && cardName !== "1B") {
            //setTexture(PIXI.Texture.from(`./assets/images/cards/${cardName}.svg`));
            setTexture(PIXI.Texture.from(imgList.get(`./assets/images/cards/${cardName}.svg`)!));
            //  import( `../../../../assets/images/cards/${cardName}.svg`).then(val => setTexture(PIXI.Texture.from(val.default)));
        }
    }, [cardName]);

    return (
        <>
            {cardName && (
                <Sprite
                    position={{ x: X, y: Y }}
                    width={width}
                    height={112}
                    // image={flipBefore && isCollapse ? cardBack : card}
                    texture={flipBefore && isCollapse ? backTexture : texture}
                    zIndex={isAnimated ? 5 : 0}
                />
            )}
        </>
    );
}

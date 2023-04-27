import { useEffect, useRef, useState } from "react";
import { Sprite, useTick } from "@pixi/react";
import cardBack from "../../../../assets/images/cards/1B.svg";
import { Ticker } from "pixi.js";

interface ICardProps {
    cardName: string;
    isAnimated: boolean;
    position?: {x: number, y: number};
    isPrevOpen?: boolean;
    isFirst?: boolean;
    isSecond?: boolean;
    cardDeck?: boolean;
    moveSpeed?: number;
}
export function Card({
    cardName,
    isAnimated,
    isPrevOpen,
    position,
    isFirst,
    isSecond,
    cardDeck,
    moveSpeed,
}: ICardProps) {
    const [card, setCard] = useState("");
    const [X, setX] = useState(position ? position.x : 0);
    const [Y, setY] = useState(position ? position.y : 0);
    const [isOpen, setIsOpen] = useState(false);
    const [ticker, setTicker] = useState<Ticker | null>(null);
    const [tickerLastOpenCards, setTickerLastOpenCards] = useState<Ticker | null>(null);
    const [width, setWidth] = useState(80);
    const [isCollapse, setIsCollapse] = useState(true);
    const speed = 7;
    //speed 10 => isCollapse <= 110 || 192.5

    const getCardIcon = async () => {
        const icon = (await import(`../../../../assets/images/cards/${cardName}.svg`)).default;
        setCard(icon);
        setIsOpen(true);
    };

    useTick((delta, ticker) => {
        setTicker(ticker);
        if (isFirst) {
            setX((prev) => prev - 13);
           // setWidth(prev => (prev + (isCollapse ? -0.8 : 0.8)))
            //console.log("first", width, isCollapse, X)
        } else {
            setX((prev) => prev - 1 * speed);
          //  setWidth(prev => (prev + (isCollapse ? -0.8 : 0.8)))
            //console.log("second", width, isCollapse, X)
           // console.log("+")
        }
console.log(isFirst, isSecond, X, width,isCollapse)
        if (isCollapse && ((isSecond && X <= 35) || (isFirst && X <= 65))) {
            setIsCollapse(false);
            setWidth((prev) => prev + 2 * 8);
        } else {
            setWidth((prev) => prev + (isCollapse ? -0.5 : 2) * 8);
        }

        if (X <= 0) {
           setWidth((prev) => prev + (isCollapse ? -0.5 : 2) * 8);
            console.log(X, "ticker1")
            ticker.stop();
        }
    }, !isPrevOpen && (!!isFirst || !!isSecond));

    useTick((delta, ticker) => {
        setTickerLastOpenCards(ticker);

        setX((prev) => prev - 1 * (!!isSecond ? 13.5 : 8));

        if (X <= 0) {
            console.log(X, "ticker2")
            ticker.stop();
        }
    }, !!isPrevOpen);

    useTick((delta, ticker) => {
        console.log('1')
        setX((prev) => prev + 1 * (moveSpeed ? moveSpeed : 1));
    }, !!cardDeck);

    useEffect(() => {
        // if (!!isFirst || !!isSecond) {
        //     setWidth(80);
        //     if (position) {
        //         setIsCollapse(true);
        //         setX(position);
        //     }
        //     if (ticker) {
        //         ticker.start();
        //     }
        // }else{
        //   //  setIsCollapse(false);
        // }
    
        if (!!isPrevOpen) {
            if (position) {
                setX(position.x);
                setY(position.y);
            }
            if (tickerLastOpenCards) {
                tickerLastOpenCards.start();
            }
        } else if (!!isFirst || !!isSecond) {
            setWidth(80);
            if (position) {
                setIsCollapse(true);
                setX(position.x);
                setY(position.y);
            }
            if (ticker) {
                ticker.start();
            }
        }else{
            if (position) {
                setX(position.x);
                setY(position.y);
            }
        }

        if (cardName) {
            getCardIcon();
        } else {
            setCard("");
            setIsOpen(false);
        }
    }, [cardName]);

    return (
        // <>
        //     {isOpen && <img src={card} className="" alt={`chip-${cardName}`} />}
        //     {!isOpen && <div className="emptyImg" />}
        // </>
        <>
            {isOpen && (
                <Sprite
                    position={{ x: X, y: Y }}
                    width={width}
                    height={112}
                    image={!isPrevOpen && isAnimated && isCollapse ? cardBack : card}
                    zIndex={isAnimated ? 5 : 0}
                />
            )}
        </>
    );
}

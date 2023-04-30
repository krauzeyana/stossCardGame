import { observer } from "mobx-react-lite";
import { Card } from "./card/Card";
import { CardDeck } from "./cardDeck";
import { PositionLabel } from "./positionLabel";
import { RootStoreContext, rootStore, useStore } from "../../../store";
import style from "./cardArea.module.scss";
import { useEffect, useRef, useState } from "react";
import { Container, Stage } from "@pixi/react";
import { OpenCardDeck } from "./openCardDeck";

interface ICardAreaProps {
    width: number;
    height: number;
}
export const CardArea = observer(({ width, height }: ICardAreaProps) => {
    const { openCards, openedCardDeck, deckCount, openedDeckLength } = useStore("playingStore");

    const { isLose, isWin } = useStore("rootStore");
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return (
        <div className={style.cardArea}>
            <Stage
                width={isMobile ? 350 : 768} //708
                height={isMobile ? 350 : 187}
                //   width={width}
                //  height={height}
                options={{
                    backgroundAlpha: 0,
                    antialias: true,
                    // autoDensity:true,
                    //          resizeTo: cardAreaRef.current ? cardAreaRef.current : undefined
                }}
            >
                <RootStoreContext.Provider value={rootStore}>
                    <Container
                        name={"cardArea"}
                        position={{ x: isMobile ? 0 : 60, y: 0 }}
                        sortableChildren={true}
                    >
                        <>
                            {!isMobile && <OpenCardDeck />}
                            <Container
                                name="openedCardFirst"
                                position={{ x: isMobile ? 80 : 200, y: isMobile ? 220 : 50 }}
                                sortableChildren={true}
                                zIndex={5}
                            >
                                <PositionLabel text="Lose" color={isLose ? "black" : "white"} />

                                <Card
                                    cardName={
                                        openCards[0] ? openCards[0].value + openCards[0].suit : ""
                                    }
                                    isAnimated={true}
                                    position={{ x: 325, y: 0 }}
                                    flipBefore={65}
                                    moveSpeed={-13}
                                />
                            </Container>
                            <Container
                                name="openedCardSecond"
                                position={{ x: isMobile ? 190 : 350, y: isMobile ? 220 : 50 }}
                                sortableChildren={true}
                                zIndex={5}
                            >
                                <PositionLabel text="Win" color={isWin ? "black" : "white"} />
                                <Card
                                    cardName={
                                        openCards[1] ? openCards[1].value + openCards[1].suit : ""
                                    }
                                    isAnimated={true}
                                    position={{ x: 175, y: 0 }}
                                    flipBefore={35}
                                    moveSpeed={-7}
                                />
                            </Container>
                            <CardDeck isMobile={isMobile} />
                        </>
                    </Container>
                </RootStoreContext.Provider>
            </Stage>
        </div>
    );
});

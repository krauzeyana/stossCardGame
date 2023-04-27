import { observer } from "mobx-react-lite";
import { Card } from "./card/Card";
import { CardDeck } from "./cardDeck";
import { PositionLabel } from "./positionLabel";
import { RootStore, RootStoreContext, rootStore, useRootStore } from "../../../store";
import "./cardArea.scss";
import { Context, ReactNode, useEffect, useState } from "react";
import { Container, Stage } from "@pixi/react";
import * as PIXI from "pixi.js";

// import wizard from "../../../assets/images/cards/1B.svg";
interface IContextBridgeProps {
    children: ReactNode;
    Context: Context<RootStore | null>;
    render: (arg: JSX.Element) => JSX.Element;
}

interface IMyStageProps {
    children: JSX.Element;
    name: string;
    width: number;
    height: number;
    options: {};
}
/*
const ContextBridge = ({ children, Context, render }: IContextBridgeProps) => {
    return (
        <Context.Consumer>
            {(value) => render(<Context.Provider value={value}>{children}</Context.Provider>)}
        </Context.Consumer>
    );
};

export const MyStage = ({ children, ...props }: IMyStageProps) => {
    return (
        <ContextBridge
            Context={RootStoreContext}
            render={(children) => <Stage {...props}>{children}</Stage>}
        >
            {children}
        </ContextBridge>
    );
};
*/
export const CardArea = observer(() => {
    const { openCards, lastOpenedCard, openedCardDeck, deckCount, openedDeckLength } =
        useRootStore().playingStore;
    const { isLose, isWin } = useRootStore();
    const [arrCard, setArrCard] = useState(new Array<JSX.Element>());
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    useEffect(() => {
        const newArr: JSX.Element[] = [];
        const cardsPerLayout = Math.ceil(openedDeckLength / (13 * deckCount));
        for (let i = cardsPerLayout - 1; i > 0; i--) {
            newArr.push(
                <Card
                    cardName={"1B"}
                    key={`card-${i}`}
                    isAnimated={false}
                    position={{ x: i * -7, y: i * 2 }}
                />
            );
        }
        setArrCard(newArr);
    }, [openedDeckLength, deckCount]);

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
        // <div className="cardArea">
        //     <CardDeck
        //         cardName={lastOpenedCard ? lastOpenedCard.value + lastOpenedCard.suit : ""}
        //         isOpen={true}
        //     />
        //     <div className="openedCard">
        //         <PositionLabel text="Lose" />
        //         <div>
        //             <Card cardName={openCards[0] ? openCards[0].value + openCards[0].suit : ""} />
        //         </div>
        //     </div>
        //     <div className="openedCard">
        //         <PositionLabel text="Win" />
        //         <div>
        //             <Card cardName={openCards[1] ? openCards[1].value + openCards[1].suit : ""} />
        //         </div>
        //     </div>
        //     <CardDeck isOpen={false} />
        // </div>
        <div className="cardArea">
            <Stage
                width={isMobile ? 350 : 768} //708
                height={isMobile ? 350 : 187}
                options={{
                    backgroundAlpha: 0,
                    antialias: true,
                }}
            >
                <RootStoreContext.Provider value={rootStore}>
                    <Container
                        name={"cardArea"}
                        position={{ x: isMobile ? 0 : 60, y: 0 }}
                        sortableChildren={true}
                    >
                        <>
                            {openedCardDeck.length >= 2 && !isMobile && (
                                <Container
                                    name="prevOpenCard"
                                    position={{ x: isMobile ? 40 : 24, y: isMobile ? 50 : 50 }}
                                    sortableChildren={true}
                                >
                                    {arrCard}
                                    {openedCardDeck.length >= 4 && (
                                        <>
                                            <Card
                                                cardName={
                                                    openedCardDeck[openedCardDeck.length - 3]
                                                        .value +
                                                    openedCardDeck[openedCardDeck.length - 3].suit
                                                }
                                                isAnimated={false}
                                            />
                                            <Card
                                                cardName={
                                                    openedCardDeck[openedCardDeck.length - 4]
                                                        .value +
                                                    openedCardDeck[openedCardDeck.length - 4].suit
                                                }
                                                isAnimated={false}
                                                position={{ x: 12.5, y: 0 }}
                                            />
                                        </>
                                    )}
                                    <Card
                                        cardName={
                                            openedCardDeck[openedCardDeck.length - 1].value +
                                            openedCardDeck[openedCardDeck.length - 1].suit
                                        }
                                        isAnimated={true}
                                        position={{ x: 200, y: 0 }}
                                        isPrevOpen={true}
                                        isFirst={true}
                                    />
                                    <Card
                                        cardName={
                                            openedCardDeck[openedCardDeck.length - 2].value +
                                            openedCardDeck[openedCardDeck.length - 2].suit
                                        }
                                        isAnimated={true}
                                        position={{ x: 350, y: 0 }}
                                        isPrevOpen={true}
                                        isSecond={true}
                                    />
                                </Container>
                            )}

                            {/* <CardDeck
                                cardName={
                                    lastOpenedCard ? lastOpenedCard.value + lastOpenedCard.suit : ""
                                }
                                isOpen={true}
                            /> */}
                            <Container
                                name="openedCardF"
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
                                    isFirst={true}
                                />
                            </Container>
                            <Container
                                name="openedCardS"
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
                                    isSecond={true}
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

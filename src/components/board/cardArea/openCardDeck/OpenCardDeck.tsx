import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useStore } from "../../../../store";
import { Card } from "../card/Card";
import { Container } from "@pixi/react";

export const OpenCardDeck = observer(() => {
    const { openedCardDeck, deckCount, openedDeckLength } = useStore("playingStore");
    const [cardsArr, setCardsArr] = useState(new Array<JSX.Element>());

    useEffect(() => {
        const openDeckArr: JSX.Element[] = [];
        const cardsPerLayout = Math.ceil(openedDeckLength / (13 * deckCount));
        for (let i = cardsPerLayout - 1; i > 0; i--) {
            openDeckArr.push(
                <Card
                    cardName={"1B"}
                    key={`openDeckCard-${i}`}
                    isAnimated={false}
                    position={{ x: i * -7, y: i * 2 }}
                />
            );
        }

        setCardsArr(openDeckArr);
    }, [openedDeckLength, deckCount, openedCardDeck]);

    return (
        <>
            {openedCardDeck.length >= 2 && (
                <Container name="prevOpenCard" position={{ x: 24, y: 50 }} sortableChildren={true}>
                    {cardsArr}
                    {openedCardDeck.length >= 4 && (
                        <>
                            <Card
                                cardName={
                                    openedCardDeck[openedCardDeck.length - 4].value +
                                    openedCardDeck[openedCardDeck.length - 4].suit
                                }
                                isAnimated={false}
                            />
                            <Card
                                cardName={
                                    openedCardDeck[openedCardDeck.length - 3].value +
                                    openedCardDeck[openedCardDeck.length - 3].suit
                                }
                                isAnimated={false}
                                position={{ x: 12.5, y: 0 }}
                            />
                        </>
                    )}
                    <Card
                        cardName={
                            openedCardDeck[openedCardDeck.length - 2].value +
                            openedCardDeck[openedCardDeck.length - 2].suit
                        }
                        isAnimated={true}
                        position={{ x: 200, y: 0 }}
                        moveSpeed={-8}
                    />
                    <Card
                        cardName={
                            openedCardDeck[openedCardDeck.length - 1].value +
                            openedCardDeck[openedCardDeck.length - 1].suit
                        }
                        isAnimated={true}
                        position={{ x: 350, y: 0 }}
                        moveSpeed={-13.5}
                    />
                </Container>
            )}
        </>
    );
});

import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useState } from "react";
import { useStore } from "../../../../store";
import { Card } from "../card/Card";
import { Container } from "@pixi/react";
import * as PIXI from "pixi.js";
import { Sound } from "../../../sound";
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

interface ICardDeckProps {
    isMobile?: boolean;
}

export const CardDeck = observer(({ isMobile }: ICardDeckProps) => {
    const { openNewCards, isEmptyDeck, remixDeck, deckLength, deckCount } =
        useStore("playingStore");
    const { checkBets } = useStore("rootStore");
    const { unselectBet } = useStore("bankStore");
    const [imageSet, setImageSet] = useState<JSX.Element[]>([]);

    const onClick = useCallback(
        (event: PIXI.FederatedPointerEvent) => {
            event.preventDefault();
            unselectBet();
            if (isEmptyDeck) {
                Sound.playSound("cardShuffle");
                remixDeck();
            } else {
                Sound.playSound("cardOpen");
                openNewCards();
                checkBets();
            }
        },
        [openNewCards, remixDeck, checkBets, isEmptyDeck]
    );

    useEffect(() => {
        const deckJSXArr: JSX.Element[] = [];
        if (isEmptyDeck) {
            deckJSXArr.push(<Card cardName="refresh" isAnimated={false} key="refresh" />);
            for (let i = 0; i < 4; i++) {
                deckJSXArr.push(
                    <Card
                        cardName="1B"
                        key={`cardDeck-${i}`}
                        isAnimated={true}
                        moveSpeed={2.8 + i * 0.2}
                    />
                );
            }
        } else {
            const cardsPerLayout = Math.ceil(deckLength / (13 * deckCount));
            for (let i = 0; i < cardsPerLayout; i++) {
                deckJSXArr.push(
                    <Card
                        cardName="1B"
                        key={`card-${i}`}
                        isAnimated={false}
                        position={{ x: i * -8, y: i * 2 }}
                    />
                );
            }
        }
        setImageSet(deckJSXArr);
    }, [deckLength, isEmptyDeck]);

    return (
        <Container
            onpointerdown={onClick}
            cursor="pointer"
            eventMode="static"
            position={{ x: isMobile ? 50 : 525, y: isMobile ? 40 : 50 }}
        >
            {imageSet}
        </Container>
    );
});

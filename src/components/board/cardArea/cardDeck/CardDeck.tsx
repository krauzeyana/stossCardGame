import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useState } from "react";
import { useRootStore } from "../../../../store";
import { Card } from "../card/Card";
import "./cardDeck.scss";
import { Container } from "@pixi/react";

import * as PIXI from "pixi.js";
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

interface ICardDeckProps {
    cardName?: string;
    isMobile?:boolean;
}

export const CardDeck = observer(({ cardName, isMobile }: ICardDeckProps) => {
    const { openNewCards, isEmptyDeck, remixDeck, deckLength, openedDeckLength, deckCount } =
        useRootStore().playingStore;
    const { checkBets } = useRootStore();
    const { unselectBet } = useRootStore().bankStore;
    const [imageSet, setImageSet] = useState<JSX.Element[]>([]);
    const [openNew, setOpenNew] = useState(false);

    const onClick = useCallback(
        (event: PIXI.FederatedPointerEvent) => {
            unselectBet();
            event.preventDefault();
            if (isEmptyDeck) {
                remixDeck();
            } else {
                openNewCards();
                checkBets();
            }
        },
        [openNewCards, remixDeck, checkBets, isEmptyDeck]
    );

    useEffect(() => {
        const newArr: JSX.Element[] = [];
        const cardsPerLayout = Math.ceil(deckLength / (13 * deckCount));
        let name = cardName ? cardName : "1B";
        // let width = 80;
        // let height = 112;
        // if(!cardName){
        //     name = cardsPerLayout + "B";
        //     width = cardsPerLayout === 4 ? 92 :cardsPerLayout === 3 ? 89 : 80;
        //     height = cardsPerLayout === 4 ? 118 :cardsPerLayout === 3 ? 117 : 112;
        // }
        // const name = cardName ? cardName : cardsPerLayout + "B";
        for (let i = 0; i < cardsPerLayout; i++) {
            newArr.push(
                <Card
                    cardName={name}
                    key={`card-${i}`}
                    isAnimated={false}
                    position={{ x: i * -8, y: i * 2 }}
                />
            );
        }
        setImageSet(newArr);
        console.log(deckLength);
    }, [deckLength, cardName]);

    return (
        // <div className={"cardDeck" + (isOpen ? "" : " closedDeck")} onClick={onClick}>
        //     {imageSet.length > 0 && <>{imageSet}</>}
        //     {imageSet.length === 0 && !isOpen && <Card cardName="refresh2" />}
        //     {imageSet.length === 0 && isOpen && <div className="emptyImg"> </div>}
        // </div>
        <Container
            onpointerdown={onClick}
            cursor="pointer"
            eventMode="static"
            // position={{ x: isOpen? 25: 575, y: 50 }}
            position={{ x: isMobile ? 50 : 525, y: isMobile ? 40 :50 }}
            sortableChildren={true}
        >
            {deckLength > 4 && <>{imageSet}</>}
            {deckLength === 4 && (
                <>
                    <Card cardName="refresh3" isAnimated={false} />
                    <Card cardName="1B" isAnimated={true} moveSpeed={2.8} cardDeck={true} />
                    <Card cardName="1B" isAnimated={true}cardDeck={true} moveSpeed={3}  />
                    <Card cardName="1B" isAnimated={true} cardDeck={true}  moveSpeed={3.2}/>
                    <Card cardName="1B" isAnimated={true} cardDeck={true}  moveSpeed={3.4}/>
                </>
            )}
        </Container>
    );
});

import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useState } from "react";
import { useRootStore } from "../../../../store";
import { Card } from "../card/Card";
import "./cardDeck.scss";

interface ICardDeckProps {
    isOpen: boolean;
    cardName?: string;
}

export const CardDeck = observer(({ isOpen, cardName }: ICardDeckProps) => {
    const { openNewCards, isEmptyDeck, remixDeck, deckLength, openedDeckLength, deckCount } =
        useRootStore().playingStore;
    const { checkBets } = useRootStore();
    const [imageSet, setImageSet] = useState<JSX.Element[]>([]);

    const onClick = useCallback(() => {
        if (isEmptyDeck) {
            remixDeck();
        } else {
            openNewCards();
            checkBets();
        }
    }, [openNewCards, remixDeck, checkBets, isEmptyDeck]);

    useEffect(() => {
        const newArr: JSX.Element[] = [];
        const cardsPerLayout = Math.ceil(
            (isOpen ? openedDeckLength : deckLength) / (13 * deckCount)
        );
        const name = cardName ? cardName : "1B";
        for (let i = 0; i < cardsPerLayout; i++) {
            newArr.push(<Card cardName={name} key={`card-${i}`} />);
        }
        setImageSet(newArr);
    }, [deckLength, cardName, isOpen, openedDeckLength]);

    return (
        <div className={"cardDeck" + (isOpen ? "" : " closedDeck")} onClick={onClick}>
            {imageSet.length > 0 && <>{imageSet}</>}
            {imageSet.length === 0 && !isOpen && <Card cardName="refresh2" />}
            {imageSet.length === 0 && isOpen && <div className="emptyImg"> </div>}
        </div>
    );
});

import { observer } from "mobx-react-lite";
import "./cardDeck.scss";
import { useRootStore } from "../../../../store";
import { useCallback, useEffect, useState } from "react";
import { Card } from "../card/Card";
import { CheckBets } from "../../../../utils/gameUtils";

interface ICardDeckProps {
    isOpen: boolean;
    cardName?: string;
}

export const CardDeck = observer(({ isOpen, cardName }: ICardDeckProps) => {
    const image = require("../../../../assets/images/cards/1B.svg").default;
    const {
        openNewCards,
        isEmptyDeck,
        remixDeck,
        deckLength,
        openedDeckLength,
    } = useRootStore().playingStore;
    const {
       CheckBets
    } = useRootStore()
    const [imageSet, setImageSet] = useState<JSX.Element[]>([]);

    const onClick = useCallback(() => {
        if (isEmptyDeck) {
            remixDeck();
        } else {
            openNewCards();
            CheckBets()
        }
    }, [openNewCards, remixDeck, isEmptyDeck]);

    useEffect(() => {
        const newArr: JSX.Element[] = [];
        const to = Math.ceil((isOpen? openedDeckLength : deckLength) / 13);
        const name = cardName ? cardName : "1B";
            for (let i = 0; i < to; i++) {
                newArr.push(<Card cardName={name} key={`card-${i}`} />);
            }
            setImageSet(newArr);
    }, [deckLength, cardName, isOpen, openedDeckLength]);

    return (
        <div className="cardDeck" onClick={onClick}>
            {imageSet.length > 0 && <>{imageSet}</>}
            {imageSet.length === 0 && !isOpen && <Card cardName="refresh2" />}
            {imageSet.length === 0 && isOpen && <div className="emptyImg"> </div>}
        </div>
    );
});

import { observer } from "mobx-react-lite";
import { Card } from "./card/Card";
import "./cardArea.scss";
import { CardDeck } from "./cardDeck";
import { PositionLabel } from "./positionLabel";
import { useRootStore } from "../../../store";

export const CardArea = observer(() => {
    const {openCards, lastOpenedCard} = useRootStore().playingStore;
    return (
        <div className="cardArea">
            <CardDeck cardName={lastOpenedCard? lastOpenedCard.value + lastOpenedCard.suit : ""} isOpen={true} />
            <div className="openedCard">
                <PositionLabel text="Lose" />
                <div>

                <Card cardName={openCards[0] ? openCards[0].value + openCards[0].suit : ""}/>
                </div>
            </div>
            <div className="openedCard">
                <PositionLabel text="Win" />
                <div>

                <Card cardName={openCards[1] ? openCards[1].value + openCards[1].suit : ""} />
                </div>
            </div>
            <CardDeck isOpen={false}/>
        </div>
    );
})

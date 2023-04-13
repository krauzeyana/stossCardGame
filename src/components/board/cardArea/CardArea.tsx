import { Card } from "./card/Card";
import "./cardArea.scss";
import { CardDeck } from "./cardDeck";
import { PositionLabel } from "./positionLabel";

export function CardArea() {
    return (
        <div className="cardArea">
            <Card cardName="5S" />
            <div className="openedCard">
                <PositionLabel text="Lose" />
                <Card cardName="4H" />
            </div>
            <div className="openedCard">
                <PositionLabel text="Win" />
                <Card cardName="KC" />
            </div>
            <CardDeck />
        </div>
    );
}

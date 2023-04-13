import "./cardDeck.scss";

export function CardDeck () {
    const image = require("../../../../assets/images/cards/1B.svg").default;

    return (
        <div className="cardDeck">
            <img src={image}/>
            <img src={image}/>
            <img src={image}/>
            <img src={image}/>
        </div>
    );
}
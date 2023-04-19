import { useEffect, useState } from "react";

interface ICardProps {
    cardName: string;
}
export function Card({ cardName }: ICardProps) {
    const [card, setCard] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const getCardIcon = async () => {
        const icon = (await import(`../../../../assets/images/cards/${cardName}.svg`)).default;
        setCard(icon);
        setIsOpen(true);
    };

    useEffect(() => {
        if (cardName) {
            getCardIcon();
        } else {
            setCard("");
            setIsOpen(false);
        }
    }, [cardName]);

    return (
        <>
            {isOpen && <img src={card} className="" alt={`chip-${cardName}`} />}
            {!isOpen && <div className="emptyImg" />}
        </>
    );
}

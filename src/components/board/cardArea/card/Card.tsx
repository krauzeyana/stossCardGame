import { useEffect, useState } from "react";
import { ReactComponent as Cards } from '../../../../assets/images/cards/2H.svg'
interface ICardProps {
    cardName: string;
}
export function Card({ cardName }: ICardProps) {
    const [card, setCard] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const getCardIcon = async () => {
        const icon =  (await import(`../../../../assets/images/cards/${cardName}.svg`)).default;
        setCard(icon);
    }
    useEffect(() => {
        if(cardName){
            getCardIcon();
            setIsOpen(true);
        }
        else{
            setCard("");
            setIsOpen(false);
        }
    }, [cardName])
    return (
        <>
            {isOpen && <img src={card} className="" alt="logo" />}
            {!isOpen && <div className="emptyImg"/>}
        </>
    );
}

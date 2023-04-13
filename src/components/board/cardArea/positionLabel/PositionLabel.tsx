import "./positionLabel.scss";

interface IPositionLabelProps {
    text: string;
}
export function PositionLabel({ text }: IPositionLabelProps) {
    return <span className="positionLabel">{text}</span>;
}

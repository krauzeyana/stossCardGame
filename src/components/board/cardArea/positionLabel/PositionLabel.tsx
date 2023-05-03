import { Text } from "@pixi/react";
import { TextStyle } from "pixi.js";

interface IPositionLabelProps {
    text: string;
    color?: string;
}
export function PositionLabel({ text, color }: IPositionLabelProps): JSX.Element {
    return (
        <Text
            name="positionLabel"
            text={text}
            x={5}
            y={-40}
            style={
                new TextStyle({
                    align: "center",
                    fontFamily: "Antiquegr",
                    fontSize: 34,
                    fill: color ? color : "white",
                    stroke: "#01d27e",
                    dropShadow: true,
                    dropShadowColor: "black",
                    dropShadowBlur: 4,
                    dropShadowAngle: Math.PI / 4,
                    dropShadowDistance: 4,
                })
            }
        />
    );
}

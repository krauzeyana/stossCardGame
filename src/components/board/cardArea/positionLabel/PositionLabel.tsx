import { Text, useTick } from "@pixi/react";
import "./positionLabel.scss";
import { TextStyle, Ticker } from "pixi.js";
import { useEffect, useState } from "react";

interface IPositionLabelProps {
    text: string;
    // isAnimated?: boolean;
    color?: string;
}
export function PositionLabel({ text, color }: IPositionLabelProps): JSX.Element {
    // const [fontSize, setFontSize] = useState(34);
    // const [isIncr, setIsIncr] = useState(true);
    // const [ticker, setTicker] = useState<Ticker | null>(null);
    
    // useTick((delta, ticker) =>{
    //     setTicker(ticker);
    //     setFontSize(prev => {
    //         const newV = prev + (isIncr ? 1 : -1);
    //         if(newV === 59){
    //             setIsIncr(false);
    //         }
    //         if(newV === 34){
    //             ticker.stop();
    //         }
    //         return newV;
    //     });

    // }, isAnimated);

    // useEffect(() =>{
    //     setFontSize(34);
    //     setIsIncr(true);
    //     if(ticker){
    //         ticker.start();
    //     }
    // }, [isAnimated])
    
    return(
    <Text name="positionLabel" text={text} x={5} y={-40} style={new TextStyle({
        align: 'center',
        fontFamily: 'Antiquegr',
        fontSize: 34,
        fill: color ? color : 'white',
        stroke: '#01d27e',
        dropShadow: true,
        dropShadowColor: 'black',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 4,
        dropShadowDistance: 4,
      })}/>)
}

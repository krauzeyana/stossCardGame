// import * as PIXI from 'pixi.js';
import { Board } from "../../components/board";
import { NavBar } from "../../components/navBar";
import "./mainPage.scss";

import wizard from "../../assets/images/cards/1B.svg";
import { Container, Sprite, Stage } from "@pixi/react";
// PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

export function MainPage() {
    return (
        <>
            <NavBar />
            <div className="desk">
                <Board />
{/* 
                <Stage width={300} height={300} options={{ backgroundAlpha: 0 }}>
     <Container  
      eventMode='static' 
      cursor="pointer" onclick={() => {
        console.log("click4"); 
        
      }}>
      <Sprite
      x={250}
      y={250}
      anchor={[0.5, 0.5]}
      image={wizard}
     
    /></Container>
   
   </Stage> */}
            </div>
        </>
    );
}

import { useEffect, useState } from "react";
import { SGAME_TurtleRun_Logic } from "./instances/SGAME_TurtleRun_Logic";
import Button from "../components/Button";

export interface SGAME_TurtleRunProps {
    canvasId:string;
    width:number;
    height:number;
    fps:number;
}
const game = new SGAME_TurtleRun_Logic("turtlerun", 60);
const SGAME_TurtleRun = (props:SGAME_TurtleRunProps) => {
    useEffect(()=> {        
        console.log("enter game");
        return (()=> {
            console.log("exit game");
            game.clearTimeInterval();
        })
    })
    return (
        <>
    <canvas id={"turtlerun"} width={props.width} height={props.height} className="border border-primary m-1" />
    <hr />
    <Button title="stage1" callback={()=> {
        game.initLand(0);
    }} />
    <Button title="stage2" callback={()=> {
        game.initLand(1);
    }} />
    </>
    );
}

export default SGAME_TurtleRun;
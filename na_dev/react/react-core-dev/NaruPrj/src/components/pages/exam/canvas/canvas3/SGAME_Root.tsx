import { useEffect, useState } from "react"
import RangeInput from "../components/RangeInput";
import { SGAME_GameLogic } from "./helper/SGAME_GameLogic";
import Button from "../components/Button";

const game:SGAME_GameLogic = new SGAME_GameLogic("SGAME_ROOT");

const SGAME_Root = () => {    
    const [frameRate, setFrameRate] = useState(60);
    const [playerPower, setPlayerPower] = useState(1);

    function getCanvas() {
        return document.getElementById("SGAME_ROOT") as HTMLCanvasElement;   
    }

    const init = () => {
        game.setFps(frameRate);
        game.player.power = playerPower;  
    }

    useEffect(()=> {
        setTimeout(init,100);              
        return (() => {
            game?.clearTimer();
        })
    })

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <canvas className = "border" width={300} height={500} id="SGAME_ROOT" />
                    </div>
                    <div className="col">
                        <RangeInput min={10} max={120} default={frameRate} unit="fps" callback={(value)=> {
                            setFrameRate(value);  
                            game.clearTimer();                                  
                        }} />
                        <RangeInput min={1} max={5} default={playerPower} unit="Power" callback={(value)=> {
                            game.player.power = value;
                        }} />
                        <hr className="border border-primary m-1"/>
                        <Button title="ememyType1" callback={()=> {
                            game.makeEnemy(0);
                        }} />
                        <Button title="ememyType2" callback={()=> {
                            game.makeEnemy(1);
                        }} />
                        <Button title="ememyType3" callback={()=> {
                            game.makeEnemy(2);
                        }} />
                        <Button title="ememyType4" callback={()=> {
                            game.makeEnemy(3);
                        }} />
                        <hr className="border border-primary m-1"/>
                        <Button title="POWER UP" callback={()=> {
                            game.addItem("POWER");
                        }} />
                        <Button title="healing" callback={()=> {
                            game.addItem("HP");                            
                        }} />
                        <Button title="POINT" callback={()=> {
                            game.addItem("POINT");                            
                        }} />
                        <hr className="border border-primary m-1"/>                        
                        <Button title="test1" callback={()=> {
                            game.makeTimeTable(0);
                        }} />
                        <Button title="test2" callback={()=> {
                            game.makeTimeTable(1);
                        }} />
                        
                        <Button title="RMS" callback={()=> {
                            game.removeAllEnemyShot();
                        }} />
                        <hr className="border border-primary m-1"/>

                        <Button title="map position reset" callback={()=> {
                            game.mapPositionReset();
                        }} />

                        <Button title="map 1" callback={()=> {
                            game.makeMap(0);
                        }} />

                        <Button title="map 2" callback={()=> {
                            game.makeMap(1);
                        }} />

                        <hr className="border border-primary m-1"/>
                    </div>
                </div>                
            </div>
            
        </div>
    )
}

export default SGAME_Root;
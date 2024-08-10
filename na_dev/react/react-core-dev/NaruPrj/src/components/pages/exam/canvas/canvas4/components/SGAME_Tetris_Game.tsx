import { useEffect, useState } from "react";
import { SGAME_Tetris } from "../instance/SGAME_Tetris";
import Button from "../../components/Button";

export interface SGAME_Tetris_Game_Props {
    col:number;
    row:number;
    width:number;
    height:number;
    canvasId:string;
    previewLength:number;
    fps:number;
}
const makePrevewCanvasIds = (id:string,length:number) => {
    let result:Array<string> = [];
    for(let i=0; i<length; i++) {
        result.push(id + "_" + i);
    }
    return result;
}

const SGAME_Tetris_Game = (props:SGAME_Tetris_Game_Props) => {

    const canvasIds = {
        main : props.canvasId + "_main",
        next : makePrevewCanvasIds(props.canvasId + "_preview",props.previewLength),
        keep : props.canvasId + "_keep"
    }

    const tetris = SGAME_Tetris.getInstance(canvasIds.main,canvasIds.next ,canvasIds.keep,props.fps,props.col,props.row);
    const [totalPoint,setTotalPoint] = useState(tetris.point);
    const [combo,setCombo] = useState(tetris.combo);
    const [maxCombo,setMaxCombo] = useState(tetris.maxcombo);
    const [addPoint, setAddPoint] = useState(0);
    const [level, setLevel] = useState(tetris.level);

    useEffect(()=> {
        console.log("tetris enter");
        tetris.start();
        tetris.setPointCallback(point=> {
            setTotalPoint(point.totalPoint);
            setCombo(point.combo);
            setAddPoint(point.point);
            setLevel(point.level);
            setMaxCombo(point.maxCombo);
        })

        return (()=> {
            console.log("tetris exit");
        })
    })

return ( 
    <div>
    <h2>Tetris</h2>
    <div className="container">
        <div className="row">
            <div className="col">
                <canvas id={canvasIds.main} className="border" width={props.width} height={props.height} />                        
            </div>
            <div className="col">
                <ul>
                    <li>level : {level + 1}</li>
                    <li>totalPoint : {totalPoint} </li>
                    <li>combo : {combo}</li>
                    <li>maxCombo : {maxCombo} </li>
                    <li>addPoint : {addPoint}</li>
                </ul>
                <hr className="border border-primary m-1"/>
                <canvas id={canvasIds.keep} className = "border" width={70} height={70} />
                <hr className="border border-primary m-1"/>
                {canvasIds.next.map(id => (
                    <canvas id={id} className="border" width={50} height={50} />
                ))}
            </div>

            <div className="col">
                <div className="row">                            
                <div className="col">
                    <Button title="start" callback={()=> {
                        tetris.startGame();
                    }} /> 
                </div>

                <hr className="border border-primary m-1"/>
                <div className="col">
                    <Button title="down(j)" callback={()=> {
                        tetris.moveDown();
                    }} />

                    <Button title="drop(h)" callback={()=> {
                        tetris.blockQuickDrop();
                    }} />
                    
                    <Button title="left(m)" callback={()=> {
                        tetris.moveLeft();
                    }} />
                    <Button title="rotate(k)" callback={()=> {
                        tetris.rotateCounterClockwise();
                    }} />
                    <Button title="rotate(,)" callback={()=> {
                        tetris.rotateClockwise;
                    }} />
                    <Button title="right(.)" callback={()=> {
                        tetris.moveRight();
                    }} />


                    <Button title="keep(l)" callback={()=> {
                        tetris.keep();
                    }} />

                    <Button title="pause(')" callback={()=> {
                        tetris.togglePause();
                    }} />
                </div>
                </div>
            </div>
        </div>                
    </div>            
</div>
)
}

export default SGAME_Tetris_Game
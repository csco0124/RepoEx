import { useState } from "react";
import MakeNewCanvasView, { CanvasSize } from "./MakeNewCanvasView";
import DoteCanvasView from "./DoteCanvasView";
import DoteMainMenuView from "./DoteMainMenuView";
import { callback } from 'chart.js/dist/helpers/helpers.core';
import ColorPicker from "../components/ColorPicker";

interface DoteModel {
    x:number;
    y:number;
    color:string;
}

interface CanvasModel {
    width:number;
    height:number;
    layers: Array<Array<string>>
}

const DoteDraw = () => {
    const [canvasSize, setCanvasSize] = useState({width:32, height:32})
    const [layers, setLayers] = useState(Array<Array<Array<string>>>())
    const [forgroundColor, setForgroundColor] = useState("#000000");
    return (
        <article>
            <header>
            <h2>dote draw</h2>
            </header>    
            {
                <DoteMainMenuView items={
                    [
                        {
                            isActive : layers.length > 0,
                            title:"delete",
                            callback:()=> {
                                setLayers([]);
                            }
                        },
                    ]

                }
                
                />
            }    
            {layers.length > 0 ? 
            <ColorPicker title="forgroundColor" color={forgroundColor} callback={(color:string)=> {
                setForgroundColor(color);
            }}/> : <></>}
        
            {
                layers.length == 0 ? <MakeNewCanvasView callback={(size:CanvasSize)=> {
                    let layer = Array<Array<string>>();
                    for(let x=0; x<size.height; x++) {
                        let rows = Array<string>();
                        for(let y=0; y<size.width; y++) {
                            rows.push("#00000000");
                        }
                        layer.push(rows);
                    }
                    setLayers([layer]);                    
                }} /> : <DoteCanvasView layers={layers} width={400} forgroundColor={forgroundColor} selectLayer={0}/>
            }
        </article>
    )
}

export default DoteDraw

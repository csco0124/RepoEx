import { useEffect, useState } from "react";
import { SBarChartItemModel } from "../model/SBarChartItemModel";
import { SBarChartCanvas } from "./instance/SBarChartCanvas";
import { SChartThemeModel } from "../model/SChartThemeModel";

export interface SBarChartProps {
    canvasid:string;
    width:number;
    height:number;
    items:Array<SBarChartItemModel>;
    theme:SChartThemeModel;
}

const SBarChart = (props:SBarChartProps) => {
    const [canvas, setCanvas] = useState( new SBarChartCanvas(props.canvasid,{width:props.width, height:props.height},props.theme))
    
    useEffect(()=> {      
        canvas.setData(props.items);
        canvas.render();  
        return (()=> {

        })
    })

    return (
        <canvas id={props.canvasid} width={props.width} height={props.height} className="border border-primary m-1" />        
    )
}

export default SBarChart

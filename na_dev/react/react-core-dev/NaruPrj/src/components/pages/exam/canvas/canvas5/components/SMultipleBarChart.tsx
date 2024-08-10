import { useEffect, useState } from "react";
import { SMultipleBarChartItemModel } from "../model/SMultipleChartItemModel";
import { SChartThemeModel } from "../model/SChartThemeModel";
import { SMultipleBarChartModel } from "../model/SMultipleChartModel";
import { SMultipleBarChartCanvas } from "./instance/SMultipleBarChartCanvas";

export interface SMultipleBarChartProps {
    canvasid:string;
    width:number;
    height:number;
    items:Array<SMultipleBarChartItemModel>;
    chartData:SMultipleBarChartModel;
    theme:SChartThemeModel;
}

const SMultipleBarChart = (props:SMultipleBarChartProps) => {
    const [canvas, setCanvas] = useState( new SMultipleBarChartCanvas(props.canvasid,{width:props.width, height:props.height},props.theme))
    
    useEffect(()=> {      
        canvas.setItems(props.items);
        console.log(props.items);
        canvas.setChart(props.chartData);
        canvas.render();  
        return (()=> {
            
        })
    })

    return (
        <canvas id={props.canvasid} width={props.width} height={props.height} className="border border-primary m-1" />        
    )
}

export default SMultipleBarChart

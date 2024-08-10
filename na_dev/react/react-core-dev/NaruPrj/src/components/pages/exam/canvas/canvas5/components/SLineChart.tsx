import { useEffect, useState } from "react";
import { SChartThemeModel } from "../model/SChartThemeModel";
import { SLineChartItemModel } from "../model/SLineChartItemModel";
import { SLineChartCanvas } from './instance/SLineChartCanvas';
import { SLineChartModel } from "../model/SLineChartModel";

export interface SLineChartProps {
    canvasid:string;
    width:number;
    height:number;
    items:Array<SLineChartItemModel>;
    theme:SChartThemeModel;
    info:SLineChartModel;
}

const SLineChart = (props:SLineChartProps) => {

    const [canvas,setCanvas] = useState(new SLineChartCanvas(props.canvasid,{width:props.width, height:props.height},props.theme))

    useEffect(()=> {
        canvas.setItems(props.items);
        canvas.setInfo(props.info);
        canvas.render();
        return (()=> {

        })
    })
    return (
        <canvas id={props.canvasid} width={props.width} height={props.height} className="border border-primary m-1" /> 
    )
}

export default SLineChart;
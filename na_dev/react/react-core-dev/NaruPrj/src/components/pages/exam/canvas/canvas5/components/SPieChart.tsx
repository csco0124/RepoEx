import { useEffect, useState } from "react";
import { SChartThemeModel } from "../model/SChartThemeModel";
import { SPieChartItemModel } from "../model/SPieChartItemModel";
import { SPiechartModel } from "../model/SPieChartModel";
import { SPieChartCanvas } from "./instance/SPieChartCanvas";

export interface SPiChartProps {
    canvasid:string;
    width:number;
    height:number;
    items:Array<SPieChartItemModel>;
    chartData:SPiechartModel;
    theme:SChartThemeModel;
}

const SPieChart = (props:SPiChartProps) => {
    const [canvas, setCanvas] = useState( new SPieChartCanvas(props.canvasid,{width:props.width, height:props.height},props.theme))
    
    useEffect(()=> {      
        
        canvas.setItems(props.items);
        console.log(props.items);
        canvas.setChartData(props.chartData);
        canvas.render();  
        return (()=> {
            
        })
    })

    return (
        <canvas id={props.canvasid} width={props.width} height={props.height} className="border border-primary m-1" />
    )
}

export default SPieChart;
import { SPieChartItemModel } from "../../model/SPieChartItemModel";
import { SPiechartModel } from '../../model/SPieChartModel';
import { SChartCanvas } from "./SChartCanvas";
import { Dictionary } from "@reduxjs/toolkit";

export class SPieChartCanvas extends SChartCanvas {
    items = Array<SPieChartItemModel>();

    public setItems(data:Array<SPieChartItemModel>) {
        this.items = data;
    }

    chartData:SPiechartModel = {title:"",boxWidth:0,piStrokeColor:"clear",colors:{}}
    setChartData(data:SPiechartModel) {
        this.chartData = data;
    }

    private getChartItems():Array<{title:string,color:string,value:number}> {
        let result = Array<{title:string,color:string,value:number}>();
        let test:Dictionary<string> = {};
        this.items.map(item=> {
            item.values.map(value => {
                if(test[value.title] == null) {
                    test[value.title] = value.title;
                    result.push({
                        title:value.title,
                        value:value.value,
                        color:this.chartData.colors[value.title] ?? "black"
                    })
                }        
            })
        })
        return result;
    }

    private makePiChartValue(chartIdx:number, valueIdx:number):number {
        let total = 0
        this.items[chartIdx].values.map(value => {            
            total += value.value;
        })
        const value = this.items[chartIdx].values[valueIdx].value;
        return value / total;
    }


    protected draw(ctx: CanvasRenderingContext2D): void {
        super.draw(ctx);
        ctx.beginPath();
        const chartItems = this.getChartItems();
        const bx1 = this.theme.padding.left;
        const bx2 = bx1 + this.chartData.boxWidth;
        const by1 = this.theme.padding.top;
        const by2 = by1 + chartItems.length * 20 + 10;

        ctx.strokeStyle = this.theme.gridLineWeakColor;
        ctx.beginPath();
        ctx.moveTo(bx1,by1);
        ctx.lineTo(bx2,by1);
        ctx.lineTo(bx2,by2);
        ctx.lineTo(bx1,by2);
        ctx.lineTo(bx1,by1);
        ctx.stroke();

        for(let i=0;i<chartItems.length; i++) {
            const item = chartItems[i];
            ctx.fillStyle = item.color;
            const iy = by1+20 * i + 10;
            ctx.font = "15px Arial";
            ctx.fillRect(bx1+10,iy ,20,10);
            ctx.fillStyle = "black";
            ctx.fillText(item.title, bx1+35, iy + 10);
        }

        ctx.fillStyle = this.theme.textFillColor;
        ctx.strokeStyle = this.theme.barStrokeColor;
        ctx.font = "25px Arial";
        ctx.fillText(this.chartData.title, bx1,by2 + 30);
        ctx.strokeText(this.chartData.title, bx1,by2 + 30);
        

        const x1 = bx2 + this.theme.padding.left;
        const x2 = this.size.width - this.theme.padding.right;
        const y1 = this.theme.padding.top;
        const y2 = this.size.height - this.theme.padding.bottom;
        const length = this.items.length;

        function getChartPoints(index:number):Array<{x:number,y:number}> {
            let result = Array<{x:number,y:number}>();
            if(index<0 || index >= length) {
                return result;
            }
            const width = x2 - x1;
            const cwidth = width / length;
            result.push({x:x1 + cwidth * index + 5, y:y1});
            result.push({x:x1 + cwidth * index + cwidth, y:y1});
            result.push({x:x1 + cwidth * index + cwidth, y:y2});
            result.push({x:x1 + cwidth * index + 5, y:y2});
            return result;
        }

        function getCenter(index:number):{x:number,y:number,width:number,height:number} {
            let result = {x:0,y:0,width:0,height:0};
            const width = x2-x1;
            const cwidth = width / length;
            const height = y2 - y1;
            result.x = x1 + cwidth * index + cwidth / 2;
            result.y = y1 + height / 2;
            result.width = cwidth;
            result.height = height;
            return result;
        }

        function getRadius(index:number):number {
            const center = getCenter(index);
            if (center.width < center.height) {
                return center.width / 2 - 10;
            }
            return center.height / 2 - 10
        }

        for(let i=0; i< length; i++) {
            const points = getChartPoints(i)
            ctx.beginPath();
            ctx.strokeStyle = this.theme.gridLineWeakColor;
            ctx.moveTo(points[points.length-1].x,points[points.length-1].y)
            points.map(point=> {
                ctx.lineTo(point.x,point.y);
            })
            ctx.stroke();                

            const center = getCenter(i);
            const cx = center.x + 3;
            const cy = center.y;
            const radius = getRadius(i);
            const pi2 = Math.PI * 2;
            ctx.beginPath();
            
            let beforeTotalval = 0;
            this.items[i].values.map(value =>  {                
                const idx = this.items[i].values.indexOf(value);
                const cvalue = this.makePiChartValue(i,idx);
                let start = (pi2 * beforeTotalval) - (pi2 * (90/360)) ;

                const end = pi2 * cvalue + start;
                ctx.beginPath();  
                ctx.moveTo(cx,cy);
                ctx.arc(cx,cy,radius, start,end);
                ctx.lineTo(cx,cy)              
                ctx.lineTo(cx,cy);
                ctx.strokeStyle = this.chartData.piStrokeColor;
                ctx.fillStyle = this.chartData.colors[value.title] ?? "black";
                ctx.fill();    
                ctx.stroke();
                beforeTotalval += cvalue;
                }
            )
            
    

            ctx.fillStyle = "black";
            ctx.font = "20px Arial";
            ctx.fillText(this.items[i].title ,points[0].x + 10, y1 + 20);
        }

    
    }
}
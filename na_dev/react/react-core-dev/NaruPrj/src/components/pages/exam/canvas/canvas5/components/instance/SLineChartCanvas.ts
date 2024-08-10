import { SLineChartItemModel } from '../../model/SLineChartItemModel';
import { SChartCanvas } from './SChartCanvas';
import { SLineChartModel } from '../../model/SLineChartModel';

export class SLineChartCanvas extends SChartCanvas {
    items = Array<SLineChartItemModel>();
    public setItems(arr:Array<SLineChartItemModel>) {
        this.items = arr;
    }
    chartInfo:SLineChartModel = {title:"",descBoxWidth:0,lineStyle:"normal"}
    public setInfo(info:SLineChartModel) {
        this.chartInfo = info;
    }

    findMinMaxLength():{min:number,max:number,length:number} {
        let min = 0;
        let max = 0;
        let length = 0;
        this.items.map(item=> {
            item.values.map(value => {
                if(value > max) {
                    max = value;
                }
                if(value < min) {
                    min = value;
                }
            })
        })
        if(min > 0) {
            length = max;
        }
        if(max < 0) {
            length = -min;
        }
        length = max - min 
        return {min:Math.ceil(min),max: Math.ceil(max),length:Math.ceil(length)}
    }

    findMaxItemLength():number {
        let max = 0;
        this.items.map(item => {
          const l = item.values.length-1;
          if(max < l) {
            max = l;
          }
        })
        return max;
    }


    protected draw(ctx: CanvasRenderingContext2D): void {
        super.draw(ctx);
        ctx.beginPath();
        const drawBox = (points:Array<{x:number,y:number}>,color:string) => {
            const last = points[points.length-1];
            ctx.beginPath();
            ctx.moveTo(last.x,last.y);
            points.map(point=> {
                ctx.lineTo(point.x, point.y);
            })
            ctx.strokeStyle = color;
            ctx.stroke();
        }

        const bx1 = this.theme.padding.left;
        const bx2 = bx1 + this.chartInfo.descBoxWidth;
        const by1 = this.theme.padding.top;
        const by2 = by1 + this.items.length * 20 + 10;
        drawBox([{x:bx1,y:by1},{x:bx2,y:by1},{x:bx2,y:by2}, {x:bx1,y:by2}],this.theme.gridLineStrongColor);

        ctx.font = "25px Arial";
        ctx.strokeStyle = this.theme.textStrokeColor;
        ctx.fillStyle = this.theme.textFillColor;
        ctx.fillText(this.chartInfo.title,bx1,by2+30);
        ctx.strokeText(this.chartInfo.title,bx1,by2+30)

        for(let i=0; i<this.items.length; i++) {
            const item = this.items[i];
            const ty = by1 + i * 20 + 10;
            const tx = bx1 + 10;
            ctx.fillStyle = item.lineColor;
            ctx.fillRect(tx,ty,20,10);
            ctx.fillStyle = "black";
            ctx.font = "15px Arial";
            ctx.fillText(item.title,tx+ 25, ty +10);
        }

        const x1 = this.theme.padding.left *2 + this.chartInfo.descBoxWidth + 20;
        const x2 = this.size.width - this.theme.padding.right;
        const y1 = this.theme.padding.top;
        const y2 = this.size.height - this.theme.padding.bottom;
        drawBox([{x:x1,y:y1},{x:x2,y:y1},{x:x2,y:y2},{x:x1,y:y2}],this.theme.gridLineStrongColor);

        const minmax = this.findMinMaxLength();
        const min = minmax.min;
        const max = minmax.max;
        const length = minmax.length;
        const sizeHeight = y2 - y1;
        const itemHeight = sizeHeight / length;
        const sizeWidth = x2 - x1;
        const itemLength = this.findMaxItemLength();
        const itemWidth = sizeWidth / itemLength;
        
        ctx.strokeStyle = this.theme.gridLineWeakColor;
        ctx.beginPath();
        for(let i=0; i<length; i++) {
            const y = y2 - itemHeight * i;
            ctx.moveTo(x1,y);
            ctx.lineTo(x2,y);
            ctx.font="12px Arial";
            ctx.fillText(max-(length-i)+"" ,x1-20,y)
        }
        for(let i=0; i<itemLength; i++) {
            const x = x1 + itemWidth * i;
            ctx.moveTo(x,y1);
            ctx.lineTo(x,y2);            
        }
        ctx.stroke();

        const makeControlPoint = (itemId:number,valueId:number):{cp1:{x:number,y:number},cp2:{x:number,y:number},x:number,y:number} => {
            let result = {cp1:{x:0,y:0},cp2:{x:0,y:0},x:0,y:0};
            if(itemId > this.items.length) {
                return result;
            }
            if(valueId > this.items[itemId].values.length) {
                return result;
            }

            const value = this.items[itemId].values[valueId];

            result.x = valueId * itemWidth + x1;
            result.y = y2 - ((value - min)*itemHeight);

            switch(this.chartInfo.lineStyle) {
                case "bezierCurve":
                    result.cp1.x = result.x - itemWidth * 0.5;
                    result.cp2.x = result.x - itemWidth * 0.5;
                    result.cp1.y = result.y - itemHeight * 0.5;
                    result.cp2.y = result.y + itemHeight * 0.5;
                    if(valueId == 0) {
                        result.cp1.x = result.x;
                        result.cp1.y = result.y;
                        result.cp2.x = result.x;
                        result.cp2.y = result.y;
                    }
                    break;
                case "quadraticCurve":
                    result.cp1.x = result.x - itemWidth * 0.5;
                    result.cp1.y = result.y - itemHeight * 0.5;
                    if(valueId == 0) {
                        result.cp1.x = result.x;
                        result.cp1.y = result.y;
                    }
                    break;
                default:
                    break;
            }
        
            return result;
        }
        //draw test dote line

        // for(let i=0;i<this.items.length;i++) {            
        //     for(let j=0;j<this.items[i].values.length; j++) {
        //         const p = makeControlPoint(i,j);
        //         switch (this.chartInfo.lineStyle) {        
        //             case "bezierCurve":
        //                 ctx.beginPath();
        //                 ctx.arc(p.cp2.x, p.cp2.y,3,0,Math.PI*2);
        //                 ctx.fillStyle = "red";
        //                 ctx.fill()
        //                 ctx.beginPath();
        //                 ctx.strokeStyle = "#000000";
        //                 ctx.moveTo(p.cp1.x,p.cp1.y);
        //                 ctx.lineTo(p.cp2.x,p.cp2.y);
        //                 ctx.stroke()
        //                 ctx.beginPath();
        //                 ctx.strokeStyle = "#aaaaaa";
        //                 ctx.lineTo(p.x,p.y);
        //                 ctx.moveTo(p.x,p.y);
        //                 ctx.lineTo(p.cp1.x,p.cp1.y);
        //                 ctx.stroke()
        //             case "quadraticCurve":
        //                 ctx.beginPath();
        //                 ctx.arc(p.cp1.x, p.cp1.y,3,0,Math.PI*2);
        //                 ctx.fillStyle = "blue";
        //                 ctx.fill()
        //                 ctx.beginPath();
        //                 ctx.strokeStyle = "#000000";
        //                 ctx.moveTo(p.cp1.x,p.cp1.y);
        //                 ctx.lineTo(p.x,p.y);
        //                 ctx.stroke();
        //                 break;
    
        //             default:
        //                 break;
        //         }
        //     }
        // }
        //draw line
        this.items.map(item=> {          
            const itemId = this.items.indexOf(item);
            ctx.beginPath();
            for(let i=0; i<item.values.length; i++) {
                const p = makeControlPoint(itemId,i);
                
                ctx.strokeStyle = item.lineColor;
                ctx.fillStyle = item.lineColor;
                if(i==0) {
                    ctx.moveTo(p.x,p.y);                    
                }
                
                switch (this.chartInfo.lineStyle) {
                    case "normal":
                        ctx.lineTo(p.x,p.y);         
                        break;
                    case "bezierCurve":
                        ctx.bezierCurveTo(p.cp1.x,p.cp1.y,p.cp2.x,p.cp2.y,p.x,p.y);
                        break;
                    case "quadraticCurve":
                        ctx.quadraticCurveTo(p.cp1.x,p.cp1.y,p.x,p.y);
                        break;
                    
                }

                
            }
            ctx.stroke();
        })

        //draw dote
        this.items.map(item=> {
            for(let i=0; i<item.values.length; i++) {
                const value = item.values[i];
                const x = i * itemWidth + x1;
                const y = y2 - ((value - min)*itemHeight);
                ctx.strokeStyle = item.lineColor;
                ctx.fillStyle = item.lineColor;
                ctx.beginPath();
                ctx.arc(x,y,4,0,Math.PI*2);       
                ctx.fill()
            }
        })

    }

}
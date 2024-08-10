import { SBarChartItemModel } from "../../model/SBarChartItemModel";
import { SChartCanvas } from "./SChartCanvas";

export class SBarChartCanvas extends SChartCanvas {
    private chartData = Array<SBarChartItemModel>();

    public setData(items:Array<SBarChartItemModel>) {
        this.chartData = items;
    }
 
    private findMinMax():{min:number,max:number,length:number} {
        let max = 0;
        let min = 0;
        this.chartData.map(data=> {
            if(data.value > max) {
                max = data.value;
            }
            if(data.value < min) {
                min = data.value;
            }
        })
        let length = max - min;

        if(max > 0) {
            if(min > 0) {
                length = max;
                min = 0;
            }
        } else {
            max = 0;
            length = min * -1;
        }
        return {min:min, max:max,length:length};
    }


    protected draw(ctx: CanvasRenderingContext2D): void {
        super.draw(ctx);
        ctx.beginPath();
        const row  = this.chartData.length;
        const itemWidth = (this.size.width - this.theme.padding.left - this.theme.padding.right) / row;        
        const mx = this.findMinMax()
        const col = mx.length;
        const itemHeight = (this.size.height - this.theme.padding.top - this.theme.padding.bottom) / col;

        const bottomY = this.size.height - this.theme.padding.bottom - (-mx.min * itemHeight);

        const ptop = this.theme.padding.top;
        const pbottom = this.size.height - this.theme.padding.bottom;
        const pleft = this.theme.padding.left;
        const pright = this.size.width - this.theme.padding.right;
        ctx.strokeStyle = this.theme.gridLineWeakColor;
        ctx.beginPath();
        ctx.moveTo(pleft,ptop);
        ctx.lineTo(pright,ptop);
        ctx.lineTo(pright,pbottom);
        ctx.lineTo(pleft,pbottom);
        ctx.lineTo(pleft,ptop);
        ctx.stroke();
        
        for(let i=0; i<mx.length; i++) {
            ctx.strokeStyle = this.theme.gridLineStrongColor;
            if(mx.length > 10) {
                if((mx.length - i + mx.min )% 10!=0) {
                    ctx.strokeStyle = this.theme.gridLineWeakColor;
                }
            }
            if(i==mx.max) {
                ctx.strokeStyle = this.theme.gridLineStrongColor;                
            }
            const h = ptop + itemHeight*i;
            ctx.beginPath();
            ctx.moveTo(pleft, h);
            ctx.lineTo(pright, h);
            ctx.stroke();
        }

        for(let i=0; i<this.chartData.length; i++) {
            const data = this.chartData[i];
            let topY = ptop + itemHeight*(mx.length+mx.min-data.value);
            const x1 = i * itemWidth + this.theme.barPadding + this.theme.padding.left;
            const x2 = x1 + itemWidth - this.theme.barPadding*2;

            ctx.beginPath();
            ctx.moveTo(x1, topY);
            ctx.lineTo(x2, topY);
            ctx.lineTo(x2, bottomY);
            ctx.lineTo(x1, bottomY);
            ctx.lineTo(x1, topY);
            ctx.strokeStyle = this.theme.barStrokeColor;
            ctx.stroke();
            ctx.fillStyle = data.color;
            ctx.fill();

            ctx.font = "20px Arial";
            ctx.fillStyle = this.theme.textFillColor;
            ctx.strokeStyle  = this.theme.textStrokeColor;
            const textx =i * itemWidth + this.theme.barPadding + this.theme.padding.left ;
            ctx.strokeText(data.title, textx, this.size.height - 10,itemWidth);
            ctx.fillText(data.title, textx, this.size.height - 10,itemWidth);

            ctx.fillStyle = this.theme.valueTextFillColor;
            if(data.value < 0) {
                ctx.fillText(data.value+"",x1+5,topY - 20);
            } else {
                ctx.fillText(data.value+"",x1+5,topY + 20);
            }
        }
    }
}
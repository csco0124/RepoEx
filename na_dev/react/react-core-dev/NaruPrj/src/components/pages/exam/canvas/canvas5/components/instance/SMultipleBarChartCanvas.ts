import { SMultipleBarChartItemModel } from "../../model/SMultipleChartItemModel";
import { SMultipleBarChartModel } from "../../model/SMultipleChartModel";
import { SChartCanvas } from "./SChartCanvas";

export class SMultipleBarChartCanvas extends SChartCanvas {
    private chartItemData:Array<SMultipleBarChartItemModel> = [];
    private chartData:SMultipleBarChartModel = {
        title:"multiple bar chart",
        items:[],
        boxWidth:80,
    };

    public setItems(items:Array<SMultipleBarChartItemModel>) {
        this.chartItemData = items;
    }

    public setChart(option:SMultipleBarChartModel) {
        this.chartData = option;
    }


    private findMax():number {
        let max = 0;
        this.chartItemData.map(item=> {
            let total = 0;
            item.values.map(value=> {
                total += value;
            })
            if(max < total) {
                max = total;
            }
        })
        return max;
    }


    protected draw(ctx: CanvasRenderingContext2D): void {
        super.draw(ctx);
        ctx.beginPath();
        //draw outline 
        let x1 = this.theme.padding.left;
        const x2 = this.size.width - this.theme.padding.right;
        const y1 = this.theme.padding.top;
        const y2 = this.size.height - this.theme.padding.bottom;

        const boxWidth = this.chartData.boxWidth;
        const boxHeight = this.chartItemData.length * 20;
        ctx.beginPath();
        ctx.moveTo(x1,y1);
        ctx.lineTo(x1+boxWidth,y1);
        ctx.lineTo(x1+boxWidth,y1+ boxHeight);
        ctx.lineTo(x1,y1+ boxHeight);
        ctx.lineTo(x1,y1);
        ctx.strokeStyle = this.theme.gridLineStrongColor;
        ctx.stroke();    
        ctx.font = "18px Arial";
        ctx.fillStyle = this.theme.textFillColor;
        ctx.strokeStyle = this.theme.textStrokeColor;
        ctx.fillText(this.chartData.title, x1,y1 + boxHeight + 20);
        ctx.strokeText(this.chartData.title, x1,y1 + boxHeight + 20);
        for(let i=0; i<this.chartData.items.length; i++) {
            const data = this.chartData.items[this.chartData.items.length - i - 1];
            ctx.fillStyle = data.color;
            const y = y1 + 20 * i + 10;
            ctx.fillRect(x1+10, y ,20,10);
            ctx.fillStyle = "black";
            ctx.font = "12px Arial";
            ctx.fillText(data.title, x1+40, y+8);
        }
        x1 += (boxWidth + this.theme.padding.left);


        ctx.beginPath();
        ctx.strokeStyle = this.theme.gridLineStrongColor;
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y1);
        ctx.lineTo(x2,y2);
        ctx.lineTo(x1,y2);
        ctx.lineTo(x1,y1);
        ctx.stroke();
        
        const lineLength = this.findMax();
        const itemHeight = (y2 - y1)/lineLength;
        const itemWidth = (x2 - x1)/this.chartItemData.length;

        for(let i=0; i<lineLength; i++) {
            const ly = y2 - itemHeight * i
            ctx.strokeStyle = this.theme.gridLineWeakColor;
            if(lineLength > 10 && i % 10 == 0) {
                ctx.strokeStyle = this.theme.gridLineStrongColor;
            }
            ctx.beginPath();
            ctx.moveTo(x1,ly);
            ctx.lineTo(x2,ly);
            ctx.stroke();
        }

        for(let i=0; i<this.chartItemData.length; i++) {
            const data = this.chartItemData[i];
            const bx1 = i * itemWidth + this.theme.padding.left + this.theme.barPadding + boxWidth ;
            const bx2 = bx1 + itemWidth - this.theme.barPadding * 2;

            let barY = y2;
            for(let j=0; j<data.values.length; j++) {
                const value = data.values[j];
                const idx = j;

                const h = value * itemHeight
                ctx.beginPath();
                ctx.moveTo(bx1,barY);
                ctx.lineTo(bx2,barY);
                barY -= h;
                ctx.lineTo(bx2,barY);
                ctx.lineTo(bx1,barY);
                ctx.lineTo(bx1,barY + h);
                ctx.strokeStyle = this.theme.barStrokeColor;
                ctx.fillStyle = "gray";
                if(idx<this.chartData.items.length) {
                    ctx.fillStyle = this.chartData.items[idx].color;
                }
                ctx.stroke();
                ctx.fill();
            };
            ctx.font = "20px Arial";
            ctx.strokeStyle = this.theme.textStrokeColor;
            ctx.fillStyle = this.theme.textFillColor;
            ctx.strokeText(data.title, bx1, y2 + 20);
            ctx.fillText(data.title, bx1, y2 + 20);
        }


        


    }
}
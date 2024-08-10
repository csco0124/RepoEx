import { SChartThemeModel } from "../../model/SChartThemeModel";

export class SChartCanvas {
    readonly canvasId:string;
    readonly size:{width:number,height:number}
    readonly theme:SChartThemeModel;
    constructor(canvasId:string, size:{width:number, height:number}, theme:SChartThemeModel) {
        this.canvasId = canvasId;
        this.size = size;
        this.theme = theme;
    }
    
    protected getCtx():CanvasRenderingContext2D|null {
        const canvas = document.getElementById(this.canvasId) as HTMLCanvasElement;
        if(canvas == null) {
            return null;
        }
        return canvas.getContext('2d');
    }

    public render() {
        const ctx = this.getCtx();
        if(ctx != null) {
            this.draw(ctx);
        }
    }

    protected draw(ctx:CanvasRenderingContext2D) {
        ctx.clearRect(0,0,this.size.width, this.size.height);
    }
}
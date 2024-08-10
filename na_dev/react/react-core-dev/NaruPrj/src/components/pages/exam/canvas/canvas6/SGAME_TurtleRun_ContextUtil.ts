export class SGAME_TurtleRun_ContextUtil {
    ctx:CanvasRenderingContext2D;
    constructor(ctx:CanvasRenderingContext2D) {
        this.ctx = ctx;
    }
    public drawBox(rect:DOMRect, strokeColor?:string, fillColor?:string, globalCompositeOperation?:GlobalCompositeOperation) {
        const x1 = rect.x;
        const y1 = rect.y;
        const x2 = rect.x + rect.width;
        const y2 = rect.y + rect.height;

        let points = [
            {x:x1, y:y1},            
            {x:x2, y:y1},
            {x:x2, y:y2},
            {x:x1, y:y2},
        ]
        const l = points[points.length-1];
        this.ctx.beginPath();
        this.ctx.moveTo(l.x,l.y);
        points.map(p => {
            this.ctx.lineTo(p.x,p.y);
        })
        if(globalCompositeOperation != undefined) {
            this.ctx.globalCompositeOperation = globalCompositeOperation;
        }
        if(strokeColor!=undefined) {
            this.ctx.strokeStyle = strokeColor;
            this.ctx.stroke();
        }
        if(fillColor!=undefined) {
            this.ctx.fillStyle = fillColor;
            this.ctx.fill()
        }
        this.ctx.globalCompositeOperation = "source-over";

    }
}
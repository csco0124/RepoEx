export class SGAME_CanvasPointerHelper {
    readonly canvasId:string;
    lastPoint:DOMPoint|null = null;
    readonly onMove:(point:DOMPoint)=>void;
    readonly onClick:(point:DOMPoint)=>void;

    private getCanvas():HTMLCanvasElement|null {
        const canvas = document.getElementById(this.canvasId) as HTMLCanvasElement;
        return canvas
    }

    private getRect():DOMRect {
        if(this.getCanvas!=null) {
            return this.getCanvas()!.getBoundingClientRect();
        }
        return new DOMRect();
    }

    constructor(canvasId:string, onMove:(point:DOMPoint)=>void, onClick:(point:DOMPoint)=>void) {
        this.canvasId = canvasId;
        this.onMove = onMove;
        this.onClick = onClick;
        this.addGesture();
    }

    private addGesture(){
        const canvas = this.getCanvas()
        if(canvas==null) {
            setTimeout(()=>{
                this.addGesture();
            },1000);
            return;
        }
        canvas.onmousedown = this.onMouseEvent;
        canvas.onmousemove = this.onMouseEvent;
        canvas.onmouseup = this.onMouseEvent;
        canvas.onmouseleave = this.onMouseEvent;
        canvas.onmouseout = this.onMouseEvent;
        canvas.onmouseover = this.onMouseEvent;
    }



    getMousePoint = (event:MouseEvent)=> {
        const rect = this.getRect();        
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        return new DOMPoint(x,y);
    }

    onMouseEvent = (event:MouseEvent) => {        
        const point = this.getMousePoint(event);
        // console.log(point);        
             
        switch (event.type) {
            case 'mouseleave':
                this.lastPoint = null;
                break
            case 'mousemove':
                if(this.lastPoint != null) {
                    const nx = point.x - this.lastPoint.x 
                    const ny = point.y - this.lastPoint.y 
                    console.log("nx : " + nx + " ny : " + ny);
                    this.lastPoint = point;
                    this.onMove(new DOMPoint(nx,ny));
                }
                break
            case 'mousedown':
                this.lastPoint = point   
                break;
            case 'mouseout':
                break;
            case 'mouseover':
                break;
            case 'mouseup':                
                this.onClick(point);
                this.lastPoint = null;
                break;
            default: 
                console.log(event.type);
        }
    }

}
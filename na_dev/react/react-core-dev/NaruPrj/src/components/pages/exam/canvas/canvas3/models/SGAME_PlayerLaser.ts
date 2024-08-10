import { SGAME_MoveableUnit } from "./SGAME_MoveableUnit";

export class SGAME_PlayerLaser extends SGAME_MoveableUnit {
    constructor(position:{x:number,y:number}, atteck:number) {                
        const data = {
            position :{x :position.x, y : position.y},
            radius:10,
            hp:10,
            movement:{x:0, y:-10},
            speed:1,
            imageUrl:''
        }
        super(data);
        this.atteck = atteck;
        this.color = "orange";
    }

    private diecount = 0;
    public draw(ctx: CanvasRenderingContext2D): void {
        const w = this.radius * 2 + this.atteck * 3;
        const h = this.radius * Math.abs(this.movement.y) * 0.7;

        const x = this.position.x - w / 2
        const y = this.position.y - h 
        const x2 = x + w;
        const y2 = y + h;

        if(this.isDie() == true) {
            this.diecount ++;
            const d = this.diecount * 2;
            const xx = x - d;
            const yy = y + d;
            const ww = w + d * 2;
            const hh = h - d * 2;
            if(hh < 0) {
                this.willRemove = true;
            }          
            ctx.beginPath();
            ctx.globalCompositeOperation = "lighten";
            ctx.fillStyle = this.color;
            ctx.fillStyle = "#FF0000aa";
            ctx.fillRect(xx,yy,ww,hh);
            ctx.globalCompositeOperation = "source-over";
            return;
        }
        super.process();
        ctx.globalCompositeOperation = "lighten";
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.strokeStyle = "yellow";
        ctx.fillRect(x,y,w,h);
        ctx.moveTo(x,y);
        ctx.lineTo(x,y2);
        ctx.moveTo(x2,y);
        ctx.lineTo(x2,y2);
        ctx.stroke();
        ctx.globalCompositeOperation = "source-over";
    }
}
import { SGAME_MoveableUnit } from "./SGAME_MoveableUnit";

export class SGAME_PlayerShot extends SGAME_MoveableUnit {
    constructor(position:{x:number,y:number},shotIdx:number) {        

        const shotMovements = [
            {x:0.5, y:-20}, {x:-0.5, y:-20},
            {x:-1, y:-19}, {x:1, y:-19}, 
            {x:-2, y:-18}, {x:2, y:-18}, 
            {x:-3, y:-17}, {x:3, y:-17},
            {x:-4, y:-16}, {x:4, y:-16},
        ];

        const data = {
            position :{x :position.x, y : position.y},
            radius:10,
            hp:1,
            movement:shotMovements[shotIdx],
            speed:1,
            imageUrl:''
        }
        super(data);
        
    }
    private count = 0;
    private dieCount = 0;
    public addDamage(point: number): void {
        if(this.damage==0) {
            this.damage += point;        
            setTimeout(()=> {                
                this.willRemove = true;
            },500);    
        }
    }

    override draw(ctx:CanvasRenderingContext2D) {
        this.process();                
        if(this.isDie()) {      
            this.speed = 0;

            const x = this.position.x;
            const y = this.position.y;

            let m = this.dieCount * 0.05;
            if(m > 10) {
                m = 10;
            }
            const rc = this.radius * Math.cos(this.dieCount) * m;
            const rs = this.radius * Math.sin(this.dieCount) * m;

            const x1 = x - rc;
            const y1 = y - rc;
            const x2 = x + rc;
            const y2 = y + rc;


            
            const drawArr = (arr:Array<{x:number,y:number}>,color:string) => {
                ctx.beginPath();
                ctx.strokeStyle = color;     
                ctx.fillStyle = color;
                const last = arr[arr.length-1];
                ctx.moveTo(last.x,last.y);
                arr.map(p => {
                    ctx.lineTo(p.x,p.y);
                })
                ctx.stroke();
                ctx.fill();
            }

            drawArr([{x:x1,y:y1},{x:x2,y:y2}],"orange");
            drawArr([{x:x2,y:y1},{x:x1,y:y2}],"orange");

            this.dieCount ++;
            return;
        }
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.moveTo(this.position.x, this.position.y);
        ctx.lineTo(this.position.x + this.movement.x, this.position.y + this.movement.y);
        ctx.stroke();

        if(this.count > 60) {
            this.addDamage(100);
            return;
        }
        this.count++;
    }
}
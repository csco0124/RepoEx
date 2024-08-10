// import { SGAME_TurtleRun_EnemyUnit } from './SGAME_TurtleRun_EnemyUnit';
import { SGAME_TurtleRun_Unit } from './SGAME_TurtleRun_Unit';
export class SGAME_TurtleRun_PlayerUnit extends SGAME_TurtleRun_Unit {

    targetX:number = this.position.x;
    constructor(startpos:{x:number, y:number}) {
        super(startpos.x, startpos.y, 30,30)
    }


    public draw(ctx: CanvasRenderingContext2D, mapPosition: { x: number; y: number; }): void {        
        if(this.targetX != this.position.x) {
            const a = this.targetX - this.position.x 
            let value = a / 5
            if(value > 3) {
                value = 3;
            }
            this.position.x += value;
            // this.vecx = value;
        }
        if(this.jumpPower > 1) {
            this.position.y -= this.jumpPower;
            this.jumpPower *= 0.9
        } else {
            this.jumpPower = 0;
        }

        this.mapPosition = mapPosition;
        const rect = this.getRect();
        ctx.beginPath();
        ctx.arc(rect.x + rect.width/2, rect.y + rect.height / 2, rect.width/2, 0, Math.PI*2);
        ctx.strokeStyle = "blue";
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.stroke();
        this.gravity.aply(this);

    }

    public moveLeft() {
        console.log("move left")
        this.targetX = this.position.x - 50;
    }
    
    public moveRight() {
        console.log("move right")
        this.targetX = this.position.x + 50;
    }

    jumpPower = 0;

    public jump() {
        this.gravity.aply(this);
        this.jumpPower = 10;            
    }

    public isIn(): boolean {
        return true;
    }

}
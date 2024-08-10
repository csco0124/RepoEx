import { calculateDistance, getMoveDirection } from "../SGAME_PointUtil";
import { SGAME_MoveableUnit } from "./SGAME_MoveableUnit";
import { SGAME_PlayerUnit } from "./SGAME_PlayerUnit";

export type SGAME_ItemType = "POINT"|"POWER"|"HP"|"RMS"|"COMBO";
export class SGAME_ItemUnit extends SGAME_MoveableUnit {

    public getPoint() {
        return this.hp;
    }

    target:SGAME_PlayerUnit;
    itemType:SGAME_ItemType;
    constructor(position:{x:number,y:number}, itemType:SGAME_ItemType, target:SGAME_PlayerUnit) {
        super({
            position: position,
            radius:10,
            hp:1,
            speed:Math.random()*2+1,
            imageUrl:'',
            movement:{x:0,y:1}
        })
        this.itemType = itemType;
        this.color = "#7733aa";
        if(itemType== "POINT") {
            this.color = "yellow";
        }
        this.target = target;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        // super.draw(ctx);
        this.process();
        ctx.beginPath();
        if(this.isDie()) {
            setTimeout(() => {
                this.willRemove = true;
            }, (250));
        }
        ctx.fillStyle = this.color;
        
        const h = this.radius * 0.4
        const x = this.position.x;
        const y = this.position.y;
        const x1 = x - this.radius;
        const x2 = x1 + h;
        const x4 = x + this.radius;
        const x3 = x4 - h;

        const y1 = y - this.radius;
        const y2 = y1 + h;
        const y4 = y + this.radius;
        const y3 = y4 - h
        switch (this.itemType) {
            case "POINT":
                ctx.moveTo(x, y);
                ctx.arc(x, y, this.radius * 0.5, 0, Math.PI*2,true)
                ctx.fillStyle = this.color;
                ctx.fill();
            break;

            case "POWER":
                //   .   .          y1
                //.  .   .  .       y2
                //.  .   .  .       y3
                //   .   .          y4
                //x1 x2 x3 x4
                ctx.beginPath();
                ctx.moveTo(x1,y2);
                ctx.lineTo(x2,y2);
                ctx.lineTo(x2,y1);
                ctx.lineTo(x3,y1);
                ctx.lineTo(x3,y2);
                ctx.lineTo(x4,y2);
                ctx.lineTo(x4,y3);
                ctx.lineTo(x3,y3);
                ctx.lineTo(x3,y4);
                ctx.lineTo(x2,y4);
                ctx.lineTo(x2,y3);
                ctx.lineTo(x1,y3);
                ctx.lineTo(x1,y2);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.strokeStyle = "black";
                ctx.stroke();
                break;
            default:
                
                ctx.fillText(this.itemType,this.position.x,this.position.y);

        }
        // if(this.itemType == "POINT") {
            
        // }
        // else {
        //     ctx.fillText(this.itemType, this.position.x - 10, this.position.y - 10);
        // }
        
        const newMove = getMoveDirection(this.getPosition(), this.target.getPosition());
        if(this.getIsFrameOut() && this.itemType != "POINT") {
            this.movement = newMove;
        }

        if(this.target.isDie() == false) {
            if (calculateDistance(this.getPosition(),this.target.getPosition()) < 100) {
                this.movement = newMove;
                this.speed = this.speed * 1.05;
                if(this.speed > 10) {
                    this.speed = 10;
                }
            }    
        }       
    }
    

}
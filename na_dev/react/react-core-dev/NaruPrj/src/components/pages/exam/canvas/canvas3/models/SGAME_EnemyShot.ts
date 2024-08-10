import { it } from "node:test";
import { SGAME_MoveableUnit } from "./SGAME_MoveableUnit";

interface EnemyShotData {
    position:{x:number,y:number};
    movement:{x:number,y:number};
    color:string;
    speed:number;    
    radius:number;
    type:ShotType;
}

export enum ShotType {
    normal,
    dividing,
    laser
}
export class SGAME_EnemyShot extends SGAME_MoveableUnit {
    callback:(shot:Array<SGAME_EnemyShot>)=>void;
    shotType:number;
    constructor(data:EnemyShotData, callback:(shot:Array<SGAME_EnemyShot>)=>void) {
        super({
            position:data.position,
            radius:data.radius,
            hp:1,
            speed:data.speed,
            movement:data.movement,
            imageUrl:''
        })
        this.color = data.color;
        this.callback = callback;
        this.shotType = data.type;
    }

    count = 0;    
    public draw(ctx: CanvasRenderingContext2D): void {
        this.count ++;                  
        if(this.getIsFrameOut()) {
            this.addDamage(100);
            this.willRemove = true;
        } 
        if(this.count > 1000) {
            this.addDamage(100);
        }    
        ctx.beginPath();

        if(this.isDie()) {
            this.deadCount ++;
            setTimeout(()=> {
                this.willRemove = true;
            },250)
                ctx.fillStyle = this.color;
                ctx.moveTo(this.position.x, this.position.y);
                ctx.beginPath();                
                ctx.arc(this.position.x,this.position.y,this.radius + this.deadCount,0,Math.PI*2,true);
                if(this.deadCount%3==0) {
                    ctx.fill();    
                } 
                if(this.deadCount%2==0) {
                    ctx.stroke();
                }
            return;
        }
        switch (this.shotType) {
            case ShotType.normal: //일반탄 그리기           
                ctx.beginPath();
                ctx.moveTo(this.position.x, this.position.y);
                ctx.arc(this.position.x,this.position.y,this.radius ,0,Math.PI*2,true);
                ctx.fillStyle = this.color;
                ctx.fill();    
                break;

            case ShotType.dividing: // 분열탄 그리기 
                ctx.moveTo(this.position.x, this.position.y);
                ctx.beginPath();
                ctx.arc(this.position.x,this.position.y,this.radius ,0,Math.PI*2,true);
                ctx.fillStyle = this.color;
                ctx.strokeStyle = this.color;
                ctx.stroke();    
                ctx.beginPath();
                ctx.arc(this.position.x,this.position.y,this.radius * 0.5,0,Math.PI*2,true);                
                ctx.fill(); 
                break;
                
            case ShotType.laser://레이저탄 그리기 
                ctx.fillStyle = "yellow";
                ctx.strokeStyle = this.color;
                const x1 = this.position.x - this.radius - this.movement.x
                const x2 = this.position.x + this.radius + this.movement.x
                const y1 = this.position.y - this.radius - this.movement.y
                const y2 = this.position.y + this.radius + this.movement.y
                ctx.globalCompositeOperation = "lighten";
                ctx.moveTo(x1,y1);
                ctx.lineTo(x1,y2);
                ctx.lineTo(x2,y2);
                ctx.lineTo(x2,y1);
                ctx.lineTo(x1,y1);
                ctx.stroke();
                ctx.fill();
                ctx.globalCompositeOperation = "source-over";
                break;

            default:
                break;

        }

        switch (this.shotType) {
            // 분열탄 동작 
            case ShotType.dividing:
                if(this.count%100 == 0 && this.getIsFrameOut() == false) {
                    this.damage = 100;
                    let arr = new Array<SGAME_EnemyShot>();
                    for(let i=0; i< 12; i++) {
                        const nshot = 
                        new SGAME_EnemyShot( {
                            position : this.getPosition(),
                            movement : {x: Math.sin(this.count + i), y:Math.cos(this.count + i)},
                            color : "orange",
                            speed : 2,
                            type : 0,
                            radius : 3
                        }, this.callback
                        )
                        arr.push(nshot);
                    }                    
                    this.callback(arr);
                }
                break;
            default:
                break;                

        }
    }
}


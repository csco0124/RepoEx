import { SGAME_PlayerShot } from "./SGAME_PlayerShot";
import { SGAME_Unit } from "./SGAME_Unit";
import { ShotType } from './SGAME_EnemyShot';
import { SGAME_PlayerLaser } from "./SGAME_PlayerLaser";
import { SGAME_MoveableUnit } from "./SGAME_MoveableUnit";

export type SGAME_PlayerShotType = "shot" | "laser";
export class SGAME_PlayerUnit extends SGAME_Unit {
    public power = 1;
    public addPower() {
        this.power ++;
        if(this.power > 5) {
            this.power = 5;
        }
    }
    private shotType:SGAME_PlayerShotType = "shot";

    public toggleShotType() {
        switch (this.shotType) {
            case "laser":    
                this.shotType = "shot";
                break;
        
            case "shot":
                this.shotType = "laser";
                break;
        }
    }

    private callback:(shot:Array<SGAME_MoveableUnit>)=>void;
    timer:NodeJS.Timer;
    constructor(callback:(shot:Array<SGAME_MoveableUnit>)=>void) {
        super({
            position:{x:140,y:400},
            radius:5,
            hp:100,
            speed:1,
            movement:{x:0,y:0},
            imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUiNRqrAJKbWIZ-1Nl8tygN61EqmpRuveYzQ&usqp=CAU'
        })
        this.color = "blue";
        this.viewRadius = 20;
        this.callback = callback;
        this.timer = setInterval(()=> {
            if(this.isDie()) {                
                return;                
            }
            const arr = new Array<SGAME_MoveableUnit>()
            switch(this.shotType) {
                case "shot":
                    for(let i= 0; i < (this.power * 2); i++) {
                        const shot = new SGAME_PlayerShot(this.getPosition(),i);
                        arr.push(shot);    
                    }
                    break;
                case "laser":
                    const shot = new SGAME_PlayerLaser(this.getPosition(),this.power);
                    arr.push(shot);
                    break;
                }
            callback(arr);
        },100);
    }

    public move(point:DOMPoint, rect:DOMRect) {        
        const newx = this.position.x + point.x;
        const newy = this.position.y + point.y;

        if(rect.width - this.radius > newx && newx > this.radius) {
            this.position.x = newx
        }
        if(rect.height - this.radius > newy && newy > this.radius) {
            this.position.y = newy
        }
    }

    public override draw(ctx: CanvasRenderingContext2D): void {
        ctx.font = "10px Arial";
        ctx.beginPath();
        if(this.isDie()) {
            ctx.fillStyle = "red";
            ctx.fillText("Game Over", this.position.x - 20, this.position.y + 30);
        } else {
            super.draw(ctx)        
            const x = this.position.x - this.viewRadius;
            const y = this.position.y + this.viewRadius + 5;
            const h = 2;            
            const w1 = this.viewRadius * 2;
            let p = (this.hp - this.damage) / this.hp 
            if(p <0) {
                p = 0
            }
            const w2 = w1 * p;
            ctx.fillStyle = "red";
            ctx.fillRect(x,y,w1,h);
            ctx.fillStyle = "green";
            ctx.fillRect(x,y,w2,h);
        }        

        if(this.talkMessage != null) {
            ctx.font = "15px Arial";
            ctx.fillStyle ="white";
            ctx.strokeStyle = "black";
            ctx.strokeRect(this.position.x - 10, this.position.y + 30,100,20);
            ctx.fillRect(this.position.x - 10, this.position.y + 30,100,20);
            
            ctx.fillStyle = "black";
            ctx.fillText(this.talkMessage, this.position.x, this.position.y + 45);
        }
    }

    private talkMessage:string|null = null;
    private talkRemoveTimer:NodeJS.Timer|null = null;
    talk(message:string, interval:number) {
        if(this.talkRemoveTimer != null) {
            clearTimeout(this.talkRemoveTimer);
        }
        this.talkMessage = message;
        this.talkRemoveTimer = setTimeout(()=> {
            this.talkMessage = null;
        },interval)
    }
}
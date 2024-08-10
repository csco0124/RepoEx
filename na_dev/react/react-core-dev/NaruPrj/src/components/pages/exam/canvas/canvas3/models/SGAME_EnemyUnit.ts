import { calculateDistance, getMoveDirection, getVectorFromAngle } from "../SGAME_PointUtil";
import { SGAME_EnemyShot, ShotType } from "./SGAME_EnemyShot";
import { SGAME_ItemType, SGAME_ItemUnit } from "./SGAME_ItemUnit";
import { SGAME_MoveableUnit } from "./SGAME_MoveableUnit";
import { SGAME_PlayerUnit } from "./SGAME_PlayerUnit";


export interface SGAME_EnemyData {
    x:number,
    speed:number, 
    type:number,
    hp:number,
    radius:number, 
    dropItems:SGAME_ItemType[],
    moveTarget:Array<{x:number,y:number}>
}
export class SGAME_EnemyUnit extends SGAME_MoveableUnit {    
    protected shotCallback:(enemyShot:SGAME_EnemyShot[])=>void;
    protected dropItemCallback:(item:SGAME_ItemUnit[])=>void;
    private timer:NodeJS.Timer|null = null;
    public shotType:number;
    private count = 0;
    private shotCount = 0;
    public target:SGAME_PlayerUnit|null;
        

    private moveTarget:Array<{x:number,y:number}> = [];
    
    private lazerTargetVector:{x:number,y:number}|null = null;
    
    constructor(data:SGAME_EnemyData, target:SGAME_PlayerUnit|null, shotCallback:(enemyShot:Array<SGAME_EnemyShot>)=>void, dropItemCallback:(item:Array<SGAME_ItemUnit>)=>void) {
        super({
            position:{x:data.x ,y:-data.radius},
            radius:data.radius,
            hp:data.hp,
            movement:{x:0,y:0.1},
            imageUrl:'',
            speed:data.speed,
        })
        this.moveTarget = data.moveTarget;
        this.target = target;
        this.shotType = data.type;
        this.shotCallback = shotCallback;
        this.dropItemCallback = dropItemCallback;
        this.timer = setInterval(()=> {
            if(this.timer != null) {
                if(this.isDie() || this.getIsFrameOut()) {
                    const items = data.dropItems.map(item=> {
                        return new SGAME_ItemUnit({x:this.position.x + Math.random()*50 - 25, y: this.position.y + Math.random()*50 - 25},item,this.target!)
                    })
                    dropItemCallback(items);
                    clearInterval(this.timer!);                
                    this.timer = null;
                    return;
                }    
            }
            if(this.position.y < 10) {
                return;
            }

            // 미사일 발사 페턴 
            switch(this.shotType) {
                case 0:
                if(this.count % 100 < 30) {
                    const a = new SGAME_EnemyShot({
                        position : {x: this.position.x, y: this.position.y}, 
                        movement : {x: Math.cos(this.count), y: Math.sin(this.count)},
                        color : "red",
                        speed : this.count%50*0.05+1,
                        type : ShotType.normal,
                        radius : 5,
                        },
                        shotCallback,
                        );
                    const b = new SGAME_EnemyShot( {
                        position : {x: this.position.x, y: this.position.y}, 
                        movement : {x: Math.sin(this.count), y: Math.cos(this.count) },
                        color : "blue",
                        speed : this.count%50*0.05+1,
                        type : ShotType.normal,
                        radius : 5
                        },shotCallback
                        );
                    shotCallback([a,b]);    
                }
                break;

                case 1:
                    const a = this.count%10
                    if(a == 0) {
                        const ranges = [
                            0,
                            20,
                            40,140,
                            60,120,
                            80,100,
                            100,80,
                        ];                        
                        const b = ranges[this.shotCount%ranges.length] + this.count%100;
                        this.shotCount ++;
                        const arr = [];
                        for(let i=0; i<35; i++) {
                            const shot = new SGAME_EnemyShot({
                                position: {x: this.position.x, y: this.position.y}, 
                                movement: getVectorFromAngle(b+i,1),
                                color: "orange",
                                speed: 2,
                                type: ShotType.normal,
                                radius: 5
                            },shotCallback)
                            arr.push(shot);
                        }
                        shotCallback(arr);    
                    }
                    break;

                case 2:
                    if(this.count % 200 < 150) {
                        const shot = new SGAME_EnemyShot({
                            position : {x: this.position.x, y: this.position.y}, 
                            movement : {x: Math.sin(this.count), y: Math.cos(this.count)},
                            color : "green",
                            speed : this.count%40*0.05+1,
                            type : ShotType.normal,
                            radius : 5 
                        }, shotCallback)
                        shotCallback([shot]);    
                    }
                    break;

                case 3:
                    if(this.target != null) {
                        const a = this.count % 100
                        const lazerLength = 20;
                        if(a <= lazerLength) {        
                            //레이저탄 발사
                            if(a == 0) {
                                const vec = getMoveDirection(this.getPosition(),this.target!.getPosition()); 
                                this.lazerTargetVector = vec;
                            }   
                            const shot = new SGAME_EnemyShot({
                                position: this.getPosition(),
                                movement: this.lazerTargetVector!,
                                color : "red",
                                speed: 5,
                                type : ShotType.laser,
                                radius: 5
                                },
                                shotCallback
                            );
                            shotCallback([shot]);
                            if(a == lazerLength) {
                                this.lazerTargetVector = null;
                            }
                        }
                        else if(a > 50 && a < 53) {                            
                            const a = new SGAME_EnemyShot( { 
                                position: this.getPosition(),
                                movement : {x:Math.sin(this.count), y:Math.atan(Math.tan(this.count))},
                                color : "#ff33aa",
                                speed : 1,
                                type : ShotType.dividing,
                                radius : 5
                                },
                                shotCallback
                            );
                            const b = new SGAME_EnemyShot( {
                                position : this.getPosition(),
                                movement : {x:Math.atan(Math.tan(this.count)), y:Math.cos(this.count)},
                                color : "#ffaa33",
                                speed : 1,
                                type : ShotType.dividing,
                                radius : 5
                                },
                                shotCallback
                            );
                            shotCallback([a,b])

                        }                        
                    }
                    
                    break

                    

                default:
                    break;
    
            }

            this.count ++;
        },1000/60);        
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        super.draw(ctx);
        ctx.beginPath();
        ctx.fillStyle = "black";
        if(this.isDie() == false) {
            const x = this.position.x - this.radius;
            const y = this.position.y - this.radius - 5;
            const h = 2;            
            const w1 = this.radius * 2;
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

        if(this.target != null) {
            let vec = getMoveDirection(this.getPosition(),this.target!.getPosition())
            if(this.lazerTargetVector != null) {
                vec = this.lazerTargetVector;
            }
            
            ctx.strokeStyle = "#000000";
            ctx.moveTo(this.position.x, this.position.y);
            ctx.lineTo(this.position.x + vec.x * this.radius * 1.5, this.position.y + vec.y * this.radius * 1.5);
            ctx.stroke();
        }
        
        if(this.moveTarget.length>0) {
            const target = this.moveTarget[0];
            const now = this.getPosition();
            this.movement = getMoveDirection(now,target);                        
            if(calculateDistance(now, target) < this.radius ) {
                this.moveTarget.splice(0,1);
            }
        }
    }

    public addDamage(point: number): void {
        super.addDamage(point);
        this.dropItemCallback([
            new SGAME_ItemUnit({x:this.position.x - Math.random()*10 + 5, y:this.position.y - Math.random()*10 + 5},"POINT",this.target!)
        ]);

    }

}
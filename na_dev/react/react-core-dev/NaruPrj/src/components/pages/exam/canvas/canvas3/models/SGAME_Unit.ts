import { calculateDistance } from "../SGAME_PointUtil";
import { SGAME_GameLogic } from "../helper/SGAME_GameLogic";

export interface SGAME_UnitInfo {
    position : { x:number, y:number};
    radius : number;
    hp : number;
    movement : { x:number, y:number};
    speed : number;
    imageUrl : string;
}
export class SGAME_Unit {
    protected color:string = '#ff0000';
    protected position : {x:number, y:number};
    readonly radius: number;
    protected viewRadius : number;
    protected hp:number;
    protected damage:number = 0;
    protected imgurl:string = ''
    protected img = new Image();
    public atteck = 1;
    

    protected drawCount = 0;
    public getPosition():{x:number,y:number} {
        return {x:this.position.x, y:this.position.y};
    }

    public getIsFrameOut():boolean {
        const rect = SGAME_GameLogic.screenRect;
        const x = this.position.x;
        const y = this.position.y;
        const r = this.radius;
        if(x < -r) {
            return true;
        }
        if(x > rect.width + r) {
            return true;
        }
        if(y < -r) {
            return true;
        }
        if(y > rect.height + r) {
            return true;
        }
        return false;
    }

    protected willRemove = false;
    public getWillRemove() {
        return this.willRemove;
    }

    constructor(data:SGAME_UnitInfo) {
        this.position = data.position;
        this.radius = data.radius;
        this.viewRadius = data.radius;
        this.hp = data.hp;
        this.imgurl = data.imageUrl;
    }

    
    protected process() {
        if(this.img.src == '' && this.imgurl != '') {
            this.img.src = this.imgurl;
        }
    }

    protected deadCount = 0
    public draw(ctx:CanvasRenderingContext2D) {
        if(this.isDie()) {    
            setTimeout(()=> {                
                this.willRemove = true;
            },500);
            ctx.beginPath();
            ctx.strokeStyle = "red";
            ctx.arc(this.position.x,this.position.y,this.deadCount,0,2 * Math.PI + this.radius);
            if(this.deadCount % 2 == 0 && this.willRemove == false) {
                ctx.fillStyle = this.color;
                ctx.fill();
            }
            ctx.stroke();
            this.deadCount++;
            return;   
        }

        this.process();
        ctx.globalCompositeOperation = "source-over";
        ctx.beginPath();
        ctx.moveTo(this.position.x, this.position.y);
        ctx.strokeStyle = this.color;
        ctx.arc(this.position.x,this.position.y,this.viewRadius,0,2 * Math.PI);
        
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.globalCompositeOperation = "source-atop";
        ctx.drawImage(this.img,this.position.x - this.viewRadius ,this.position.y - this.viewRadius,this.viewRadius*2,this.viewRadius*2);
        ctx.globalCompositeOperation = "lighten";
        if(this.radius != this.viewRadius) {
            ctx.beginPath();
            ctx.strokeStyle = "white";
            ctx.fillStyle = "#ffff00aa";
            ctx.arc(this.position.x,this.position.y,this.radius,0,2* Math.PI);
            ctx.stroke();    
            ctx.fill();
        }
        ctx.globalCompositeOperation = "source-over";
        this.drawCount ++;
    }

    public addDamage(point:number) {
        this.damage += point;        
    }

    public isDie():boolean {
        return this.damage > this.hp;
    }

    public healing(point:number) {
        this.willRemove = false;
        this.damage -= point;
        if(this.damage < 0) {
            this.damage = 0;
        }
    }

    // 충돌검사
    public crashTest(target:SGAME_Unit):boolean {        
        return this.crashTestWithPoint(target.position, target.radius);
    }
    
    // 충돌검사
    public crashTestWithPoint(point:{x:number,y:number},radius:number) {
        const dist = calculateDistance(this.position, point);
        const totalRadius = this.radius + radius;
        return dist < totalRadius;
    }
}

import { SGAME_TurtleRun_ContextUtil } from "../SGAME_TurtleRun_ContextUtil";
import { SGAME_TurtleRun_Screen } from "../instances/SGAME_TurtleRun_Screen";

export type SGAME_TurtleRun_LandItemType = "land" | "none";

export class SGAME_TurtleRun_LandItemModel {
    readonly type:SGAME_TurtleRun_LandItemType;
    readonly position:{x:number,y:number};    
    readonly blockSize:{width:number,height:number};

    constructor(type:SGAME_TurtleRun_LandItemType, position:{x:number,y:number}, blockSize:{width:number,height:number}) {
        this.type = type;
        this.position = position;
        this.blockSize = blockSize;
    }    

    private rect = new DOMRect();
    public draw(ctx:CanvasRenderingContext2D, position:{x:number,y:number}) {
        const rect = SGAME_TurtleRun_Screen.getInstance().rect;
        ctx.fillText(rect.height.toString(),50,50);
        const w = this.blockSize.width;
        const h = this.blockSize.height;
        const x = this.position.x * w + position.x;
        const y = rect.height - h - this.position.y * h + position.y;
        this.rect.x = x;
        this.rect.y = y;
        this.rect.width = w;
        this.rect.height = h;
        const points = [{x:x,y:y},{x:x+w,y:y},{x:x+w,y:y+h},{x:x,y:y+h}];
        
        switch(this.type) {
            case "land":
                ctx.beginPath();
                new SGAME_TurtleRun_ContextUtil(ctx).drawBox(new DOMRect(x,y,w,h),"black","yellow");
            case "none":
                break;
        }
        ctx.fillStyle = "black";
    }

    public getRect(padding:number):DOMRect {
        const p = padding;
        return new DOMRect(this.rect.x-p, this.rect.y-p, this.rect.width + p*2, this.rect.height + p*2);
    }

    public isIn(position:{x:number,y:number}):boolean {
        if(this.rect.x - position.x < -this.rect.width ) {
            return false;
        }
        if(this.rect.x + position.x > SGAME_TurtleRun_Screen.getInstance().rect.width + 100) {
            return false;
        }
        // if(this.rect.y + position.y > SGAME_TurtleRun_Screen.getInstance().rect.height + this.rect.height * 2) {
        //     return false;
        // }
        // if(this.rect.y + position.y < -this.rect.height) {
        //     return false;
        // }
        return true;
    }
}
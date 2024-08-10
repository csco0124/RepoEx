import '../Number+Extensions';
export type SGAME_BlockName = "block" | "point" | "none";
export interface SGAME_MapData {
    HP:number;
    position: {x:number, y:number};
    size: {width:number, height:number};
    name: SGAME_BlockName;
    color: string;
}
  
export class SGAME_MapItem {
    HP:number;
    damage = 0;
    position: {x:number, y:number};
    size: {width:number, height:number};
    name: SGAME_BlockName;
    color: string ;   

    screenRect:DOMRect = new DOMRect();
    blockSize:{width:number,height:number} = {width:0,height:0};
    mapposition:{x:number,y:number} = {x:0,y:0};

    public isDie():boolean {
        return this.damage > this.HP;
    }

    constructor(data:SGAME_MapData) {
        this.position = data.position;
        this.size = data.size;
        this.name = data.name;
        this.color = data.color;
        this.HP = data.HP;
    }

    public makeRect():DOMRect {
        const x = this.position.x * this.blockSize.width + this.mapposition.x - this.blockSize.width ; 
        const y = (this.screenRect.height - this.blockSize.height) - this.position.y * this.blockSize.width + this.mapposition.y;
        const w = this.size.width * this.blockSize.width;
        const h = this.size.height * this.blockSize.height;
        return new DOMRect(x,y,w,h);
    }

    private dieCount = 0;
    public draw(ctx:CanvasRenderingContext2D, mapposition:{x:number,y:number}, screenRect:DOMRect, blockSize: {width:number, height:number}) {
        this.screenRect = screenRect;
        this.blockSize = blockSize;
        this.mapposition = mapposition;
        if(this.isFrameOut()) {
            return;
        }

        var r = this.makeRect();    
        if(this.isDie()) {
            if(this.dieCount < 255) {
                ctx.beginPath();
                let  alpha = 255 - this.dieCount;
                if(alpha < 0) {
                    alpha = 0;
                }
                const s = -(this.dieCount * 0.05);
                ctx.fillStyle = "#ff0000"+alpha.toHex();
                ctx.fillRect(r.x - s, r.y - s, r.width + s * 2, r.height + s * 2);
            }
            this.dieCount+=10;
            return;
        }
        

        ctx.beginPath();
        ctx.fillStyle = this.color;
        
        ctx.strokeStyle = "black";
        ctx.fillRect(r.x,r.y,r.width,r.height);
        ctx.strokeRect(r.x,r.y,r.width,r.height);

        let hp = this.HP - this.damage
        if(hp < 0) {
            hp = 0
        }
        let hpr= Math.floor((hp / this.HP ) * 100)
        ctx.fillStyle ="red";
        const hpw = r.width / 100;
        ctx.fillRect(r.x,r.y, hpw * hpr , 5);
    }

    public isFrameOut():boolean{
        if(this.blockSize.width == 0 || this.blockSize.height == 0) {
            return true;
        }
        const rect = this.makeRect()
        if(rect.x + rect.width < 0) {
            return true;
        }
        if(rect.y + rect.height < 0) {
            return true;
        }
        if(rect.y > this.screenRect.height) {
            return true;
        }
        if(rect.x > this.screenRect.width) {
            return true;
        }
        return false;
    }

    public addDamage(damage:number):boolean {
        this.damage += damage;
        return this.HP < damage;
    }
}
import { SGAME_Unit, SGAME_UnitInfo } from "./SGAME_Unit";

export class SGAME_MoveableUnit extends SGAME_Unit {
    protected movement : {x:number, y:number};
    protected speed : number;
    
    constructor(data:SGAME_UnitInfo) {
        super(data)
        this.movement = data.movement;
        this.color = "#9955ff";
        this.speed = 1;
        this.hp = data.hp;
        if(data.speed > 0) {
            this.speed = data.speed;
        }
        this.position = data.position;
        this.imgurl = data.imageUrl;
    }

    override process() {
        super.process();
        this.position.x += (this.movement.x * this.speed);
        this.position.y += (this.movement.y * this.speed);
    }

    
}
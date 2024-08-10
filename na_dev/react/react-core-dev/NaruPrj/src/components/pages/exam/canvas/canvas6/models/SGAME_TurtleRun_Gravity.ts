import { SGAME_TurtleRun_Unit } from "./SGAME_TurtleRun_Unit";
export type GravityStatus = "stop"|"run";
export class SGAME_TurtleRun_Gravity {
    readonly acceleration:number;
    constructor(acceleration:number) {
        this.acceleration = acceleration;
    }    
    private time:number = 0;
    private speed:number = 1;
    private status:GravityStatus = "run";
    public getStatus():GravityStatus {
        return this.status;
    }
    public aply(target:SGAME_TurtleRun_Unit) {
        const down = this.speed * this.acceleration * this.time; 
        this.time += 0.01;
        target.position.y += this.status == "run" ? down : -down;
    }

    public stop() {
        if(this.status == "run") {
            this.status = "stop";            
        }                     
    }

    public start() {
        if(this.status == "stop") {
            this.time = 0;
            this.status = "run"
        }
    }
}
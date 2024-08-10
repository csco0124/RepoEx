import SGAME_TurtleRun from "../SGAME_TurtleRun";
import { SGAME_TurtleRun_LandItemModel } from "./SGAME_TurtleRun_LandItemModel";
import { SGAME_TurtleRun_CrashTest_Type, SGAME_TurtleRun_Unit } from "./SGAME_TurtleRun_Unit";
import { left } from '@popperjs/core';


export type SGAME_TurtleRun_EnemyType = "red"|"blue"
export class SGAME_TurtleRun_EnemyUnit extends SGAME_TurtleRun_Unit {
    public vecx:number
    constructor(x:number,y:number,type:SGAME_TurtleRun_EnemyType, vecx:number) {
        function getSize():{width:number,height:number} {
            switch (type) {
                case "red":
                    return {width:10,height:20};
                case "blue":
                    return {width:10,height:10};
            }    
        }
        const s = getSize();
        super(x,y,s.width, s.height);
        this.vecx = vecx;
    }

    public draw(ctx: CanvasRenderingContext2D, mapPosition: { x: number; y: number; }): void {    
        super.draw(ctx,mapPosition);
        ctx.font = "10px Arial"
        ctx.fillStyle = "red";
        const r = this.getRect()
        ctx.fillText(this.landingTestResult, r.x + 3, r.y + 10);
    }

    
    public process(mapPosition: { x: number; y: number; }): void {
        super.process(mapPosition);
        this.gravity.aply(this);        
    }
    
    public landingTest(inLand: SGAME_TurtleRun_LandItemModel[]): string[] {
        const test = super.landingTest(inLand);

        switch (this.landingTestResult) {
            case "T": case "TRL": case "TR,TL": case "TL": case "TR":
                this.gravity.stop();
                break
            case "L": case "R": case "BL":  case "BR":  case "TL,BL": case "TR,BR": case "TR,TL,BL": case "TR,TL,BR": 
                // this.gravity.start();
                this.vecx *= -1;
                break;
            
                // this.gravity.stop();
                // this.vecx *= -1;
                break;
            default:
                break;
        }
        this.position.x += this.vecx;         
        return test;
    }

    getCrashTestRect(): DOMRect {
        const rect = this.getRect();
        rect.x += this.vecx;
        return rect;
    }

    public otherUnitCrashTest(units: SGAME_TurtleRun_Unit[]): void {
        units.filter(u=> u != this).map(unit => {
            const u:SGAME_TurtleRun_EnemyUnit|null = unit as SGAME_TurtleRun_EnemyUnit
            let test = this.crashTestWithRect(unit.getRect());
            switch(test) {
                case "B": case "BL": case "BR":
                    unit.gravity.stop();
                default:
                    break;
            }
        }
    )
    }
}
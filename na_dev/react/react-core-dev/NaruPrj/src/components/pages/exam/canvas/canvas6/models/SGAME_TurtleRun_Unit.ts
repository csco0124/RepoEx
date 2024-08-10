import { SGAME_TurtleRun_ContextUtil } from "../SGAME_TurtleRun_ContextUtil";
import { SGAME_TurtleRun_Screen } from "../instances/SGAME_TurtleRun_Screen";
import { SGAME_TurtleRun_EnemyUnit } from "./SGAME_TurtleRun_EnemyUnit";
import { SGAME_TurtleRun_Gravity } from "./SGAME_TurtleRun_Gravity";
import { SGAME_TurtleRun_LandItemModel } from "./SGAME_TurtleRun_LandItemModel";

export type SGAME_TurtleRun_CrashTest_Type = "left"|"right"|"bottom"|"top"|false;

export class SGAME_TurtleRun_Unit {
    position:{x:number,y:number};
    size:{width:number,height:number};
    mapPosition= {x:0,y:0}

    getRect():DOMRect {
        return new DOMRect(
            this.position.x + this.mapPosition.x,
            this.position.y + this.mapPosition.y,
            this.size.width, 
            this.size.height);
    }

    getCrashTestRect():DOMRect {
        return this.getRect();
    }

    gravity = new SGAME_TurtleRun_Gravity(100);
    constructor(x:number,y:number,w:number,h:number) {
        this.position = {x:x,y:y};
        this.size = {width:w,height:h};        
    }

    protected HP = 10;
    public getHp():number {
        return this.HP;
    }
    protected damage = 0;

    protected atteck = 1;
    public getAtteck():number {
        return this.atteck;
    }

    protected dieCount = 0;
    public draw(ctx:CanvasRenderingContext2D, mapPosition:{x:number,y:number}) {
        this.process(mapPosition);
        this.mapPosition = mapPosition;
        const util = new SGAME_TurtleRun_ContextUtil(ctx);

        if(this.isDie()) {
            if(this.dieCount < this.size.width) {
                const c = this.dieCount;
                util.drawBox(new DOMRect(this.position.x+c, this.position.y + c, this.size.width - c * 2, this.size.height - c*2),"red")
                this.dieCount +=1;
            }
            return;
        }
        let fillColor = "gray";
        if(this.damageCount > 0) {
            fillColor = "red";
            this.damageCount --;
        }
        
        util.drawBox(this.getRect(),"blue",fillColor); 
    }

    public process(mapPosition:{x:number,y:number}) {
        const x = this.position.x + mapPosition.x;
        const y = this.position.y + mapPosition.y;
        const x2 = x + this.size.width;
        const y2 = y + this.size.height;
        this.gravity.aply(this);       
    }

    public crashTestWithRect(targetRect:DOMRect):string {
        function checkCollision(rect1: DOMRect, rect2: DOMRect): boolean {
            return (
              rect1.left < rect2.right &&
              rect1.right > rect2.left &&
              rect1.top < rect2.bottom &&
              rect1.bottom > rect2.top
            );
          }

        function calculateCollisionDirections(rect1: DOMRect, rect2: DOMRect): string {          
            let result = ""

            if (rect1.bottom >= rect2.top && rect1.top <= rect2.top) {
                result += "T"
            }
          
            if (rect1.top <= rect2.bottom && rect1.bottom >= rect2.bottom) {
                result += "B"
            }

            if (rect1.right >= rect2.left && rect1.left <= rect2.left) {
                result += "L"
            }
              
            if (rect1.left <= rect2.right && rect1.right >= rect2.right) {
                result += "R"
            }
            return result
        }

        const r = this.getCrashTestRect();
        
        const test = checkCollision(r, targetRect);
        if(test == false) {
            return "";
        }        
        return calculateCollisionDirections(r,targetRect);
    }

    public isIn():boolean {
        if(this.position.x < -this.size.width - this.mapPosition.x) {
            return false;
        }
        // if(this.position.x > SGAME_TurtleRun_Screen.getInstance().rect.width) {
        //     return false;
        // }
        // if(this.position.y > SGAME_TurtleRun_Screen.getInstance().rect.height + this.mapPosition.y + 50) {
        //     return false;
        // }
        if(this.position.y < -this.size.height) {
            return false;
        }
        return true;
    }

    protected damageCount = 0;
    public addDamage(damage:number) {
        if(damage <= 0) {
            return;
        }
        this.damage += damage;
        this.damageCount = 10;
    }

    public isDie():boolean {
        return this.damage > this.HP;
    }
    public isNeedRemove():boolean {
        return this.dieCount >= this.size.width;
    }

    protected landingTestResult = "";
    public landingTest(inLand:Array<SGAME_TurtleRun_LandItemModel>) : Array<string> {
        let arr:Array<string> = [];
        inLand.map(item => {
            const crashTest = this.crashTestWithRect(item.getRect(1));
            if(arr.filter(str=>crashTest == str).length == 0) {
                arr.push(crashTest);
            }
        })

        let log = "";
        arr.map(t=> {
            if(t != "") {
                if(log != "") log += ","
                log+= t
            }
        })

        this.gravity.start();
        switch (log) {
            case "T": case "TRL": case "TR,TL": case "TL": case "TR":
                this.gravity.stop();
                break
            case "L": case "R": case "BL":  case "BR":  case "TL,BL": case "TR,BR": case "TR,TL,BL": case "TR,TL,BR": 
                break;            
            default:
                break;
        }

        this.landingTestResult = log;
        return arr;
    }

    public otherUnitCrashTest(units:Array<SGAME_TurtleRun_Unit>) {
        units.filter(u=> u != this).map(unit => {
                let test = this.crashTestWithRect(unit.getRect());
                switch(test) {
                    case "B": case "L": case "R":
                        break;
                    case "T":
                        break;
                    default:
                        unit.gravity.stop();
                        break;
                }
            }
        )
    }
}
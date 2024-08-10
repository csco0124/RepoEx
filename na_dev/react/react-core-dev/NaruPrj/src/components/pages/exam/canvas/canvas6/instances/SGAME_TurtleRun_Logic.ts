import { random } from "lodash";
import { SGAME_Keyboard } from "../../canvas4/instance/SGAME_Keyboard";
import { SGAME_TurtleRun_LandModel } from "../models/SGAME_TurtleRun_LandModel";
import { SGAME_TurtleRun_Unit } from "../models/SGAME_TurtleRun_Unit";
import { SGAME_TurtleRun_Screen } from "./SGAME_TurtleRun_Screen";
import { SGAME_TurtleRun_EnemyUnit } from "../models/SGAME_TurtleRun_EnemyUnit";
import { SGAME_TurtleRun_PlayerUnit } from "../models/SGAME_TurtleRun_PlayerUnit";

export class SGAME_TurtleRun_Logic {    
    readonly canvasId:string;
    readonly fps:number;
    private timer:NodeJS.Timer|null = null;

    private units:Array<SGAME_TurtleRun_Unit> = [];

    constructor(canvasId:string, fps:number) {
        this.canvasId = canvasId;
        this.fps = fps;        

        this.initLand(0);        
        this.addKeyboard();
    }

    private land = SGAME_TurtleRun_LandModel.makeLand(0)

    private player:SGAME_TurtleRun_PlayerUnit|null = null;

    initLand(stage:number) {
        if(this.getRect().height == 0 || this.land.items.length == 0) {
            setTimeout(()=> {
                this.initLand(stage);
            },1000)
            return;
        }        
        this.units = [];
        this.land = SGAME_TurtleRun_LandModel.makeLand(stage)
        const player  = new SGAME_TurtleRun_PlayerUnit(this.land.startPos);
        player.gravity.start();
        this.player = player; 
        this.clearTimeInterval();
        this.timer = setInterval(()=> {
            this.draw();
        },1000 / this.fps);
    }

    public clearTimeInterval() {
        if(this.timer!=null) {
            clearInterval(this.timer);
            console.log("claer interval");    
        }
    }

    private keyboard:SGAME_Keyboard|null = null;
    private addKeyboard() {
        if(this.keyboard != null) {
            this.keyboard.removeEventListener();
        }
        this.keyboard = new SGAME_Keyboard(key => {
            console.log("keyboard pressed "+key);
            switch(key) {
                case 'test':
                    this.insertUnit();
                case 'left':
                    this.player?.moveLeft();
                    break;
                case 'right':
                    this.player?.moveRight();
                    break;
                case 'jump':
                    this.player?.jump();
                    break;
                default:
                    break;
            }

        },"turtlerun");
    }

    protected getRect():DOMRect {
        const canvas = document.getElementById(this.canvasId) as HTMLCanvasElement;
        if(canvas != null) {
            const rect = canvas.getBoundingClientRect();
            SGAME_TurtleRun_Screen.getInstance().rect = rect;
            return rect;
        }
        return new DOMRect();
    }

    protected getCtx():CanvasRenderingContext2D|null {
        const canvas = document.getElementById(this.canvasId) as HTMLCanvasElement;
        if(canvas == null) {
            return null;
        }
        return canvas.getContext('2d');
    }

    private timeline:number = 0;
    draw() {
        const ctx = this.getCtx();
        if(ctx == null) {
            return;
        }        
        const rect = this.getRect();
        if(rect.width==0) {
            return;
        }
        const inUnits = this.units.filter(unit=> unit.isIn());
        const inLand = this.land.items.filter(land=> land.isIn(land.position));

        ctx.clearRect(0,0,rect.width,rect.height);
        this.timeline ++;
        // this.land.position.x -= 0.1;
        this.land.draw(ctx);
        ctx.fillText("unitCount : " + this.units.length,20,20);
        ctx.fillText("landItems : " + this.land.items.length + " : " + inLand.length, 20,30);
        ctx.fillText("landpos : " + this.land.position.x + ":" + this.land.position.y, 20,40);


        // 모든 유닛 그리기, 중력 적용,
    
        inUnits.map(unit=> {
            if(unit.gravity.getStatus() == "stop") {
                unit.gravity.start();
            }
            unit.landingTest(inLand);
            unit.otherUnitCrashTest(inUnits);
            unit.draw(ctx,this.land.position);                    
        })                
        
        this.units.filter(unit=> unit.isIn() == false || unit.isNeedRemove() == true).map(unit => {
            const idx = this.units.indexOf(unit);
            this.units.splice(idx,1);
        })

        if(this.player!= null) {
            if(this.player.gravity.getStatus() == "stop") {
                this.player.gravity.start();
            }
            this.player.landingTest(inLand);
            this.player.otherUnitCrashTest(inUnits);
            this.player.draw(ctx, this.land.position);
        }

        const ix = this.timeline%400+20;
        ctx.fillStyle = "orange";
        ctx.fillRect(ix,5,10,10);
        this.land.position.x-= 0.1;
        
    }

    public insertUnit() {
        const x = this.timeline%400+20 - this.land.position.x;//random(10,150);
        console.log("x : "+x);
        this.units.push(new SGAME_TurtleRun_EnemyUnit(x,10,"blue",1))
    }
}
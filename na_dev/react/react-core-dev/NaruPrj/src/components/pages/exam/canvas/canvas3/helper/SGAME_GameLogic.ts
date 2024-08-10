import { addCommas } from "../SGAME_PointUtil";
import { SGAME_EnemyShot } from "../models/SGAME_EnemyShot";
import { SGAME_EnemyUnit } from "../models/SGAME_EnemyUnit";
import { SGAME_ItemType, SGAME_ItemUnit } from '../models/SGAME_ItemUnit';
import { SGAME_MAP } from "../models/SGAME_Map";
import { SGAME_MoveableUnit } from "../models/SGAME_MoveableUnit";
import { SGAME_PlayerShot } from "../models/SGAME_PlayerShot";
import { SGAME_PlayerUnit } from "../models/SGAME_PlayerUnit";
import { SGAME_CanvasPointerHelper } from "./SGAME_CanvasPointerHelper";
import { SGAME_TimeTable } from "./SGAME_TimeTable";

export class SGAME_GameLogic {   
    static screenRect:DOMRect = new DOMRect(0,0,0,0);
    
    canvasId:string;
    map:SGAME_MAP|null = null; 

    constructor(canvasId:string) {
        this.canvasId = canvasId
        this.makeMap(0);
    }

    point:number = 0;
    combo:number = 0;
    fps:number = 60;
    timer:NodeJS.Timer|null = null;

    
    player = new SGAME_PlayerUnit((playerShots)=> {
        playerShots.map(shot=> {
            this.playerShots.push(shot);
        })        
    });    
    pointer:SGAME_CanvasPointerHelper|null = null;

    timeline:number = 0;

    playerShots = new Array<SGAME_MoveableUnit>();
    

    enemyUnits = new Array<SGAME_MoveableUnit>();
    enemyShots = new Array<SGAME_EnemyShot>();

    items = new Array<SGAME_ItemUnit>();

    private getCanvas():HTMLCanvasElement|null {
        const canvas = document.getElementById(this.canvasId) as HTMLCanvasElement;
        if(canvas!= null) {
            SGAME_GameLogic.screenRect = canvas.getBoundingClientRect();
        }
        return canvas
    }

    private getCtx() {
        const canvas = this.getCanvas();
        if(canvas != null) {
            return canvas.getContext('2d');
        }
        return null;
    }
    private getRect():DOMRect {
        const canvas = this.getCanvas();
        if(canvas != null) {
            return canvas.getBoundingClientRect()
        }
        return new DOMRect(0,0,0,0);
    }

    public setFps(fps:number) {
        this.fps = fps
        this.setTimmer();
    }

    private setTimmer() {
        const canvas = this.getCanvas()
        if(canvas == null) {
            return;
        }
        this.pointer = new SGAME_CanvasPointerHelper(this.canvasId, 
        point => {
            const p = this.player.getPosition();
            const p2 = {x:p.x + point.x, y:p.y + point.y};
            if(this.map == null) {
                return;
            }
            
            if(this.map.crashTestWithPoint(p2,this.player.radius) != null) {
                this.player.move(new DOMPoint(-point.x,-point.y),canvas!.getBoundingClientRect())   
            } else {
                this.player.move(point, canvas!.getBoundingClientRect());                
            }
            if(point.x != 0) {
                this.map.position.x -= point.x / 10
            }

        }, 
        clickPoint => {
            if(this.player.crashTestWithPoint(clickPoint,20)) {
                console.log("player click!");
                this.player.toggleShotType();
            }

        })              

        this.clearTimer();
        this.timer = setInterval(()=>{
            this.draw()
            this.timeline++;
        },1000 / this.fps)
    }

    lastTime = Date.now();
    interval = 0;
    
    private draw() {    
        const canvas = this.getCanvas()  
        if(canvas == null) {
            return;
        }  
        const ctx = this.getCtx();
        const rect = canvas.getBoundingClientRect();
        if(ctx == null || this.map == null) {
            return 
        }

        if(this.map.crashTest(this.player!) != null) {
            this.player.move(new DOMPoint(0,0.1),rect);
        }
        
        ctx.clearRect(0,0,rect.width,rect.height);
        this.map.draw(ctx);
        this.map.position.y += 0.1;
        const now = Date.now();
        if(this.lastTime!= null) {            
            this.interval = now - this.lastTime;
        }
        this.lastTime = now;

              
        ctx.font="10px serif";
        // 적기와 아군 총알 충돌 테스트 
        this.enemyUnits.map(enemy=> {
            enemy.draw(ctx);
            if(enemy.getIsFrameOut() || enemy.getWillRemove()) {
                const idx = this.enemyUnits.indexOf(enemy);
                this.enemyUnits.splice(idx,1);
            }   
            this.playerShots.map(shot => {
                if(shot.isDie() == false && enemy.isDie() == false){
                    if (enemy.crashTest(shot)) {
                        enemy.addDamage(shot.atteck);
                        shot.addDamage(100);
                        if(enemy.isDie()) {
                            this.combo += 1;
                        }
                    }    
                }
            })         
        })

        // 플레이어샷과 맵 지형 충돌 테스트
        this.playerShots.map(shot => {
            const test = this.map?.crashTest(shot);            
            if(test == null) {
                return
            }
            switch (test.name) {
                case "point":
                    if(this.timeline%100 == 0) {
                        this.addItemWithPoint("POINT",shot.getPosition());
                    }
                case "block":
                    shot.addDamage(100);
                    test.addDamage(shot.atteck);
                    break;                
                default:
                    break;
            }

        })

        this.items.map(item=> {
            item.draw(ctx);
            if(item.crashTest(this.player)) {
                if(item.isDie() == false) {
                    switch(item.itemType) {
                        case "POWER":
                            this.player.addPower();
                            break;
                        case "HP":
                            this.player.healing(100);
                            break
                        case "POINT":
                            this.point += item.getPoint() * (this.combo + 1);
                            break;
                        case "COMBO":
                            this.combo += item.getPoint();
                            break;
                        case "RMS":
                            this.removeAllEnemyShot();
                            break;
                        default:
                            break;
                    }                    
                }
                item.addDamage(100);
            }
            if(item.getWillRemove() == true ) {
                const idx = this.items.indexOf(item);
                this.items.splice(idx,1);
            }
        })
        

        this.playerShots.map(shot=> {
            shot.draw(ctx);
            if(shot.getIsFrameOut() || shot.getWillRemove()) {
                const idx = this.playerShots.indexOf(shot);
                this.playerShots.splice(idx,1);
            }      
        })
        while(this.playerShots.length > 50) {
            this.playerShots.splice(0,1);
        }

        // 플ㅔ이어 그기 
        this.player.draw(ctx);        

        // 적 미일 충돌 테스트
        this.enemyShots.map(shot => {
            if(shot.getIsFrameOut()) {
                const idx = this.enemyShots.indexOf(shot);
                this.enemyShots.splice(idx,1);
                return;                
            }
            if(shot.getWillRemove()) {
                const idx = this.enemyShots.indexOf(shot);
                this.enemyShots.splice(idx,1);
                return;                
            }
            shot.draw(ctx);
            shot.process();
            if(this.player.isDie() == false) {
                if(shot.crashTest(this.player)) {
                    this.combo = 0;
                    this.player.addDamage(shot.atteck);
                    shot.addDamage(100);
                }    
            }
            // const mapitem = this.map?.crashTest(shot)
            // if (mapitem != null) {
            //     shot.addDamage(100);
            //     mapitem.addDamage(shot.atteck);
            // }
        })

        ctx.fillStyle = "#336699";
        ctx.font = "12px Arial"
        const testTxt = (Math.floor(this.timeline / this.fps)).toString() + " sec " + this.fps + " fps("+this.interval+")";
        ctx.fillText(testTxt.toString(),0,10);

        //debug print 
        ctx.globalCompositeOperation = "multiply"
        ctx.fillStyle = "#33669999";
        ctx.fillRect(5,35,100,50);
        ctx.globalCompositeOperation = "source-over"
        ctx.fillStyle = "#ffffff";
        ctx.fillText("enemyShots : " + this.enemyShots.length, 10, 50);
        ctx.fillText("enemys : " + this.enemyUnits.length, 10, 60);
        ctx.fillText("playerShots : " + this.playerShots.length, 10, 70);
        ctx.fillText("items : " + this.items.length, 10, 80);

        //Point
        ctx.fillStyle="black";
        ctx.font="20px serif";
        ctx.fillText(addCommas(this.point) + " combo : " + addCommas(this.combo),0,30);
    }

    public clearTimer() {
        if(this.timer == null) {
            return;
        }
        this.timeline = 0;
        clearInterval(this.timer);
        this.timer = null;    
    }
    

    // 적기 생성
    public makeEnemy(type:number) {
        const enemy = new SGAME_EnemyUnit({
            x:Math.random()*250 + 50,
            type:type,
            speed:4,
            hp:150,
            radius:20,
            dropItems:[],
            moveTarget:[]
        }, this.player, 
        enemyShots => {
            enemyShots.map(shot=> {
                this.enemyShots.push(shot);
            })
        },
        dropItems => {
            dropItems.map(item => {
                this.items.push(item);
            })
        });
        enemy.target = this.player;
        enemy.shotType = type;
        this.enemyUnits.push(enemy);        
    }


    public healing() {
        this.player?.healing(100);        
    }

    public addItemWithPoint(itemType:SGAME_ItemType,point:{x:number,y:number}) {
        const item = new SGAME_ItemUnit(point,itemType, this.player);
        this.items.push(item);        
    }

    public addItem(itemType:SGAME_ItemType) {
        const point = {x:Math.random()*200+50, y:0};
        this.addItemWithPoint(itemType,point);
    }


    public makeTimeTable(type:number) {
        const time = new SGAME_TimeTable(type ,this.player,enemys=> {
            enemys.map(enemy=> {
                this.enemyUnits.push(enemy);
            })
            
        }, shots => {
            shots.map(shot=> {
                this.enemyShots.push(shot);
            })
        }, items => {
            items.map(item => {
                this.items.push(item);
            })
        }
        )
    }

    public removeAllEnemyShot() {
        this.enemyShots.map(shot=> {
            shot.addDamage(100);
        })
    }
    public mapPositionReset() {
        if(this.map != null) {
            this.map.position.y = 0;
        }
    }

    public makeMap(stage:number) {
        const rect = this.getRect();
        if(rect.width == 0) {
            setTimeout(()=> {
                this.makeMap(stage);
            },500)            
            return;
        }
        this.map = SGAME_MAP.makeMap(stage,rect);
    }
}
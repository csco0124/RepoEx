import { SGAME_Tetris_block } from "../models/SGAME_Tetris_block";
import { SGAME_Tetris_board } from "../models/SGAME_Tetris_board";
import { SGAME_Keyboard } from "./SGAME_Keyboard";
import { random } from "lodash";
import { SGAME_TetrisBlockShuffler } from "./SGAME_TetrisBlockShuffler";
interface GamePoint {
    totalPoint: number;
    point: number;
    combo : number;
    maxCombo : number;
    level : number;
}
export class SGAME_Tetris {
    static instance:SGAME_Tetris|null = null;
    static getInstance(rootCanvasId:string, nextBlockCanvasId:Array<string>, keepBlockCanvasId:string, fps:number, col:number, row:number):SGAME_Tetris {
        if(this.instance == null) {
            this.instance = new SGAME_Tetris(rootCanvasId,nextBlockCanvasId,keepBlockCanvasId,fps,col,row);
        }
        return this.instance;
    }
    
    pointCallback:(point:GamePoint)=>void = (point )=> {}

    public setPointCallback(callback:(point:GamePoint)=>void) {
        this.pointCallback = callback;
    }

    pause = false;
    point:number = 0;
    combo:number = 0;
    maxcombo:number = 0;
    rootCanvasid:string;
    nextBlockCanvasIds:Array<string>;
    keepBlockCanvasId:string;
    fps:number;

    gameOver = false;
    board:SGAME_Tetris_board;

    block:SGAME_Tetris_block|null = null;
    keepBlock:SGAME_Tetris_block|null = null;

    nextBlock:Array<SGAME_Tetris_block> = [];
    movement:{x:number,y:number,r:number} = {
        x:0,
        y:0,
        r:0
    }

    private isInNextMove():boolean {
        return this.movement.x != 0 || this.movement.y != 0 || this.movement.r != 0
    }

    private clearNextMove() {
        this.moveCount = 0;
        this.movement = {
            x:0, y:0, r:0
        }
    }
    
    keyboard = new SGAME_Keyboard(key=> {
        if(this.gameOver) {
            return;
        }
        console.log("keyboard event : "+key);
        switch (key) {
            case 'ml':
                this.moveLeft();
                break;
            case 'mr':
                this.moveRight();
                break;
            case 'md':
                this.moveDown();
                break;
            case 'rl':
                this.rotateCounterClockwise();
                break;
            case 'rr':
                this.rotateClockwise();
                break;
            case 'keep':
                this.keep();
                break;
            case 'drop':
                this.blockQuickDrop();
                break;
            case 'down':
                this.moveDown();
                break;
            case 'pause':
                this.togglePause();
                break;
            default:
                break;
        }

    },"tetris");

    constructor(rootCanvasId:string, nextBlockCanvasId:Array<string>, keepBlockCanvasId:string, fps:number, col:number, row:number){
        this.rootCanvasid = rootCanvasId;
        this.nextBlockCanvasIds = nextBlockCanvasId;
        this.keepBlockCanvasId = keepBlockCanvasId;
        this.fps = fps;

        this.board = new SGAME_Tetris_board(col,row,removeLines=> {
            if(this.gameOver) {
                return;
            }
            console.log("clear lines : "+ removeLines);
            if(removeLines > 0) {
                this.combo +=1;
                if(this.maxcombo < this.combo) {
                    this.maxcombo = this.combo;
                }
            } else {
                this.combo = 0;
            }
            const defaultPoint = 10;
            const newPoint = defaultPoint + defaultPoint * removeLines * (this.combo + 1) * this.level;
            this.point += (newPoint + defaultPoint);
            const levelupPoint = 100;
            if (this.point > levelupPoint * (this.level+1)) {
                this.level ++;
            }
    
            if(newPoint > 0) {
                this.pointCallback({totalPoint:this.point, point:newPoint, combo: this.combo, level:this.level, maxCombo:this.maxcombo})
            }      
        },()=> {
            // gameOver
            this.gameOver = true;
        });
    }

    protected getRootCanvas():HTMLCanvasElement|null {
        const canvas:HTMLCanvasElement|null = document.getElementById(this.rootCanvasid) as HTMLCanvasElement;
        return canvas;
    }

    protected getRootContext():CanvasRenderingContext2D|null {  
        const ctx = this.getRootCanvas()?.getContext('2d');
        if(ctx != null) {
            return ctx!;
        }
        return null;
    }

    protected getRootRect() {
        const rect = this.getRootCanvas()?.getBoundingClientRect();
        if(rect!=null) {
            this.board.setBoardRect(rect);
            return rect;
        }
        return new DOMRect();
    }

    protected getNextBlockCanvas(num:number):HTMLCanvasElement|null {
        const id = this.nextBlockCanvasIds[num];
        const canvas:HTMLCanvasElement|null = document.getElementById(id) as HTMLCanvasElement;
        return canvas;
    }

    protected getNextBlockContext(num:number):CanvasRenderingContext2D|null {
        const ctx  = this.getNextBlockCanvas(num)?.getContext('2d');
        if(ctx != null) {
            return ctx;
        }
        return null;
    }

    protected getKeepBlockCanvas():HTMLCanvasElement|null {
        const canvas:HTMLCanvasElement|null = document.getElementById(this.keepBlockCanvasId) as HTMLCanvasElement;
        return canvas;
    }

    protected getKeepBlockContext():CanvasRenderingContext2D|null { 
        const ctx = this.getKeepBlockCanvas()?.getContext('2d');
        if(ctx != null) {
            return ctx;
        }
        return null;
    }


    drawTimer:NodeJS.Timer|null = null;
    dropSpeed = 1000;
    level = 0;

    public start() {
        if(this.drawTimer!= null) {
            clearInterval(this.drawTimer);
            this.drawTimer = null;
        }
        this.drawTimer = setInterval(()=> {
            this.draw()
        },1000/this.fps);        
        this.keyboard.addEventListener();
    }

    private blockDrop() {
        this.moveDown();
    }

    private getLastY():number {
        if(this.block == null) {
            return 0;
        }
        let test = true;
        let y = 1;
        while(test) {
            if (this.board.test(this.block!,{x:0,y:y},0)) {
                y ++;
            } else {
                test = false;
            }
        }
        return y-1;
    }

    public blockQuickDrop() {
        const y = this.getLastY();
        if(this.block!= null) {
            this.block!.position.y += y;
        }
    }

    count = 0;
    lastClearDate:number|null = null;
    moveCount = 0;
    public draw() {        
        let speed = this.fps - (this.level*2);
        if(speed < 10) {
            speed = 10;
        }
        if(this.count%speed == 0) {
            if(this.isInNextMove() == false) {
                this.moveDown();
            }
        }

        const animeFrame = 5;
        let animePoint = {x:0,y:0};

        const ctx = this.getRootContext();
        if(ctx == null) {
            console.log("ctx null");
            this.keyboard.removeEventListener();
            clearInterval(this.drawTimer!);
            return ;
        }        
        
        const rect = this.getRootRect()
        if(this.pause){
            ctx.fillStyle = "#00000099";
            ctx.fillRect(0,0,rect.width, rect.height);
            
            ctx.fillStyle = "white";
            ctx.strokeStyle = "black";
            ctx.font = "30px Arial";
            ctx.fillText("Pause",20,50);
            ctx.strokeText("Pause",20,50);
            return;
        }

        ctx.clearRect(0,0,rect.width, rect.height);
        const w = rect.width / this.board.col;
        const h = rect.height / this.board.row;

        // 쌓인 블록 그리기  
        this.board.draw(ctx,rect);

        if(this.isInNextMove() == false) {
            this.moveCount = 0;
        }
        // 낙하 블록 그리기
        if(this.block != null){   
            //고스트 그리기 
            const drawGhost = () => {
                if(this.block == null) {
                    return;
                }
                
                const y = this.getLastY()
                ctx.beginPath();
                this.board.makeDrawData(this.block!,{x:0,y:y,rotate:0}).points.map(points => {
                    const last = points[points.length - 1]; 
                    ctx.moveTo(last.x, last.y);                
                    points.map(point => {
                        ctx.lineTo(point.x,point.y);         
                    })   
                }
                )
                ctx.strokeStyle = "gray";
                ctx.fillStyle = "#00000055";
                ctx.stroke();
                ctx.fill();
            }
            
            drawGhost();
            
            if(this.isInNextMove()) {
                this.moveCount ++;
                if(this.moveCount > animeFrame) {
                    this.moveCount = animeFrame;
                    this.processBlockMove();                    
                }
                ctx.beginPath();
                const x = this.movement.x;
                const y = this.movement.y; 
                const r = this.movement.r;
                this.board.makeDrawData(this.block,{
                    x:x,
                    y:y,
                    rotate:r}
                    ).points.map(points => {
                    const last = points[points.length - 1]; 
                    ctx.moveTo(last.x, last.y);                
                    points.map(point => {
                        ctx.lineTo(point.x,point.y);         
                    })                
                })
                ctx.strokeStyle = this.block.color;
                ctx.stroke();
            }

            if(this.isInNextMove()) {
                animePoint = {
                    x: (this.movement!.x / animeFrame) * this.moveCount * w,
                    y: (this.movement!.y / animeFrame) * this.moveCount * h   
                }                
            }            

            ctx.beginPath();
            this.board.makeDrawData(this.block,{x:0,y:0,rotate:0}).points.map(points => {
                const last = points[points.length - 1]; 
                ctx.moveTo(last.x + animePoint.x, last.y + animePoint.y);                
                points.map(point => {
                    ctx.lineTo(point.x + animePoint.x ,point.y + animePoint.y);         
                })                
            })
            ctx.fillStyle = this.block!.color;
            ctx.fill();
            ctx.strokeStyle = "black";
            ctx.stroke();
        }

        // 게임 종료 그리기 
        if(this.gameOver) {
            ctx.fillStyle = "#00000099";
            ctx.fillRect(0,0,rect.width, rect.height);
            ctx.font = "30px Arial";
            ctx.fillStyle = "red";
            ctx.strokeStyle = "white";
            ctx.fillText("Game Over",20,50);
            ctx.strokeText("Game Over",20,50);
        }

        // DEBUG print -------------------------
        let interval = 0
        const now = Date.now();
        if(this.lastClearDate!= null) {
            interval = now - this.lastClearDate;
        }
        this.lastClearDate = Date.now();
        ctx.font = "10px Arial";
        ctx.fillStyle="red";
        // ctx.fillText(this.fps + "fps " + interval + " mcount : " + this.moveCount,0,10);
        // ctx.fillText("x:" + animePoint.x + " y:" + animePoint.y,0,20);
        
        this.count++;
        // DEBUG print -------------------------
        
    }

    public insertBlock(blockid:number) {
        if(this.gameOver) {
            return;
        }
        const newblock = SGAME_Tetris_block.makeBlock(blockid)
        this.insertBlockWithBlock(newblock);
    }

    public insertBlockWithBlock(newblock:SGAME_Tetris_block) {
        newblock.position.x = Math.floor(this.board.col / 2) - Math.floor(newblock.data[0].length / 2); 
        
        newblock.position.y = -newblock.getBlockHeight();        
        this.nextBlock.push(newblock);
        if(this.nextBlock.length > this.nextBlockCanvasIds.length) {
            this.block = this.nextBlock[0];
            this.nextBlock.splice(0,1);
        }
        this.drawNextBlock(5);
    }
    
    private bag = new SGAME_TetrisBlockShuffler()
    public insertRandomBlock() {
        if(this.gameOver) {
            return;
        }        
        this.insertBlockWithBlock(this.bag.pop());
    }

    public rotateClockwise() {
        if(this.block== null) {
            return;
        }                
        this.moveCount = 0;
        if(this.board.test(this.block!, {x:0,y:0},1)) {
            this.movement = {x:0,y:0,r:1};
        }
    }

    public rotateCounterClockwise() {
        if(this.block== null) {
            return;
        }        
        this.moveCount = 0;
        if(this.board.test(this.block!, {x:0,y:0},1)) {
            this.movement = {x:0,y:0,r:1};
        }
    }

    public moveLeft() {
        if(this.block== null) {
            return;
        }        
        this.moveCount = 0;
        if(this.board.test(this.block!, {x:-1,y:0},0)) {
            this.movement = {x:-1,y:0,r:0};
        }
    }

    public moveRight() {
        if(this.block== null) {
            return;
        }        
        this.moveCount = 0;
        if(this.board.test(this.block!, {x:1,y:0},0)) {
            this.movement = {x:1,y:0,r:0};
        }
    }

    private processBlockMove() {    
        if(this.isInNextMove() == false || this.block == null) {
            return;
        }
        console.log("process block move");
        const x = this.movement.x;
        const y = this.movement.y;
        const r = this.movement.r;
        this.clearNextMove();
        
        if(this.board.test(this.block, {x:x,y:y},r)) {
            if(r == 1) {
                this.block?.rotateClockwise()
            }
            if(r == -1) {
                this.block?.rotateCounterClockwise()
            }
            if(x == -1) {
                this.block.moveLeft();
            }
            if(x == 1) {
                this.block.moveRight();
            }
            if(y == 1) {
                this.block.moveDown();
            }
        }
    }

    public moveDown() {
        this.moveCount = 0;
        if(this.block!=null) {
            if(this.board.test(this.block, {x:0,y:1},0)) {
                this.movement = {x:0,y:1,r:0};
            } else {
                this.board.dropBlock(this.block);                
                this.insertRandomBlock();
            }
        }
    }

    private drawNextBlock(padding:number) {
        for(let i=0; i<this.nextBlockCanvasIds.length; i++) {
            const rect = this.getNextBlockCanvas(i)?.getBoundingClientRect();
            const ctx = this.getNextBlockContext(i);        
            if(rect == null || ctx == null) {
                continue;
            }
            ctx.clearRect(0,0,rect.width,rect.height);
            const w = (rect.width - padding * 2) / 4
            const h = (rect.height - padding * 2) / 4
            if(this.nextBlock.length > i) {
                const block = this.nextBlock[i];
                block.getPoints().map(point=> {
                    const p = [
                        {x:0 * w + point.x * w + padding, y:0 * w + point.y * h + padding},
                        {x:1 * w + point.x * w + padding, y:0 * w + point.y * h + padding},
                        {x:1 * w + point.x * w + padding, y:1 * w + point.y * h + padding},
                        {x:0 * w + point.x * w + padding, y:1 * w + point.y * h + padding}
                    ];                    
                    ctx.beginPath();
                    ctx.moveTo(p[3].x,p[3].y);
                    p.map(point =>{
                        ctx.lineTo(point.x,point.y);
                    })                    
                    ctx.strokeStyle = "black";
                    ctx.stroke();
                    ctx.fillStyle = block.color;
                    ctx.fill();
                })
            }
        }
    }

    private drawKeepBlock(padding:number) {
        const rect = this.getKeepBlockCanvas()?.getBoundingClientRect();
        const ctx = this.getKeepBlockContext();
        if(rect == null || ctx == null) {
            return ;
        }
        ctx.clearRect(0,0,rect.width,rect.height);
        const w = (rect.width - padding * 2) / 4
        const h = (rect.height - padding * 2) / 4
        if(this.keepBlock != null) {
            this.keepBlock!.getPoints().map(point=> {
                const p = [
                    {x:0 * w + point.x * w + padding, y:0 * w + point.y * h + padding},
                    {x:1 * w + point.x * w + padding, y:0 * w + point.y * h + padding},
                    {x:1 * w + point.x * w + padding, y:1 * w + point.y * h + padding},
                    {x:0 * w + point.x * w + padding, y:1 * w + point.y * h + padding}
                ];                    
                ctx.beginPath();
                ctx.moveTo(p[3].x,p[3].y);
                p.map(point =>{
                    ctx.lineTo(point.x,point.y);
                })                    
                ctx.strokeStyle = "black";
                ctx.stroke();
                ctx.fillStyle = this.keepBlock!.color;
                ctx.fill();
            })
        }        
    }

    public keep() {
        if(this.block == null) {
            return 
        }
        if(this.keepBlock == null) {
            this.keepBlock = this.block;
            this.keepBlock.yPointReset();
            this.block = null;
            this.insertRandomBlock();
        }
        else {
            const a = this.keepBlock;
            this.keepBlock = this.block;
            this.block = a;            
            this.block.yPointReset();
            this.keepBlock.yPointReset();            
        }
        this.drawKeepBlock(5);        
    }

    public startGame() {
        if(this.gameOver) {
            this.board.clearAll();
            this.point = 0;
            this.combo = 0;
            this.level = 0;
            this.block = null;
            this.nextBlock = [];      
            this.gameOver = false;  
        }
        else {
            if(this.nextBlock.length > 0) {
                return;
            }
        }
        this.pointCallback({
            totalPoint:0,
            point:0,
            combo:0,
            level:0,
            maxCombo:0,
        })         
        this.nextBlockCanvasIds.map(id => {
            this.insertRandomBlock();
        })
        this.insertRandomBlock();
    }

    public togglePause() {
        this.pause = !this.pause;
    }
    
}
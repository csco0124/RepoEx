import { numberMask } from "../../../../../../common/commonUtil";
import { SGAME_Tetris_block } from "./SGAME_Tetris_block";
interface Point {
    x:number;
    y:number;
}
interface DrawData {
    points:Array<Array<Point>>;
    color:string;
}
export class SGAME_Tetris_board {
    boardRect:DOMRect = new DOMRect(0,0,100,100);
    blockData :Array<Array<string>>;
    col:number;
    row:number;
    clearCallback:(removeLines:number)=>void;
    gameOverCallback:()=>void;

    constructor(col:number, row:number, clearCallback:(removeLines:number)=>void, gameOverCallback:()=>void) {
        let data = new Array<Array<string>>();
        for(let i=0;i<row;i++) {
            let arr = new Array<string>();
            for(let j=0;j<col;j++) {
                arr.push("")
            }
            data.push(arr);
        }
        this.blockData = data;        
        this.col = col;
        this.row = row;
        this.clearCallback = clearCallback;
        this.gameOverCallback = gameOverCallback;
    }

    public setBoardRect(rect:DOMRect) {
        this.boardRect = rect;
    }

    public clearAll() {
        for(let i=0; i<this.row; i++) {
            for(let j=0; j<this.col; j++) {
                this.blockData[i][j] = "";
            }
        }
    }

    public makeDrawData(block:SGAME_Tetris_block, move:{x:number,y:number,rotate:number}):DrawData {        
        const w = this.boardRect.width / this.col;
        const h = this.boardRect.height / this.row;
        const bPosition = {
            x: block.position.x * w,
            y: block.position.y * h
        }

        const arr = block.getNextPoints(move.rotate, move.x, move.y).map(point=> { 
            //0,1
            const x = point.x * w + bPosition.x;
            const y = point.y * h + bPosition.y;
            const p1 = {x:0 + x, y:0 + y};
            const p2 = {x:w + x, y:0 + y};
            const p3 = {x:w + x, y:h + y};
            const p4 = {x:0 + x, y:h + y};
            return [p1,p2,p3,p4];
        })

        return { points : arr , color: block.color }
    }

    public test(block:SGAME_Tetris_block, nextPos:{x:number,y:number}, rotate:number):boolean {
        const points = block.getNextPoints(rotate, nextPos.x, nextPos.y);

        for(let i = 0; i< points.length; i++) {
            const x = points[i].x + block.position.x;
            const y = points[i].y + block.position.y;
            if(x < 0 || x >= this.col) {                
                return false;
            } 
            if(y >= this.row) {
                return false;
            }
            if(y>0) {                        
                if(this.blockData[y][x]!="") {
                    return false;
                }
            }
        }
        return true;
    }

    public dropBlock(block:SGAME_Tetris_block) {        
        const points = block.getPoints();
        points.map(point=>{
            const x = point.x + block.position.x
            const y = point.y + block.position.y
            if(y > 0) {
                this.blockData[y][x] = block.color;
            } else {
                // Game Over
                this.gameOverCallback();
            }
        })
        this.testBlockMatchMakeWhite();
    }

    public draw(ctx:CanvasRenderingContext2D, rect:DOMRect) {
        const grd = ctx.createLinearGradient(0, 500, 0, 0);
        grd.addColorStop(0, "#996633");
        grd.addColorStop(1, "#336699");

        ctx.fillStyle = grd;
        ctx.fillRect(0,0,rect.width,rect.height);

        const w = rect.width / this.col;
        const h = rect.height / this.row;
        for(let i=0; i<this.blockData.length; i++) {
            for(let j=0; j<this.blockData[i].length; j++) {
                let color = this.blockData[i][j];
                if(color != "") {
                    let p = [
                        {x:0 * w + j * w, y:0 * h + i * h},
                        {x:1 * w + j * w, y:0 * h + i * h},
                        {x:1 * w + j * w, y:1 * h + i * h},
                        {x:0 * w + j * w, y:1 * h + i * h} 
                    ]
                    
                    ctx.beginPath();
                    ctx.moveTo(p[3].x,p[3].y);
                    p.map(point=> {
                        ctx.lineTo(point.x,point.y);
                    })
                    ctx.fillStyle = color;
                    ctx.fill();
                    ctx.strokeStyle = "white";
                    ctx.stroke();
                }                
            }
        }        
    }

    // 블록 다 채웠으면 삭제
    private testBlockMatchMakeWhite() {
        var line = 0;
        for(let i=0; i<this.row; i++) {
            let count = 0;
            for(let j=0; j<this.col; j++) {
                if(this.blockData[i][j] != "") {
                    count ++;
                }
            }
            if(count == this.col) {
                for(let j=0; j<this.col; j++) {
                    this.blockData[i][j] = "black";
                }
                line ++;
            }
        }
        if(line > 0) {
            setTimeout(()=> {
                this.testBlockClear();
            },500)
        }  
        this.clearCallback(line);
    }

    private testBlockClear() {
        var removeLine = 0;
        for(let i=0; i<this.row; i++) {
            let count = 0;
            for(let j=0; j<this.col; j++) {
                if(this.blockData[i][j] != "") {
                    count ++;
                }
            }
                 
            if(count == this.col) {
                for(let a = i; a > 0; a--) {
                    for(let j= 0; j<this.col; j++) {
                        this.blockData[a][j] = this.blockData[a-1][j];
                    }                                
                }                                
                for(let j=0; j<this.col; j++) {
                    this.blockData[0][j] = ""
                }        
                removeLine ++;
            }
        } 
    }
}
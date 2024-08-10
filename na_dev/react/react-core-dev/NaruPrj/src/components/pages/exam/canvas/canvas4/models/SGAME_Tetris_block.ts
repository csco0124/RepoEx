import { random } from "lodash";

interface Point {
    x:number;
    y:number;
}

export class SGAME_Tetris_block {
    position:Point = {x:0,y:0};
    data:Array<Array<Array<boolean>>>;    
    color:string;    
    rotateIdx:number;
    constructor(data:Array<Array<Array<boolean>>>, color:string, rotateIdx:number) {
        this.color = color;
        this.data = data;
        this.rotateIdx = rotateIdx;
    }

    // 블록의 높이값 구하기
    getBlockHeight() {
        return this.data[this.rotateIdx].length;
    }
    
    yPointReset() {
        this.position.y = -3;
    }

    // 현제 블록 포인트 
    getPoints():Array<Point> {
        return this.getNextPoints(0,0,0);
    }

    // 이동 블록 포인트 구하기
    getNextPoints(rotate:number,movex:number,movey:number) {
        let r = this.rotateIdx + rotate;
        if(r < 0) {
            r = this.data.length - 1;
        }
        if(r >= this.data.length) {
            r = 0;
        }
        
        let result = Array<Point>();
        for(let i=0; i<this.data[r].length; i++) {
            for(let j=0; j<this.data[r][i].length; j++) {
                if(this.data[r][i][j] === true) {            
                    result.push({x:j + movex,y:i + movey})
                }
            }
        }
        return result;
    }



    rotateCounterClockwise() {
        this.rotateIdx--;
        if(this.rotateIdx < 0) {
            this.rotateIdx = this.data.length - 1;
        }
    }

    rotateClockwise() {
        this.rotateIdx++;
        if(this.rotateIdx >= this.data.length) {
            this.rotateIdx = 0;
        }
    }

    moveLeft() {
        this.position.x --;
    }

    moveRight() {
        this.position.x ++;
    }

    moveDown() {
        this.position.y ++;
    }

    static makeBlock(type:number):SGAME_Tetris_block {
        const x = true;
        const o = true; // 회전축
        const _ = false;
        switch (type) {
            case 0:
                return new SGAME_Tetris_block(
                    [
                        [
                            [_,_,_],
                            [x,o,_],
                            [x,x,_],
                        ],
                        [
                            [x,x,_],
                            [x,o,_],
                            [_,_,_],
                        ],
                        [
                            [_,x,x],
                            [_,o,x],
                            [_,_,_],
                        ],
                        [
                            [_,_,_],
                            [_,o,x],
                            [_,x,x],
                        ],


                    ]
                ,"yellow", 0);        
            case 1:
                return new SGAME_Tetris_block(
                    [
                        [
                            [_,_,_,_],
                            [_,_,_,_],
                            [x,x,o,x],
                            [_,_,_,_],
                        ],
                        [
                            [_,_,x,_],
                            [_,_,x,_],
                            [_,_,o,_],
                            [_,_,x,_],
                        ],
                ],"#00ffff", random(0,1));
            case 2:
                return new SGAME_Tetris_block(
                    [
                        [
                            [_,_,_,_],
                            [_,_,x,x],
                            [_,x,x,_],
                            [_,_,_,_],
                        ],
                        [
                            [_,_,_,_],
                            [_,_,x,_],
                            [_,_,x,x],
                            [_,_,_,x],
                        ],
                        
                ],"green", random(0,1));
            case 3:
                return new SGAME_Tetris_block(
                    [
                        [
                            [_,_,_,_],
                            [x,x,_,_],
                            [_,x,x,_],
                            [_,_,_,_],
                        ],
                        [
                            [_,_,x,_],
                            [_,x,x,_],
                            [_,x,_,_],
                            [_,_,_,_],
                        ],
                ],"red", random(0,1));
            case 4:
                return new SGAME_Tetris_block(
                    [
                        [
                            [_,_,_,_],
                            [x,x,x,_],
                            [x,_,_,_],
                            [_,_,_,_],
                        ],
                        [
                            [_,x,_,_],
                            [_,x,_,_],
                            [_,x,x,_],
                            [_,_,_,_],
                        ],
                        [
                            [_,_,_,_],
                            [_,_,x,_],
                            [x,x,x,_],
                            [_,_,_,_],
                        ],
                        [
                            [x,x,_,_],
                            [_,x,_,_],
                            [_,x,_,_],
                            [_,_,_,_],
                        ],
                    ]                
                ,"orange",random(0,3));
            case 5:
                return new SGAME_Tetris_block(
                    [
                        [
                            [_,_,_,_],
                            [_,_,_,_],
                            [x,x,x,_],
                            [_,_,x,_],
                        ],
                       
                        [
                            [_,_,_,_],
                            [_,x,x,_],
                            [_,x,_,_],
                            [_,x,_,_],
                        ],
                        [
                            [_,_,_,_],
                            [x,_,_,_],
                            [x,x,x,_],
                            [_,_,_,_],

                        ],
                        [
                            [_,x,_,_],
                            [_,x,_,_],
                            [x,x,_,_],
                            [_,_,_,_],
                        ],
                    ],"blue",random(0,3));                
            case 6:
                return new SGAME_Tetris_block(
                    [
                        [
                            [_,_,_,_],
                            [x,x,x,_],
                            [_,x,_,_],
                            [_,_,_,_],
                        ],
                        [
                            [_,x,_,_],
                            [_,x,x,_],
                            [_,x,_,_],
                            [_,_,_,_],
                        ],
                        [
                            [_,_,_,_],
                            [_,x,_,_],
                            [x,x,x,_],
                            [_,_,_,_],

                        ],
                        [
                            [_,_,_,_],
                            [_,x,_,_],
                            [x,x,_,_],
                            [_,x,_,_],
                        ],
                       
                    ],"#bf00ff",random(0,3));                

            default:
                return new SGAME_Tetris_block(
                    [
                        [
                            [_,_,_,_],
                            [_,_,x,_],
                            [_,x,_,_],
                            [_,_,_,_],
                        ],
                       
                    ],"gray",0);                
        }
    }

}




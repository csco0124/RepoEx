import { random } from "lodash";
import { SGAME_Tetris_block } from "../models/SGAME_Tetris_block";

export class SGAME_TetrisBlockShuffler {
    private bag = Array<number>();

    private addBlockWhenBagEmpty() {
        if(this.bag.length==0) {
            for(let i=0; i<6;i++) {
                this.bag.push(i);
            }                
        }
    }

    public pop():SGAME_Tetris_block {
        if(this.bag.length == 0) {
            this.addBlockWhenBagEmpty();
        }
        
        let idx = random(0,this.bag.length-1);        
        const item = this.bag[idx];        
        this.bag.splice(idx,1);
        console.log("make block idx : " + item);
        return SGAME_Tetris_block.makeBlock(item);
    }
}

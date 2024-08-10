import { uniqueId } from "lodash";


let count = 0;
export type SGAME_Keyboard_KeyType_Tetris = 'mr'|'ml'|'md'|'rl'|'rr'|'drop'|'down'|'keep'|'pause';
export type SGAME_Keyboard_KeyType_TurtleRun = 'right'|'left'|'jump'|'test';

export type SGAME_GameName ="tetris"|"turtlerun";
export class SGAME_Keyboard {    
    id = uniqueId("tetris_keyboard");
    isAdded = false;
    gamename:SGAME_GameName;
    readonly callback:(key:SGAME_Keyboard_KeyType_Tetris|SGAME_Keyboard_KeyType_TurtleRun)=>void
    constructor(callback:(key:SGAME_Keyboard_KeyType_Tetris|SGAME_Keyboard_KeyType_TurtleRun)=>void,gameName:SGAME_GameName) {
        this.callback = callback;        
        this.addEventListener();
        this.gamename = gameName;
    }

    public addEventListener() {
        if(this.isAdded){
            this.removeEventListener();
        }

        this.isAdded = true 
        document.addEventListener('keydown', this.eventKeydownHandler);
    }


    eventKeydownHandler = (event:KeyboardEvent) => {
        count ++;
        console.log('Key down:' + event.key + ' : ' + count + ' uuid : ' + this.id);
        switch (this.gamename) {
            case "tetris":
                switch(event.key) {
                    case '.':
                        this.callback('mr');
                        break;
                    case 'm': case 'ㅡ':
                        this.callback('ml');
                        break;
                    case 'k': case 'ㅏ':
                        this.callback('rl');
                        break;
                    case ',': 
                        this.callback('rr');
                        break;         
                    case 'h': case 'ㅗ':
                        this.callback('drop');
                        break;
                    case 'j': case 'ㅓ':
                        this.callback('down');
                        break    
                    case 'l': case "ㅣ":
                        this.callback('keep');
                        break;  
                    case '\'': 
                        this.callback('pause');     
                    default:
                        break;
    
                }
                break;
            case "turtlerun":
                switch(event.key) {
                    case "q": case "ㅂ":
                        this.callback("test");
                        break;
                    case "k": case "ㅏ":
                        this.callback('jump');
                        break;
                    case '.':
                        this.callback('right');
                        break;
                    case 'm': case 'ㅡ':
                        this.callback('left');
                        break;    
                }
                break;
        }
    }

    public removeEventListener() {
        console.log("removeEventListener keydown");
        this.isAdded = false;
        document.removeEventListener('keydown',this.eventKeydownHandler);
    }
}
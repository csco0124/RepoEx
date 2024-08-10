import { SGAME_BlockName, SGAME_MapData, SGAME_MapItem } from './SGAME_MapItem';
import { SGAME_Unit } from './SGAME_Unit';
import '../Number+Extensions';

export class SGAME_MAP {
    position = {x:0, y:0}
    blockSize:{width:number,height:number};
    items:Array<SGAME_MapItem> = [];
    screenRect:DOMRect;

    makeBlockSize(arr:Array<string>):{width:number,height:number} {
        let maxLength = 0;
        arr.map(str=> {
            if(maxLength < str.length) {
                maxLength = str.length;
            }
        })
        if(this.screenRect.width == 0) {
            return {width:100,height:100};
        }
        const w = this.screenRect.width / (maxLength - 2);
        return {width:w,height:w};
    }

    constructor(data:Array<string>, screenRect:DOMRect) {    
        this.screenRect = screenRect;
        this.blockSize = this.makeBlockSize(data);
        console.log("-----SGAME_MAP init : " + data.length + " blockSize" + this.blockSize.width + " " +  this.blockSize.height);
        const newData = data.reverse();
        for(let i=0; i<newData.length; i++) {
            const str = newData[i];
            for(let j=0; j<str.length; j++) {
                const char = str[j];
                console.log("char:" + char)
                const getName = ():SGAME_BlockName => {
                    switch(char) {
                        case " ":
                            return "none"
                        case "P":
                            return "point";
                        default:
                            return "block";
                    }                        
                }
                const getColor = ():string => {
                    switch(char) {
                        case " ":
                            return "clear";
                        case "P":
                            return "yellow";
                        case "#":
                            return "#336699";
                        case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9":
                            const i = (255 - parseInt(char) * 20).toHex();
                            const color = "#"+i+i+i;
                            console.log("make Color block : " + char + " = " + color)
                            return color;
                        default:
                            return "#aaaaaaaa";
                    }
                }
                const getHP = ():number => {
                    switch(char) {
                        case " ":
                            return 0;
                        case "#":
                            return 99999;
                        case "P":
                            return 10000;
                        case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9":
                            return parseInt(char) * 100;
                        default:
                            return 100;
                    }
                }
                const item:SGAME_MapData = {
                    name : getName(),
                    position:{x:j,y:i},
                    size:{width:1,height:1}, 
                    color:getColor(),
                    HP:getHP()
                }
                if(item.name != "none") {
                    console.log("item name:"+item.name);
                    this.items.push(new SGAME_MapItem(item));
                }
            }
        }

    }

    public addItem(item:SGAME_MapItem) {
        this.items.push(item);
    }

    public removeItem(item:SGAME_MapItem) {
        const idx = this.items.indexOf(item);
        this.items.splice(idx,1);
    }

    public draw(ctx:CanvasRenderingContext2D) {
        this.items.map(item => {
            item.draw(ctx, {x:this.position.x, y:this.position.y},this.screenRect,this.blockSize);
        })
    }

    static makeMap(stage:number, screenRect:DOMRect):SGAME_MAP {
        switch(stage) {
            case 0:
                return new SGAME_MAP(
                    [
                        "     #P",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "                #",
                        "               ##",
                        "              ###",
                        "               ##",
                        "                #",
                        "#               #",
                        "###P           ##",
                        "###           ###",
                        "###            ##",
                        "#    P###       #",
                        "8888888888888888#",
                        "#777777777777777#",
                        "##66666666666666#",
                        "###5555555555555#",
                        "####444444444444#",
                        "###3333333333333#",
                        "##22222222222222#",
                        "#111111111111111#",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "#               #",
                        "#               #",
                        "#               #",
                        "#               #",
                        "#               #",
                        "#               #",
                        "#               #",
                        "#               #",
                        "#               #",
                        "#               #",
                    ],
                    screenRect                    
                )            

            default:
                return new SGAME_MAP(
                    [
                        "999999999999",
                        "999999999999",
                        "999999999999",
                        "999999999999",
                        "999999999999",
                        "999999999999",
                        "999999999999",
                        "999999999999",
                        "999999999999",
                        "999999999999",
                        "123412341234",
                        "123412341234",
                        "123412341234",
                        "123412341234",
                        "123412341234",
                        "123412341234",
                        "123412341234",
                        "123412341234",
                        "123412341234",
                        "      P",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                    ],
                    screenRect
                )
        }
    }

    public crashTest(unit:SGAME_Unit):SGAME_MapItem|null {
        if(unit.getIsFrameOut() == true) {
            return null;
        }
        return this.crashTestWithPoint(unit.getPosition(),unit.radius);
    }    

    public crashTestWithPoint(position:{x:number,y:number}, radius: number):SGAME_MapItem|null {
        const x = position.x;
        const y = position.y;
        for(let i=0; i<this.items.length;i ++) {
            const item = this.items[i];
            if(item.isFrameOut() === false && item.isDie() == false) {
                const rect = item.makeRect();                
                let a = rect.x < x+radius && x-radius < rect.x + rect.width;
                let b = rect.y < y+radius && y-radius < rect.y + rect.height;
                if(a && b) {
                    return item
                }
            }
        }
        return null;
    }

}
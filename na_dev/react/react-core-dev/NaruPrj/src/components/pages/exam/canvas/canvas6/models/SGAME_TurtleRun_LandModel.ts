import { SGAME_TurtleRun_Screen } from "../instances/SGAME_TurtleRun_Screen";
import { SGAME_TurtleRun_LandItemModel, SGAME_TurtleRun_LandItemType } from "./SGAME_TurtleRun_LandItemModel";

export class SGAME_TurtleRun_LandModel {
    position = {x:0,y:0};
    items:Array<SGAME_TurtleRun_LandItemModel>
    readonly blockSize:{width:number,height:number}
    startPos = {x:0,y:0};
    constructor(data:Array<string>) {
        let arr = new Array<SGAME_TurtleRun_LandItemModel>();

        var hmax = 0;
        data.map(arr => {
            if(hmax < arr.length) {
                hmax = arr.length;
            }
        })
        const screenHeight = SGAME_TurtleRun_Screen.getInstance().rect.height;
        const h = screenHeight / hmax;
        this.blockSize = {width:h,height:h};
        // this.blockSize = {width:30,height:30};
        let sp = {x:0,y:0};
        for(let i=0; i<data.length; i ++) {            
            for(let j=0; j< data[i].length; j++) {
                const char = data[i][j];
                function makeType():SGAME_TurtleRun_LandItemType {
                    switch(char) {
                        case "#":
                            return "land";
                        case "S":
                            sp = {x:i,y:j};
                            console.log("Start : "+i + " : " + j)
                            return "none";
                        default:
                            return "none";

                    }    
                }
                const type = makeType();
                if(type != "none") {
                    const item = new SGAME_TurtleRun_LandItemModel(type,{x:i,y:j},this.blockSize)
                    console.log("x:"+i+" y:"+j + " blockSize :" + this.blockSize.width + ","+this.blockSize.height + "screenHeight" + screenHeight) ;
                    arr.push(item);    
                }
            }
        }      
        this.startPos = {x:sp.x * this.blockSize.width, y:screenHeight - sp.y - this.blockSize.height - 50};
        this.items = arr;
        console.log("landModel init item length : " + this.items.length);
    }


    static makeLand(stage:number):SGAME_TurtleRun_LandModel {
        let data:Array<string> = []
        switch(stage) {
            case 0:
                data = [
                    "##    ##  S     ",
                    "##    ##",
                    "  ######",
                    "  ##   #",
                    "  ##   #",
                    "       ##",   
                    "#",
                    "#",
                    "#",
                    "#   #",
                    "#   #",
                    "    #",
                    "    #",
                    "    #",
                    "    #",
                    "    #  #",
                    "    #  ###",
                    "    #  #",
                    "    #",
                    "    #",
                    "############",
                    "#",
                    "#",
                    "#",
                    "#",
                    "",
                    "###",
                    "#  #",
                    "#   #",
                    "#    ########",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                ]
                break;

            case 1:
                data = [
                    "#",
                    "#",
                    "#",
                    "# s",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "###",
                    "#",
                    "#",
                    "#",
                    "#########",
                    "#",
                    "#",
                    "#",
                    "###",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#########",
                ]
            default:
                break;
        }
        return new SGAME_TurtleRun_LandModel(data);
    }

    public draw(ctx:CanvasRenderingContext2D) {
        this.items.filter(item=>item.isIn(this.position)).map(item => {        
            item.draw(ctx,this.position);
        })                
    }    

    

}
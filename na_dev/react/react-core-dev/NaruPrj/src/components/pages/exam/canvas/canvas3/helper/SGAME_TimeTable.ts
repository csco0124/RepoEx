import { SGAME_MoveableUnit } from "../models/SGAME_MoveableUnit";
import { SGAME_EnemyUnit } from '../models/SGAME_EnemyUnit';
import { SGAME_EnemyShot } from "../models/SGAME_EnemyShot";
import { SGAME_PlayerUnit } from '../models/SGAME_PlayerUnit';
import { SGAME_ItemUnit } from "../models/SGAME_ItemUnit";

export class SGAME_TimeTable {
    private target:SGAME_PlayerUnit;
    private timeline = 0;
    private timer:NodeJS.Timer|null = null;
    private pattern:number;
    callback:(entryUnits:SGAME_EnemyUnit[])=>void;
    enemyShotCallback:(shot:SGAME_EnemyShot[])=>void;
    dropItemCallback:(item:SGAME_ItemUnit[])=>void

    constructor(pattern:number,player:SGAME_PlayerUnit, 
        callback:(entryUnits:SGAME_EnemyUnit[])=>void, 
        enemyShot:(entryShot:SGAME_EnemyShot[])=>void, 
        dropItem:(items:SGAME_ItemUnit[])=>void,
        ) {
        this.pattern = pattern;
        this.callback = callback;
        this.enemyShotCallback = enemyShot;
        this.dropItemCallback = dropItem;
        this.timer = setInterval(()=> {
            this.process()
        },100)
        this.target = player;
    }


    private data:{time:number,units:SGAME_EnemyUnit[]}[] = [];

    private enemy(type:number,x:number):SGAME_EnemyUnit {
        switch(type) {
            case 0:
                return new SGAME_EnemyUnit(
                    {
                        x:x,
                        type:0,
                        speed:1,
                        hp:50,
                        radius:20,
                        dropItems:["POWER","POINT","POINT","POINT","POINT","COMBO","RMS"],
                        moveTarget:[{x:10,y:10},{x:10,y:30},{x:30,y:40},{x:100,y:100},{x:50,y:150},{x:150,y:150},{x:150,y:200}],
                    }, this.target,this.enemyShotCallback, this.dropItemCallback)

            default:
                return new SGAME_EnemyUnit(
                    {
                        x:x,
                        type:1,
                        speed:2,
                        hp:100,
                        radius:50,
                        dropItems:["POINT","POINT"],
                        moveTarget:[]
                    }, this.target, this.enemyShotCallback, this.dropItemCallback)                
        }
    }
    private generateData() {
        if(this.data.length > 0) {
            return;
        }
        
        switch(this.pattern) {
            case 0:
                this.data = 
                [
                    {time: 10, units: [this.enemy(0,20)]},
                    {time: 20, units: [this.enemy(1,50),this.enemy(1,150)]}
                ];
                break;
            case 1:
                this.data = [
                    {
                        time:10,
                        units:[
                            new SGAME_EnemyUnit(
                                {
                                    x:100,
                                    type:1,
                                    speed:2,
                                    hp:50,
                                    radius:20,
                                    dropItems:["COMBO","POINT","POINT","POINT","POINT","POINT","POINT","POINT","POINT"],
                                    moveTarget:[],
                                }
                                ,this.target,this.enemyShotCallback,this.dropItemCallback),
                            new SGAME_EnemyUnit(
                                {
                                    x:200,
                                    type:1,
                                    speed:5,
                                    hp:50,
                                    radius:50,
                                    dropItems:["COMBO","POINT","POINT","POINT","POINT","POINT"],
                                    moveTarget:[],
                                }
                                ,this.target,this.enemyShotCallback,this.dropItemCallback)    
                        ]
                    },
                    {
                        time:40,
                        units:[
                            new SGAME_EnemyUnit(
                                {
                                    x:100,
                                    type:1,
                                    speed:5,
                                    hp:50,
                                    radius:50,
                                    dropItems:["COMBO"],
                                    moveTarget:[],
                                },this.target,this.enemyShotCallback,this.dropItemCallback),
                            new SGAME_EnemyUnit(
                                {
                                    x:200,
                                    type:1,
                                    speed:5,
                                    hp:50,
                                    radius:50,
                                    dropItems:["COMBO"],
                                    moveTarget:[],
                                },this.target,this.enemyShotCallback,this.dropItemCallback)    
                        ]
                    }

                ]
            default:
                break
            
        }        
    }

    private pointer = 0;
    private process() {
        this.generateData();

        console.log("timetable " + this.pointer + this.timeline);
        this.timeline ++;
        if(this.pointer >= this.data.length && this.timer != null) {
            clearInterval(this.timer!);
            return;
        }        

        if(this.data[this.pointer].time == this.timeline) {
            this.callback(this.data[this.pointer].units)
            this.pointer ++;
        }        
    }


}
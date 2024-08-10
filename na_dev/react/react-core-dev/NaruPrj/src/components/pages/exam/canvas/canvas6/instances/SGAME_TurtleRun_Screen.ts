export class SGAME_TurtleRun_Screen {
    static instance:SGAME_TurtleRun_Screen|null = null;
    static getInstance():SGAME_TurtleRun_Screen {
        if(SGAME_TurtleRun_Screen.instance == null) {
            this.instance = new SGAME_TurtleRun_Screen();
        }
        return this.instance!;
    }

    rect:DOMRect = new DOMRect();
}
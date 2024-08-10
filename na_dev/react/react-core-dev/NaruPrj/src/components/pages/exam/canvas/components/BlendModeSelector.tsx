import { useState } from "react";
import TextSelector from "./TextSelector";
interface BlendModeSelectorProps {
    default:string;
    callback:(value:string)=>void;
}  

const BlendModeSelector = (props:BlendModeSelectorProps)=> {
    const modes:Array<string> = [
        "lighter", 
        "multiply",
        "source-over",
        "xor",
        // "source-atop",
        // "source-in",
        // "source-out",
        // "destination-over",
        // "destination-atop", 
        // "destination-in",
        // "destination-out", 
        // "copy", 
    ];

    return (
        <div className="blend">
            <TextSelector texts={modes} currentIdx={0} callback={(text)=> {
                props.callback(text);
            }} />
        </div>
    )
}
export default BlendModeSelector;
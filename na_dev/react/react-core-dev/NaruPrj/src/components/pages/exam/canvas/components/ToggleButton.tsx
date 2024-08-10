import { useState } from "react";

interface ToggleButtonProps {
    on:any;
    off:any;
    default:boolean;
    callback:(value:boolean)=>void;
}

const ToggleButton = (props:ToggleButtonProps) => {
    const [isOn,setIsOn] = useState(props.default);

    const btnHandler = (event:any) => {
        setIsOn(!isOn);
        props.callback(isOn);
    }

    return (
        <button className="btn btn-primary" onClick={btnHandler} > { isOn ? props.on : props.off} </button>
    )
}


export default ToggleButton;
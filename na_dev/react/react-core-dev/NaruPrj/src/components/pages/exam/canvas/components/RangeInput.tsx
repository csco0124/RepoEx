import { ChangeEvent, useState } from "react";

interface RangeInputProps {    
    default:number;
    min:number;
    max:number;
    unit?:string;
    step?:number;
    callback:(value:number)=>void;
}

const RangeInput = (props:RangeInputProps) =>  {
    const [value, setValue] = useState(props.default);
    const onChangeValue = (event:ChangeEvent<HTMLInputElement>)=> {
        const value = Number(event.target.value);        
        setValue(value);
        props.callback(value);
    }

    return (
        <span className="input-group mb-3">
            <span className="input-group-text"> { value } {props.unit ?? ""} </span>
            <input className="form-range form-control" step={props.step ?? 1.0} type="range" value={value} min={props.min} max={props.max} onChange={onChangeValue}/>
        </span>
    )
}

export default RangeInput;
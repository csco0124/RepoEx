interface CheckboxProps {
    title:string;
    name:string;
    callback:(value:boolean)=>void;
}

function Checkbox (props:CheckboxProps) {
    const onChangeValueHandler = (event:any) => {
        console.log(event.target.checked);
        props.callback(event.target.checked);
    }
    return (
        <span>{props.title} : <input className="form-check-input" type="checkbox" onChange={onChangeValueHandler} name={props.name}/></span>
    )
}

export default Checkbox;
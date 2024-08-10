interface ButtonProps {
    title:string;
    callback:()=>void;
}
const Button = (props:ButtonProps) => {
    return(
        <button className="btn btn-primary m-1" onClick={props.callback}>{props.title}</button>
    )
}

export default Button;
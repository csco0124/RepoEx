import { Editor } from "@monaco-editor/react";
import { useEffect, useState } from "react";
/**
 * 코드 에디터
 * @param {height : string,code : string ,title : string ,language : string ,onChange : callback , readOnly : bool} props 
 * @returns 
 */
const SyntaxHighlightTextField = (props) => {
    const [code,setCode] = useState(props.code);    
    const [language,setLanguage] = useState(props.language);

    const handleChange = (value)    => {
        setCode(value);
        props.onChange(value);
    };

    useEffect(()=> {
        setCode(props.code);
        setLanguage(props.language);
    },[code,language,props])

    const readOnlyOption = {
        readOnly : true 
    }
    const defaultOption = {
        readOnly : false 
    }

    return (
        <article id={props.title} className={`input ${props.readOnly ? 'readOnly' : ''}`}>
            <header><h2>{props.title}</h2></header>            
             <Editor            
            height={props.height + "px"}
            language={language}
            theme="vs-dark"
            value={code}
            onChange={value =>{
                handleChange(value);
            }}
            options={props.readOnly ? readOnlyOption : defaultOption}
            />
        </article>
    );
}

export default SyntaxHighlightTextField;
import React from "react";
import styles from "../App.module.css";

export interface RootTree {
    id : string;
    parent : number;
    text: string;
}

interface Props {
    childTree: RootTree;
    tabId: string;
    onClick: (rootParent: RootTree) => void; 
}

const RootNodeButton = (props: Props) => {

    const handleRootParent = () => {
        props.onClick(props.childTree);
    }

    return (
        <li onClick={handleRootParent}>
		    <a role="tab" aria-selected="true" aria-controls="menu-tab" id={props.childTree.id} className={props.tabId === props.childTree.id ? `${styles.tabNavActive}` : ''} title={props.childTree.text}>{props.childTree.text}</a>
	    </li>
    )
}

export default RootNodeButton;
import React from "react";
import { NodeModel } from "../types";

export interface RootTree {
    id : string;
    parent : number;
    text: string;
}

interface Props {
    childTree: RootTree;
    onClick: (rootParent: RootTree) => void; 
}

const RootNodeButton = (props: Props) => {

    const handleRootParent = () => {
        props.onClick(props.childTree);
    }

    return (
        <button className="mb-4" onClick={handleRootParent}>{props.childTree.text}</button>
    )
}

export default RootNodeButton;
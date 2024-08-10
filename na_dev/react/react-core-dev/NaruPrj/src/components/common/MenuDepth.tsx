import React, {useState, useEffect, Fragment} from "react";
import { useSelector } from "react-redux";
import { NodeModel } from "../pages/exam/menu-tree/types";
import { RootState } from "../../store";

function getTextArrayById(data: NodeModel[], id: string): string[] {
  const textArray: string[] = [];
  
  function traverse(node: NodeModel) {
    textArray.unshift(node.text); // 배열의 맨 앞에 추가하기 위해 unshift() 사용
    
    const parentNode = data.find(item => item.id === node.parent);
    if (parentNode) {
      traverse(parentNode);
    }
  }
  
  const startNode = data.find(item => item.id === id);
  if (startNode) {
    traverse(startNode);
  }
  
  return textArray;
}

const MenuDepth = () => {
    const testState = useSelector((state: RootState) => state.leftTree);
    let treeMenu:any = [];
    const [myName, setMyName] = useState("");
    let myParents = [];
    const [textArray, setTextArray]:any = useState([]);

    useEffect(() => {
        const url = window.location.href;
        const path = url.substring(url.lastIndexOf('/') + 1);
        console.log('Path:', path);

        // for (const myTree of testState.treeData1 as NodeModel[]) {
        //     if (myTree.id === path) {
        //         treeMenu = testState.treeData1;
        //         setMyName(myTree.text);
        //     }
        // }
        // for (const myTree of testState.treeData2 as NodeModel[]) {
        //     if (myTree.id === path) {
        //         treeMenu = testState.treeData2;
        //         setMyName(myTree.text);
        //     }
        // }
        for (const myTree of testState.treeData3 as NodeModel[]) {
            if (myTree.id === path) {
                treeMenu = testState.treeData3;
                setMyName(myTree.text);
            }
        }

        // 부모, 조상 name값 구하기.
        setTextArray(getTextArrayById(treeMenu, path));
        console.log(textArray);
    }, [testState.treeData3]);

    return (
        <div className="title-item">           
            {textArray.length > 0 && (
                <Fragment>
                    <h2 className="h2-title">{myName}</h2>
                    <ul className="location">
                        {textArray.map((item: string, index:number) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </Fragment>
            )}
        </div>
    );
}

export default MenuDepth;
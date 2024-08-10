import "./css/arborist.css";
import { NodeApi, Tree } from "react-arborist";
import { menuTreeItem } from "./data/dataInterface";
import data from "./data/sampleArboristData.json";
import file from "./css/file.png";
import arrow from "./css/arrow.svg"
import { useState } from "react";

function App() {

  const [term, setTerm] = useState('');
  // const onCreate = ({ parentId, index, type }) => {};
  // const onRename = ({ id, name }) => {};
  // const onMove = ({ dragIds, parentId, index }) => {};
  // const onDelete = ({ ids }) => {};

  /**
   * 필터링
   */
  const onKeywordChangeHandler = (keyWordTarget: string) => {
    setTerm(keyWordTarget);
  }

  return (
    <div>
      찾고자 하는 키워드를 입력하세요 : <input value={term} onChange={(e) => {onKeywordChangeHandler(e.currentTarget.value)}}/>
      <Tree initialData={data}
                searchTerm={term}
                // onCreate={onCreate}
                // onRename={onRename}
                // onMove={onMove}
                // onDelete={onDelete}
                openByDefault={false}
                width={600}
                height={1000}
                indent={24}
                rowHeight={36}
                overscanCount={1}
                paddingTop={30}
                paddingBottom={10}
                padding={25 /* sets both */}>
                  {Node}
                </Tree>

    </div>

  );
}

function Node({ node, style, dragHandle }:any) {


  console.log("node: "+node, "style: "+style," dragHandle: "+dragHandle);
  return(
     <div style={style} ref={dragHandle} onClick={() => {node.toggle()}} >
      <FolderArrow node={node}/>
      {"  "+node.data.name}
      <EditNode/>
    </div>
  );
}

/**
 * element 클릭시
 */
// function onClicked({node}: {node: NodeApi<menuTreeItem>}) {
//   node.toggle();
//   if(node.isOpen) return(

//   );
// }

function FolderArrow({node}: {node: NodeApi<menuTreeItem>}) {
  if(node.isLeaf) return <span></span>;
  return(
    <span>
      {node.isOpen ? <img src={arrow} className="select-box__open" width="24"></img> : <img src={file} className="select-box__close" width="24"></img> }
    </span>
  )
}

function EditNode() {
  //{node} : {node: NodeApi<menuTreeItem>}
  return(
    <span>
      <button>추가</button>
      <button>삭제</button>
    </span>
  );
}


export default App;
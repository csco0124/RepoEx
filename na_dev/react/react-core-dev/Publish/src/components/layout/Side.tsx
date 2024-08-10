import { useState, useRef } from 'react';
import { NodeApi, Tree } from "react-arborist";
import { menuTreeItem } from "./data/MenuTreeItem";
import data1 from "./data/SideData01.json";
import data2 from "./data/SideData02.json";
import "../../resources/css/icon.css";
import { Link } from "react-router-dom";
import React from 'react';
const Side = () => {
    const [term, setTerm] = useState('');
    const [dataRender, setRenderData] = useState<menuTreeItem[]>();
    const tag = useRef<HTMLDivElement | null>(null);
    /**
     * 렌더링 데이터 update
     */
    const updateRenderData = (renderData: any) => {
      if(!renderData) {
        throw new Error("there is no tree");
      }
      setRenderData(renderData);
    }

    const renderNodeClickEvent = (node: any) => {
      
      if(!node.data.url) {
        return node.toggle();
      }
    }

    const customRender = (props: any) => {
      const { node } = props;

      const rowRenderInline = props.attrs;
      console.log("props.node",props);
      

      // debugger;
      props.attrs.style = {
        height: "40px",
      }
      if (node.level === 0) {
        console.log("node",node);
        props.attrs.style = {
          height: "52px",
        }
      }
      
      return(
          <div {...rowRenderInline} onClick={()=>{renderNodeClickEvent(node)}} id={node.data.id} className={`${'depth'+node.level} ${node.isOpen ? "active" : ""}`} >
            { node.level === 0 && node.open() }
            { !node.data.url ? "  " + node.data.name :  <RenderLink node={node}/>}
          </div>
      );
    }

    /**
     * arborist 이슈: lnb메뉴 클릭 불가 해결
     * @param tag 
     */
    const checkDivTagIsNull = ():void => {
      
      if (!tag.current) {
        throw new Error("태그가 없습니다.");
      } else {
        const setUpTag = tag.current.children[0].children[0].children[0] as HTMLDivElement;
        setUpTag.style.display="none";
      }
    }
  
    return (
      <aside className="side">
        <h1 className="logo">hanhwa</h1>
        <strong></strong>
        <button onClick={(e) => {updateRenderData(data1)}} value="adminMng">NEXT LAB 통합관리자</button> 
        <button onClick={(e) => {updateRenderData(data2)}} value="dashBoard">NEXT LAB 대시보드</button>
        <div className="sub-list" ref={tag} onMouseOver={checkDivTagIsNull}>
          <Tree data={dataRender}
                searchTerm={term} 
                renderRow={customRender}
                disableDrop={false}
                openByDefault={false}
                width={319}
                height={1000}
                indent={34}
                rowHeight={40}
                overscanCount={1}
                paddingTop={0}
                paddingBottom={10}
                padding-left={0}
                padding={0 /* sets both */}>
                  {Node}
            </Tree>
        </div> 
      </aside>       
    );
    /**
       * 
       * @param node
       * @param style 
       * @param dragHandle 
       * 실제 노드 데이터 출력 Function
       * @returns 
       */
    function Node({ style, dragHandle }:any) {
        return(
            <div style={style} ref={dragHandle}>
            </div>
        );
    }
    
}


/**
 * 
 * @param node
 * @returns <Link></Link>
 * 링크태그 렌더링 Module
 */
function RenderLink({node}: {node: NodeApi<menuTreeItem>}) {
  if(!!node.data.url){
    return(
      <Link to={node.data.id}>{node.data.name}</Link>
    )
  }else{
    throw new Error("잘못된 요청입니다.");
  }
}
  
export default Side
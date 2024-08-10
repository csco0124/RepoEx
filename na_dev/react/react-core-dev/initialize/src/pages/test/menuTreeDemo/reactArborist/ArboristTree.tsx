import "./css/arborist.css";
import { NodeApi, Tree } from "react-arborist";
import { menuTreeItem } from "./data/dataInterface";
//import data1 from "./data/SideData01.json";
//import data2 from "./data/SideData02.json";
import arrow from "./css/arrow.svg"
import {useState, useRef, useEffect, HTMLAttributes, ElementType} from "react";
import { Link, Outlet } from "react-router-dom";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// 230515 이광희 - convert 예제 데이터 1,2 및 convert 함수 추가
//import title1 from "../../menu-tree/title1.json"; // test json
//import title2 from "../../menu-tree/title2.json"; // test json
import TreeConverter from "../../menu-tree/TreeConverter";
import { NodeModel } from "../../menu-tree/types";
import $api from "../../../../common/CommonAxios";
import * as renderers from "react-arborist/dist/types/renderers";
// ============================================================

function ArboristTree(props: any) {

  const [term, setTerm] = useState('');
  const [dataRender, setRenderData] = useState<menuTreeItem[]>();
  const tag = useRef<HTMLDivElement | null>(null);

  // 230515 이광희 - db 데이터 조회 로직 추가
  const [treeData1, setTreeData1] = useState<NodeModel[]>([]);
  const [treeData2, setTreeData2] = useState<NodeModel[]>([]);
  const [isLoading, setLoading] = useState(true);
  // ======================================

  // 230516 이광희 - ajax 데이터 초기화 로직 추가 ===================================================
  // ajax dummy data 호출
    const getDummyData = async ()  => {
      const data1 = { treeType : 5}
      const data2 = { treeType : 6}      
      await $api.post("/api/tree/get", data1).then(response => {
          try {
              const sortedTreeData = [...JSON.parse(response.data.treeJson)['001']];
              console.log(sortedTreeData);
              sortedTreeData.sort((a, b) => {
              if (a['ord'] && b['ord'] && a['ord'] < b['ord']) return -1;
              if (a['ord'] && b['ord'] && a['ord'] > b['ord']) return 1;
              return 0;
              });
              setTreeData1(sortedTreeData);        
          } catch (error) {
          console.error('JSON 파싱 오류:', error);
          // 에러 처리
          }
      })

      await $api.post("/api/tree/get", data2).then(response => {
          try {
              const sortedTreeData = [...JSON.parse(response.data.treeJson)['002']];
              console.log(sortedTreeData);
              sortedTreeData.sort((a, b) => {
              if (a['ord'] && b['ord'] && a['ord'] < b['ord']) return -1;
              if (a['ord'] && b['ord'] && a['ord'] > b['ord']) return 1;
              return 0;
              });
              setTreeData2(sortedTreeData);
          } catch (error) {
          console.error('JSON 파싱 오류:', error);
          // 에러 처리
          }
      })
      setLoading(false);
  }
  // ajax 데이터 호출
  useEffect(() => {
      getDummyData();
  }, []);

  useEffect(() => {
      updateRenderData(treeData1);
  }, [treeData1]);

  // 230516 =======================================================================================

  /**
   * 필터링
   */
  const onKeywordChangeHandler = (keyWordTarget: string) => {
    setTerm(keyWordTarget);
  }

  /**
   * 렌더링 데이터 update
   */
  const updateRenderData = (renderData: any) => {
    if(!renderData) {
      throw new Error("there is no tree");
    }
    //setRenderData(renderData); TreeConverter
    console.log(renderData);
    setRenderData(TreeConverter(renderData));
  } 

  /**
   * 단일 파일 확장 기능
   */
  const openOneFile = (node: any) => {
    
    node.toggle();

    //현재 클릭한 노드에서 url데이터가 있으면 a태그를 생성해야한다.
    console.log("클릭한 node", node);

    if(!!node.tree.visibleNodes) {
      
      const filterList: [] = node.tree.visibleNodes.filter((entity: any) => {
        return (entity.level == 0) && (entity.id != node.data.id);
      });

      filterList.map((entity: any) => {
        entity.close();
      });
    }
  }

  const renderNodeClickEvent = (node: any) => {
    // debugger;
    console.log("n",node);
    if(!node.data.url) {
      return node.toggle();
    }else{
      return("이동성공");
    }
  }

  if (isLoading) {
      return <div>Loading...</div>;
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

  const customRender = (props: any) => {
    const { node } = props;

    const rowRenderInline = props.attrs;
    console.log("props.node",props);
    

    // debugger;
    props.attrs.style = {
      paddingLeft: `${node.level * 20}px`,
      height: "40px",
    }
    if (node.level === 0) {
      props.attrs.style = {
        height: "100px",
        backgroundColor: "red",
      }
    }
    
    return(
        <div {...rowRenderInline} onClick={()=>{renderNodeClickEvent(node)}} id={node.data.id} className={`${node.isOpen ? "active" : ""} ${'class'+node.level}`}>
          { node.level !== 0 ? <FolderArrow node={node} /> : node.open() }
          { !node.data.url ? "  " + node.data.name :  <RenderLink node={node}/>}
        </div>
      
    );
  }

  return (
    <div>
      찾고자 하는 키워드를 입력하세요 : <input value={term} onChange={(e) => {onKeywordChangeHandler(e.currentTarget.value)}}/>
      <p/>
      <DndProvider backend={HTML5Backend}>
        <div>
          <h4>컨테이너 박스 영역입니다.</h4>
          <p/>
          <hr/>
          <Outlet/>
          <hr/>
        </div>
      </DndProvider>

      <p/>
      {/* <button onClick={(e) => {updateRenderData(data1)}} value="adminMng">NEXT LAB 통합관리자</button> 
      <button onClick={(e) => {updateRenderData(data2)}} value="dashBoard">NEXT LAB 대시보드</button> */}
      <button onClick={(e) => {updateRenderData(treeData1)}} value="adminMng">NEXT LAB 통합관리자</button> 
      <button onClick={(e) => {updateRenderData(treeData2)}} value="dashBoard">NEXT LAB 대시보드</button>
      <br/>
      <br/>
      <div className="sub-list" ref={tag} onMouseOver={checkDivTagIsNull}>
        <Tree data={dataRender}
          searchTerm={term} 
          renderRow={customRender}
          disableDrop={false}
          openByDefault={false}
          width={600}
          height={1000}
          indent={24}
          rowHeight={40}
          overscanCount={1}
          paddingTop={30}
          paddingBottom={10}
          padding={25}>
            {Node}
        </Tree>
      </div>
    </div>
  );

  /**
   * 
   * @param node
   * @param style 
   * @param dragHandle 
   * 실제 노드 데이터 출력 Function
   * @returns 
   */
  function Node({ node, style, dragHandle}:any) {
    
    return(
      <div style={style} ref={dragHandle} >
        {/* { node.level !== 0 ? <FolderArrow node={node} /> : node.open() }
        { !node.data.url ? "  " + node.data.name :  <RenderLink node={node}/>} */}
      </div>
    );
  }
}

/**
 * 
 * @param node
 * 파일 확장시 img데이터 처리
 * @returns 
 */
function FolderArrow({node}: {node: NodeApi<menuTreeItem>}) {
  if(node.isLeaf) return <span></span>;
  return(
    <span>
      {node.isOpen ? <img src={arrow} width="20"></img> : <img src={arrow} className="select-box__close" width="20"></img> }
    </span>
  )
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

export default ArboristTree;
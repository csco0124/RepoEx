import { useState, useRef, useEffect } from 'react';
import { NodeApi, Tree } from "react-arborist";
import { menuTreeItem } from "./data/MenuTreeItem";
import { Link, useLocation } from "react-router-dom";
import $api from '../../common/CommonAxios';
import { NodeModel } from '../pages/exam/menu-tree/types';
import TreeConverter from '../pages/exam/menu-tree/TreeConverter';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { getTreeData, setTreeParentsNodeName, setTreeParentsNodeUrl } from '../../store/LeftTreeReducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import cloneDeep from 'lodash/cloneDeep';
import { equal } from 'assert';
import { isEqual } from 'lodash';
import { left } from '@popperjs/core';
import { isUserLogin } from '../../common/commonUtil';
// @ts-ignore
const Side = () => {
		const leftMenuState = useSelector((state: RootState) => state.leftTree);
		const dispatch = useDispatch();
		const location = useLocation();

    const [dataRender, setRenderData] = useState<menuTreeItem[]>();
    const tag = useRef<HTMLDivElement | null>(null);
    const [renderNode, setRenderNode] = useState<NodeApi>();

    // 230515 이광희 - db 데이터 조회 로직 추가
    const [treeData1, setTreeData1] = useState<NodeModel[]>([]);
    const [treeData2, setTreeData2] = useState<NodeModel[]>([]);
		const [treeData3, setTreeData3] = useState<NodeModel[]>([]);
    const [isLoading, setLoading] = useState(true);

    const [isInitOpen, setIsInitOpen] = useState(true);
  // ======================================

  // ajax 데이터 호출
  useEffect(() => {
		const user = async() => {
			const isUserLoginRes:any = await isUserLogin();
			if("Y" === isUserLoginRes){	// 로그인 성공시
				await dispatch(getTreeData({treeType1:5, treeType2:6, treeType3:7}));
      	dispatch(setTreeParentsNodeUrl({treeUrl: location.pathname}));	
			}
		}
		user();
  }, []);

	useEffect(() => {
    dispatch(setTreeParentsNodeName({treeId: renderNode?.data.id}))
  }, [renderNode]);

  useEffect(()=> {
    dispatch(setTreeParentsNodeUrl({treeUrl: location.pathname}));
  }, [location])
  

  /**
   * header 변경, 화면 진입시 navigation data render
   */
	useEffect(() => {
    const treeType = window.localStorage.getItem("menuTreeType");
		if("5" === treeType){
			updateRenderData(leftMenuState.treeData1);
		} else if ("6" === treeType){
			updateRenderData(leftMenuState.treeData2);
		} else if ("7" === treeType){
			updateRenderData(leftMenuState.treeData3);
		}

	}, [leftMenuState.treeData1, leftMenuState.treeData2,leftMenuState.treeData3, window.localStorage.getItem("menuTreeType")]);

  // 230516 =======================================================================================

    /**
     * 렌더링 데이터 update
     */
    const updateRenderData = (renderData: any) => {
      if(!renderData) {
        throw new Error("there is no tree");
      }
      setRenderData(TreeConverter(renderData));
    }

    /**
     *
     * @param node
     * @returns
     * 메뉴 클릭시 메뉴트리 toggle처리
     */
    const renderNodeClickEvent = (props: any) => {
      const {node} = props;
      setRenderNode(node);
      node.toggle();
    }


    /**
     * 클래스 활성화
     * @param node 
     * @returns 
     */
    const renderClass = (node: any) => {
      if(node){
        // 첫 화면 진입시 현재 url에 대한 변화가 없으므로 체크
        var renderArray = [];
        renderArray = leftMenuState.urlTextArray;

        if(leftMenuState.textArray.length > 0){
          renderArray = (leftMenuState.textArray);
        }
        if(renderArray.includes(node.data.id)){  //세부 메뉴
          if(isInitOpen) {
            useEffect(() => {
              node.open();
              setIsInitOpen(false);
            }, []);
          }
          return "active on";
        }else{  // 중메뉴
          if(renderNode){
            document.getElementById(renderNode.id)?.classList.add("active","on");
          }
        }
      }
    }


    /**
     *
     * @param props
     * @returns
     * 메뉴트리 렌더링시 커스텀화
     */
    const customRender = (props: any) => {
      const { node } = props;
      const rowRenderInline = { ...props.attrs };
      rowRenderInline.style = {
        height: "40px",
      }
      if (node.level === 0) {
        rowRenderInline.style = {
          height: "52px",
        }
        useEffect(() => {
          node.open();
        }, []);
      }
      return(
          <div
          {...rowRenderInline}
          onClick={()=>{renderNodeClickEvent(props)}}
          id={node.data.id}
          className={ node && `${'depth'+node.level} ${renderClass(node)}`}
          >
            <Icon node={node}/>
            { !node.data.url ? node.data.name : <RenderLink node={node}/> }
          </div>
      );
    }

    return (
      <aside className="side">
        <Link to="/"><h1 className="logo">Narui</h1></Link><br/>
        <strong></strong>
        <DndProvider backend={HTML5Backend}>
          <div className="sub-list" ref={tag}>
            <Tree data={dataRender}
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
        </DndProvider>
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
    function Node() {
        return(
            <></>
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
      <Link to={node.data.url}>{node.data.name}</Link>
    )
  }else{
    throw new Error("잘못된 요청입니다.");
  }
}


function Icon({node}: {node: NodeApi<menuTreeItem>}) {
  if(node.level === 1 && node.data.icon != undefined){
    return(
      <i className={node.data.icon}></i>
    )
  } else {
    return (<></>)
  }
}

export default Side;
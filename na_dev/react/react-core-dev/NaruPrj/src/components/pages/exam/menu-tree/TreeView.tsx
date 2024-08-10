import React, { Fragment, useState, useRef, useEffect, useContext, forwardRef, useImperativeHandle } from "react";
import { NodeModel } from "./types";
import { CustomNode } from "./CustomNode";
import { CustomDragPreview } from "./CustomDragPreview";
import  AddDialog  from "./AddDialog";
//import { MultipleDragPreview } from "./MultipleDragPreview";
import {
  Tree,
  TreeMethods,
  DragLayerMonitorProps,
  getDescendants,
  getBackendOptions,
  DropOptions,
  MultiBackend,
  isAncestor
} from "@minoru/react-dnd-treeview";
import { DndProvider } from "react-dnd";
import styles from "./App.module.css";
import $api from "../../../../common/CommonAxios";
import { debounce } from 'lodash';
import RootNodeButton from "./menu-button/RootNodeButton";
import { RootTree } from "./menu-button/RootNodeButton";
import { useDispatch } from "react-redux";
import { getTreeData } from "../../../../store/LeftTreeReducer";
import { ChildContext } from "../../AdminMenuMgt";
import alertContext from "../../../../store/alert-context";
import confirmContext from "../../../../store/confirm-context";
import { Placeholder } from "./Placeholder";


// 230608_ 3depth관련 변경점1
function getMaxDepth(node: NodeModel, data: NodeModel[], currentDepth: number): number {
    let maxDepth = currentDepth;
    for (const item of data) {
      if (item.parent === node.id) {
        const depth = getMaxDepth(item, data, currentDepth + 1);
        maxDepth = Math.max(maxDepth, depth);
      }
    }
    return maxDepth;
  }

// 230608_ 3depth관련 변경점2
function calculateMaxDepth(data: NodeModel[]): number {
let maxDepth = 0;
for (const node of data) {
    if (node.parent === 0) {
    const depth = getMaxDepth(node, data, 1);
    maxDepth = Math.max(maxDepth, depth);
    }
}
return maxDepth;
}
  
const TreeView = forwardRef(({}, childRef) => {
    const ref = useRef<TreeMethods>(null);
    const TreeRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef(null);

	const dispatch = useDispatch();
    const commAlert = useContext(alertContext);

    const [treeData, setTreeData] = useState<NodeModel[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [text, setText] = useState<string>("");
    const [isDragging, setIsDragging] = useState(false);
    const [isCtrlPressing, setIsCtrlPressing] = useState(false);
    const [selectedNodes, setSelectedNodes] = useState<NodeModel[]>([]);
    const [selectedRootParent, setSelectedRootParent] = useState<RootTree>();
    const [show, setShow ] = useState(false);
    //const [editOrdMode, setEditOrdMode] = useState(false);
    const commConfirm = useContext(confirmContext);
    
    // TODO : 리덕스 동적으로 추가되게 로직 변경시 같이 수정예정.
    const ancestors = new Set(); // 중복된 값을 방지하기 위해 Set 객체를 사용
    const [tabId, setTabId] = useState('003'); 
    let rootParentArray = [
        {
            id : "003",
            parent: 0,
            text : "DEMO"
        }
    ]

    useImperativeHandle(childRef, () => ({
        setDummyData,
    }));

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === "escape") setSelectedNodes([]); 
            else if (e.ctrlKey || e.metaKey) setIsCtrlPressing(true);
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === "control" || e.key.toLowerCase() === "meta") setIsCtrlPressing(false);
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    useEffect(() => { 
        // ajax 호출
        if(selectedRootParent == undefined) {
            setSelectedRootParent(rootParentArray[0]);
            handleCloseAll();
            getDummyData(rootParentArray[0]);
            
        }else {
            handleCloseAll();
            getDummyData(selectedRootParent);
        }
    }, [selectedRootParent]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (TreeRef.current && !TreeRef.current.contains(e.target as Node)) setSelectedNodes([]);
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [TreeRef]);

    useEffect(() => {
        if(text) setTimeout(handleOpenSpecified, 500);
    }, [text]);

    useEffect(() => {
        // 230608_ 3depth관련 변경점3
        const maxDepth = calculateMaxDepth(treeData);
        
        if(maxDepth < 4) {
            const openMenuList = concatenateIds(treeData); 
            setTimeout(()=>{
                handleOpenDepthOne(openMenuList);
            }, 200);
        } else {
            commAlert.call('메뉴는 4depth 이상의 깊이를 가질 수 없습니다.')
            resetTreeData();
        }
    }, [treeData]);

    const handleRootParentData = (rootParent: RootTree ) => {
        setTabId(rootParent.id);
        setSelectedRootParent(rootParent);
    }
    
    const handleShow = () => {
        setShow(true);
    };

    const getAncestors = (data: any, id: string) => {
        const parent = data.find((item: any) => item.id === id).parent;
        if (parent === 0) {
						ancestors.add(id); // 최상위 조상에 도달하면 Set 객체에 id를 추가
				} else {
          	ancestors.add(id);
          	getAncestors(data, parent); // 부모 객체를 기준으로 다시 탐색
        } 
    }

    const handleChangeSearch = debounce((e: React.ChangeEvent<HTMLInputElement>, paramTreeData:NodeModel[] ) => { 
        let searchIdText = "";
        handleCloseAll();
        ancestors.clear();

        for (let menu of paramTreeData) {
            if (menu.text.trim().toLowerCase().includes(e.target.value.trim().toLowerCase())) getAncestors(paramTreeData, String(menu.id));
        }
        if (!e.target.value.trim()) searchIdText = "";
        else {
            searchIdText = Array.from(ancestors).join(',');
            if (text == searchIdText) setTimeout(handleOpenSpecified, 400);
            else setText(searchIdText);
        }
    }, 200);
    const [isLoading, setLoading] = useState(true);

    // ajax dummy data 호출
    // TODO : 리덕스 동적으로 추가되게 로직 변경시 같이 수정예정.
    const getDummyData = async (rootId: RootTree)  => {
        handleReset();
        const data = {
            //treeType : (rootId.id == '002') ? 6 : (rootId.id == '001') ? 5 : 7,
						treeType : 7,
        }
        await $api.post("/api/tree/get", data).then(response => {
            //console.log(response);
            try {
                const sortedTreeData = [...JSON.parse(response.data.treeJson)[rootId.id]];
                sortedTreeData.sort((a, b) => {
                    if (a['ord'] && b['ord'] && a['ord'] < b['ord']) return -1;
                    if (a['ord'] && b['ord'] && a['ord'] > b['ord']) return 1;
                    return 0;
                });
                setTreeData(sortedTreeData);
                setLoading(false);
            } catch (error) {
                console.error('JSON 파싱 오류:', error);
                // 에러 처리
            }
        })
    }

    const resetTreeData = () => {
        if(selectedRootParent == undefined) getDummyData(rootParentArray[0]);
        else getDummyData(selectedRootParent); 
    }

    // TODO : 리덕스 동적으로 추가되게 로직 변경시 같이 수정예정.
    const setDummyData = () => {
        if(selectedRootParent == undefined)  return;
        const treeParam = {
            [selectedRootParent.id] : treeData
        }
        const data = {
            treeJson : JSON.stringify(treeParam),
            //treeType : (selectedRootParent.id == '002') ? 6 : (selectedRootParent.id == '001') ? 5 : 7,
						treeType : 7,
            delYn : 'N'
        }

        $api.post("/api/tree/update", data).then(response => {
            commAlert.call('메뉴 수정이 완료되었습니다.')
            getDummyData(selectedRootParent);
            dispatch(getTreeData({treeType3:7}));
        })
    }

    const concatenateIds = (data:NodeModel[]) => {
        const parentZeroIds = data
          .filter(item => item.parent === 0)
          .map(item => item.id);
      
        return parentZeroIds.join(",");
    }

    const handleSingleSelect = (node: NodeModel) => {
        setSelectedNodes([node]);
    };

    const handleMultiSelect = (clickedNode: NodeModel) => {
        const selectedIds = selectedNodes.map((n) => n.id);

        // ignore if the clicked node is already selected
        if (selectedIds.includes(clickedNode.id)) return;

        // ignore if ancestor node already selected
        if (selectedIds.some((selectedId) => isAncestor(treeData, selectedId, clickedNode.id))) return;

        let updateNodes = [...selectedNodes];

        // if descendant nodes already selected, remove them
        updateNodes = updateNodes.filter((selectedNode) => {
            return !isAncestor(treeData, clickedNode.id, selectedNode.id);
        });

        updateNodes = [...updateNodes, clickedNode];
        setSelectedNodes(updateNodes);
    };

    const handleClick = (
        e: React.MouseEvent,
        node: NodeModel
    ) => {
        if (e.ctrlKey || e.metaKey) handleMultiSelect(node);
        else handleSingleSelect(node);
    };

    const handleDragStart = (node: NodeModel) => {
        const isSelectedNode = selectedNodes.some((n) => n.id === node.id);
        setIsDragging(true);

        if (!isCtrlPressing && isSelectedNode) return;

        if (!isCtrlPressing) {
            setSelectedNodes([node]);
            return;
        }

        if (!selectedNodes.some((n) => n.id === node.id)) setSelectedNodes([...selectedNodes, node]);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
        setIsCtrlPressing(false);
        setSelectedNodes([]);
    };

    const handleDrop = (
        newTree: NodeModel[],
        options: DropOptions
    ) => {
        const { dropTargetId } = options;

        setTreeData(
            newTree.map((node) => {
                if (selectedNodes.some((selectedNode) => selectedNode.id === node.id)) {
                    return {
                        ...node,
                        parent: dropTargetId 
                    };
                }
                return node;
            })
        );
        setSelectedNodes([]);
    };

    const handleTextChange = (id: NodeModel["id"], value: string) => {
        const newTree = treeData.map((node) => {
            if (node.id === id) {
                return {
                    ...node,
                    text: value
                };
            }
            return node;
        });
        setTreeData(newTree);
    };

    const handleIconChange = (id: NodeModel["id"], value: string) => {
        const newTree = treeData.map((node) => {
            if (node.id === id) {
                return {
                    ...node,
                    icon: value
                };
            }
            return node;
        });
        setTreeData(newTree);
    };

    const handleNodeChange = (id: NodeModel["id"], value: NodeModel) => {
        const newTree = treeData.map((node) => {
            if (node.id === id) {
                return {
                ...node,
                text: value.text,
                url: value.url != undefined ? value.url : '',
                path: value.path,
                icon: value.icon
                };
            }
            return node;
        });
        setTreeData(newTree);
    };

    const getIds = (text: string) => {
        let idTexts = text.split(",").map((id) => id.trim());
        idTexts = idTexts.filter((id) => id !== "");
        let ids = idTexts.map((id) => id);
        ids = ids.filter((id) => id);
        return ids;
    };

    const handleOpenAll = () => ref.current?.openAll();
    const handleCloseAll = () => ref.current?.closeAll();
    const handleOpenDepthOne = (menuText:string) => ref.current?.open(getIds(menuText));
    const handleOpenSpecified = () => ref.current?.open(getIds(text));

    const handleDelete = (id: NodeModel["id"]) => {
        const handleDeleteMenu = () => {
            const deleteIds = [
                id,
                ...getDescendants(treeData, id).map((node) => node.id)
            ];
            const newTree = treeData.filter((node) => !deleteIds.includes(node.id));
            setTreeData(newTree);
        }
        
        // 1. id넣으면 해당 메뉴 이름 text 알아내기
        // 2. 해당 메뉴의 하위 메뉴가 있는지, 몇개가 있는지 검사.

        commConfirm.call({
            message: '해당 메뉴를 삭제 하시겠습니까?', // 메시지 [필수 파라미터]
            onConfirm: handleDeleteMenu, // 확인했을 경우 실행할 함수
            yesText: '예', //yes버튼 문구 기본 값 확인
            noText: '아니오', //no버튼 문구 기본 값 취소
        });
    };

    const handleSubmit = (newNode: NodeModel) => {
        setTreeData([ ...treeData, {...newNode,} ]);
        setOpen(false);
    };

    const handleReset = () => {
        if (inputRef.current) (inputRef.current as HTMLInputElement).value = '';
    };

    // const handleOrdMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setEditOrdMode(e.target.checked);
    // }

    const ordUpSubmit = (id: NodeModel["id"]) => {
        const currentNode = treeData.find((node) => node.id === id);
        const filteredNodes = currentNode ? treeData.filter((node) => node.parent === currentNode.parent) : [];
      
        if (filteredNodes.length > 1) {
          const currentIndex = filteredNodes.findIndex((node) => node.id === id);
          const prevIndex = (currentIndex - 1 + filteredNodes.length) % filteredNodes.length; // 이전 인덱스를 가져오기 위해 현재 인덱스에서 1을 빼고, 배열 길이로 나눈 나머지 값을 사용합니다.
      
          const newTree = [...treeData];
          const currentNode = filteredNodes[currentIndex];
          const prevNode = filteredNodes[prevIndex];
      
          newTree.splice(treeData.indexOf(currentNode), 1); // 현재 노드를 배열에서 제거합니다.
          newTree.splice(treeData.indexOf(prevNode), 0, currentNode); // 이전 노드의 위치에 현재 노드를 삽입합니다.
      
          setTreeData(newTree);
        }
    };
      const ordDownSubmit = (id: NodeModel["id"]) => {
        const currentNode = treeData.find((node) => node.id === id);
        const filteredNodes = currentNode ? treeData.filter((node) => node.parent === currentNode.parent) : [];
        
        if (filteredNodes.length > 1) {
          const currentIndex = filteredNodes.findIndex((node) => node.id === id);
          const nextIndex = (currentIndex + 1) % filteredNodes.length; // 다음 인덱스를 가져오기 위해 현재 인덱스에서 1을 더하고, 배열 길이로 나눈 나머지 값을 사용합니다.
      
          const newTree = [...treeData];
          const currentNode = filteredNodes[currentIndex];
          const nextNode = filteredNodes[nextIndex];
      
          newTree.splice(treeData.indexOf(currentNode), 1); // 현재 노드를 배열에서 제거합니다.
          newTree.splice(treeData.indexOf(nextNode), 0, currentNode); // 다음 노드의 위치에 현재 노드를 삽입합니다.
      
          setTreeData(newTree);
        }
    };
    
    if (isLoading) return <div>Loading...</div>;

    return (
        <Fragment>
            <DndProvider backend={MultiBackend} options={getBackendOptions()}>
                <div className="title-item pd20">
                    <div>
                        <input
                        id="searchMenu"
                        className={styles.treeInput}
                        placeholder="검색할 메뉴 제목을 입력해주세요."
                        onChange={(e) => handleChangeSearch(e, treeData)}
                        ref={inputRef}
                        />
                    </div>
                    <div>
                        <div className="searchItem">
                            <div>
                                <button type="button" className="btn-icon" onClick={handleOpenAll}>
                                    <i className="icon-icon18" data-bs-toggle="tooltip" data-bs-html="true" title="모두열기"></i>
                                    <span>모두열기</span>
                                </button>         
                            </div>
                            <div>
                                <button type="button" className="btn-icon" onClick={handleCloseAll}>
                                    <i className="icon-icon17" data-bs-toggle="tooltip" data-bs-html="true" title="모두닫기"></i>
                                    <span>모두닫기</span>
                                </button>
                            </div>
                            <div>
                                <button type="button" className="btn-icon" onClick={resetTreeData}>
                                    <i className="icon-icon19" data-bs-toggle="tooltip" data-bs-html="true" title="리셋"></i>
                                    <span>리셋</span>
                                </button>
                            </div>
                            <div>
                                <button type="button" className="btn-icon" onClick={handleShow}>
                                    <i className="icon-icon20" data-bs-toggle="tooltip" data-bs-html="true" title="등록"></i>
                                    <span>등록</span>
                                </button>
                            </div>
                            {show && (
                                <ChildContext.Provider value={{ show, setShow }}>
                                    <AddDialog tree={treeData} onSubmit={handleSubmit} />
                                </ChildContext.Provider>
                            )}
                        </div>
                    </div>
                </div>
                <div className={styles.app}>
                    <ul className={styles.tabNav} data-tab="tab01" role="tablist" style={{ display: 'flex' }}>
                        {rootParentArray.map((rootItem, index) => (
                            <RootNodeButton key={index} childTree={rootItem} tabId={tabId} onClick={handleRootParentData}/>
                        ))}
                        {/* <li style={{ marginLeft: 'auto' }}>
                            <div className="form-check form-switch">
                            <label className="form-check-label">
                                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={handleOrdMode}/>순서 변경
                            </label>
                            </div>
                        </li> */}
                    </ul>
                    <div className={styles.current}>
                        <div ref={TreeRef}>
                            <Tree
                                ref={ref}
                                tree={treeData}
                                rootId={0}
                                render={(node, options) => {
                                    const selected = selectedNodes.some((selectedNode) => selectedNode.id === node.id);
                                    return (
                                        <Fragment>
                                            <ChildContext.Provider value={{ show, setShow }}>
                                                <CustomNode
                                                    node={node as NodeModel}
                                                    nodeList={treeData}
                                                    {...options}
                                                    onClick={handleClick}                       
                                                    isSelected={selected}                      
                                                    onDelete={handleDelete}
                                                    isDragging={selected && isDragging}
                                                    onTextChange={handleTextChange}
                                                    onIconChange={handleIconChange}
                                                    isCtrlPressing={isCtrlPressing}
                                                    handleSubmit={handleSubmit}
                                                    handleNodeChange={handleNodeChange}
                                                    // editOrdMode={editOrdMode}
                                                    // ordUpSubmit={ordUpSubmit}
                                                    // ordDownSubmit={ordDownSubmit}
                                                />
                                            </ChildContext.Provider>      
                                        </Fragment>
                                    );
                                }}
                                sort={false}
                                enableAnimateExpand={true}
                                dragPreviewRender={(monitorProps: DragLayerMonitorProps<any>) => {
                                    //if (selectedNodes.length > 1) return <MultipleDragPreview dragSources={selectedNodes} />;
                                    return <CustomDragPreview monitorProps={monitorProps} />;
                                }}
                                onDrop={(newTree, options) => handleDrop(newTree as NodeModel[], options as DropOptions)}
                                onDragStart={(node) => handleDragStart(node as NodeModel)}
                                onDragEnd={handleDragEnd}
                                canDrop={(treeData, options) => {
                                    //if (selectedNodes.some((selectedNode) => selectedNode.id === options.dropTargetId)) return false;
                                    if (options.dragSource?.parent === options.dropTargetId) return true;
                                    //else if (selectedNodes.some((selectedNode) => selectedNode.id === options.dropTargetId)) return false;
                                }}
                                insertDroppableFirst={true}
                                dropTargetOffset={10}
                                placeholderRender={(node, { depth }) => (
                                    <Placeholder node={node} depth={depth + 1} />
                                )}
                                classes={{
                                    root: styles.treeRoot,
                                    draggingSource: styles.draggingSource,
                                    placeholder: styles.placeholderContainer,
                                    dropTarget: styles.dropTarget
                                }}
                            />
                        </div> 
                    </div>
                </div>
            </DndProvider>      
        </Fragment>    
    )
});

export default TreeView

// 230425 - 이광희
// 참조 사이트 : https://minop1205.github.io/react-dnd-treeview/?path=/docs/basic-examples-multiple-selections--multiple-selections-story
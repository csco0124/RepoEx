import React, {Fragment, useState, useRef, useEffect} from "react";
import {Link} from "react-router-dom";
import { NodeModel, CustomData } from "./types";
import { CustomNode } from "./CustomNode";
import {CustomDragPreview} from "./CustomDragPreview";
import  AddDialog  from "./AddDialog";
import { MultipleDragPreview } from "./MultipleDragPreview";
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
// mocha api 24시간에 1000번만 호출가능, 막히면 더미데이터로 호출하게 위 코드 주석하고 주석 풀어서 사용
//import SampleData from "./prd-default.json";
import $api from "../../../common/CommonAxios";
import { debounce } from 'lodash';
import RootNodeButton from "./menu-button/RootNodeButton";
import { RootTree } from "./menu-button/RootNodeButton";

// const getLastId = (treeData: NodeModel[]) => {
//   const reversedArray = [...treeData].sort((a, b) => {
//     if (a.id < b.id) {
//       return 1;
//     } else if (a.id > b.id) {
//       return -1;
//     }

//     return 0;
//   });

//   if (reversedArray.length > 0) {
//     return reversedArray[0].id;
//   }

//   return 0;
// };

const TreeVeiw = () => {
    const [treeData, setTreeData] = useState<NodeModel[]>([]);
    const inputRef = useRef(null);
    //console.log(SampleData);
    //const handleDrop = (newTree: NodeModel[]) => setTreeData(newTree);
    const [open, setOpen] = useState<boolean>(false);
    const [text, setText] = useState<string>("");
    const ref = useRef<TreeMethods>(null);
    const TreeRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isCtrlPressing, setIsCtrlPressing] = useState(false);
    const [selectedNodes, setSelectedNodes] = useState<
        NodeModel<CustomData>[]
    >([]);
    const [selectedNode, setSelectedNode] = useState<NodeModel>();
    const handleSelect = (node: NodeModel<CustomData>) => setSelectedNode(node);
    const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };
    //const [rootParentArray, setRootParentArray] = useState([]);
    const [selectedRootParent, setSelectedRootParent] = useState<RootTree>();
    const ancestors = new Set(); // 중복된 값을 방지하기 위해 Set 객체를 사용
    const handleRootParentData = (rootParent: RootTree ) => {
        setSelectedRootParent(rootParent);
    }
    let rootParentArray = [
        {
            id : "001",
            parent:0,
            text : "NEXT LAB 통합관리자"
        },
        {
            id : "002",
            parent: 0,
            text : "NEXT LAB 대시보드"
        }
    ]

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
            if (menu.text.trim().toLowerCase().includes(e.target.value.trim().toLowerCase())) {
                getAncestors(paramTreeData, menu.id);
            }
        }
        if (!e.target.value.trim()) {
            searchIdText = "";
        } else {
            searchIdText = Array.from(ancestors).join(',');
            if (text == searchIdText) {
                setTimeout(handleOpenSpecified, 500);
            } else {
                setText(searchIdText);
            }
        }
    }, 300);
    const [isLoading, setLoading] = useState(true);

    // ajax dummy data 호출
    const getDummyData = (rootId: RootTree)  => {
        handleReset();
        // https://apimocha.com/treeveiw/test2 mocha api 주소, , { withCredentials: false, } 속성 추가 해야함.
        const data = {
            treeType : (rootId.id == '002') ? 6 : 5,
        }     
        $api.post("/api/tree/get", data).then(response => {
            //console.log("mocha ajax data : ", response.data);
            try {
                const sortedTreeData = [...JSON.parse(response.data.treeJson)[rootId.id]];
                console.log(sortedTreeData);
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
        // mocha api 24시간에 1000번만 호출가능, 막히면 더미데이터로 호출하게 위 코드 주석하고 주석 풀어서 사용
        //setTreeData(SampleData);
        //setLoading(false);
    }

    const resetTreeData = () => {
        if(selectedRootParent == undefined) {
            getDummyData(rootParentArray[0]);
        }else {
            getDummyData(selectedRootParent);
        } 
    }

    const setDummyData = () => {
        // mocha 사용하려면 , { withCredentials: false, } 매개변수에 추가.
        if(selectedRootParent == undefined) {
            return;
        }
        const treeParam = {
            [selectedRootParent.id] : treeData
        }
        const data = {
            treeJson : JSON.stringify(treeParam),
            treeType : (selectedRootParent.id == '002') ? 6 : 5,
            delYn : 'N'
        }

        $api.post("/api/tree/update", data).then(response => {
            //console.log("mocha ajax data : ", response.data);
            alert('dummyData set!!');
            getDummyData(selectedRootParent);
        })
    }

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
            if (TreeRef.current && !TreeRef.current.contains(e.target as Node)) {
                //console.log('Clicked outside!');
                setSelectedNodes([]);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [TreeRef]);

    useEffect(() => {
        if(text) {
            setTimeout(handleOpenSpecified, 500);
        }
    }, [text]);

    useEffect(() => {

        const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key.toLowerCase() === "escape") {
            setSelectedNodes([]);
        } else if (e.ctrlKey || e.metaKey) {
            setIsCtrlPressing(true);
        }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
        if (e.key.toLowerCase() === "control" || e.key.toLowerCase() === "meta") {
            setIsCtrlPressing(false);
        }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    const handleSingleSelect = (node: NodeModel<CustomData>) => {
        setSelectedNodes([node]);
    };

    const handleMultiSelect = (clickedNode: NodeModel<CustomData>) => {
        const selectedIds = selectedNodes.map((n) => n.id);

        // ignore if the clicked node is already selected
        if (selectedIds.includes(clickedNode.id)) {
        return;
        }

        // ignore if ancestor node already selected
        if (
        selectedIds.some((selectedId) =>
            isAncestor(treeData, selectedId, clickedNode.id)
        )
        ) {
        return;
        }

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
        node: NodeModel<CustomData>
    ) => {
        if (e.ctrlKey || e.metaKey) {
            handleMultiSelect(node);
        } else {
            handleSingleSelect(node);
        }
    };

    const handleDragStart = (node: NodeModel<CustomData>) => {
        const isSelectedNode = selectedNodes.some((n) => n.id === node.id);
        setIsDragging(true);

        if (!isCtrlPressing && isSelectedNode) {
        return;
        }

        if (!isCtrlPressing) {
        setSelectedNodes([node]);
        return;
        }

        if (!selectedNodes.some((n) => n.id === node.id)) {
        setSelectedNodes([...selectedNodes, node]);
        }
    };

    const handleDragEnd = () => {
        setIsDragging(false);
        setIsCtrlPressing(false);
        setSelectedNodes([]);
    };

    const handleDrop = (
        newTree: NodeModel<CustomData>[],
        options: DropOptions<CustomData>
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

    const getIds = (text: string) => {
        let idTexts = text.split(",").map((id) => id.trim());
        idTexts = idTexts.filter((id) => id !== "");
        let ids = idTexts.map((id) => id);
        ids = ids.filter((id) => id);
        return ids;
    };

    const handleOpenAll = () => ref.current?.openAll();
    const handleCloseAll = () => ref.current?.closeAll();
    const handleOpenSpecified = () => ref.current?.open(getIds(text));
    const handleCloseSpecified = () => ref.current?.close(getIds(text));

    const handleDelete = (id: NodeModel["id"]) => {
    const deleteIds = [
      id,
      ...getDescendants(treeData, id).map((node) => node.id)
    ];
    const newTree = treeData.filter((node) => !deleteIds.includes(node.id));
        //console.log('newTree',newTree);
        setTreeData(newTree);
    };

    const handleSubmit = (newNode: NodeModel) => {
        //const lastId = Number(getLastId(treeData)) + 1;
        setTreeData([ ...treeData, {...newNode,} ]);
        console.log(newNode);
        setOpen(false);
    };

    const handleReset = () => {
        if (inputRef.current) {
            (inputRef.current as HTMLInputElement).value = '';
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    // 230516 - 할일 목록
    // 1. id값 하드코딩 컴포넌트 이름으로 전부 변경할것.
    // 2. 메인 메뉴는 데이터에서 제외할 것. 
    // 3. 노드 추가하는 부분에 id값 입력하는 로직 추가.
    // 4. submit부분에서 id값 number + 1 하는 부분 입력값으로 처리하게 수정.

    return (
        <Fragment>
            <h2>Menu Tree!!</h2>
            <Link to="/test"><button style={{marginBottom:"20px"}}>Sample/Test 홈으로...</button></Link>
            <br/>
            <hr />
            <h3>React-dnd-treeview</h3>
            <DndProvider backend={MultiBackend} options={getBackendOptions()}>
                <div className={styles.app}>
                    <div className={styles.actions}>
                        <div className="d-grid gap-2 col-6 mx-auto">
                            <button className="btn btn-outline-secondary btn-sm" onClick={handleOpenAll}>
                                Open All
                            </button>
                            <button className="btn btn-outline-secondary btn-sm" onClick={handleCloseAll}>
                                Close All
                            </button>
                        </div>
                        <AddDialog
                            tree={treeData}
                            onSubmit={handleSubmit}
                        />    
                    </div>
                    <div className={styles.actions}>
                        <input type="hidden"
                        className="form-control form-control-sm"
                        placeholder="e.g. 1, 4, 5"
                        onChange={handleChangeText}
                        />
                        {/* <div className="d-grid gap-2 col-6 mx-auto">
                            <button className="btn btn-outline-secondary btn-sm" onClick={handleOpenSpecified}>
                                Open use ID(s)
                            </button>
                            <button className="btn btn-outline-secondary btn-sm" onClick={handleCloseSpecified}>
                                Close use ID(s)
                            </button>
                        </div> */}
                    </div>{" "}
                    <div className={styles.current}>
                    <hr/>
                    <div className={styles.actions}>
                        <input
                        className="form-control form-control-sm"
                        placeholder="검색할 메뉴 제목을 입력해주세요."
                        onChange={(e) => handleChangeSearch(e, treeData)}
                        ref={inputRef}
                        />
                    </div>
                    <hr/>
                    <h4>Menu Tree Demo</h4>
                    {rootParentArray.map((rootItem, index) => (
                        <RootNodeButton key={index} childTree={rootItem} onClick={handleRootParentData}/>
                    ))}
                </div>
                <div ref={TreeRef}>
                <Tree
                    ref={ref}
                    tree={treeData}
                    rootId={0}
                    render={(node, options) => {
                    const selected = selectedNodes.some(
                        (selectedNode) => selectedNode.id === node.id
                    );

                    return (
                        <CustomNode
                        node={node as NodeModel<CustomData>}
                        nodeList={treeData}
                        {...options}
                        onClick={handleClick}                       
                        isSelected={selected}                      
                        onDelete={handleDelete}
                        isDragging={selected && isDragging}
                        onTextChange={handleTextChange}
                        />
                    );
                    }}
                    sort={false}
                    enableAnimateExpand={true}
                    dragPreviewRender={(
                    monitorProps: DragLayerMonitorProps<any>
                    ) => {
                    if (selectedNodes.length > 1) {
                        return <MultipleDragPreview dragSources={selectedNodes} />;
                    }

                    return <CustomDragPreview monitorProps={monitorProps} />;
                    }}
                    onDrop={(newTree, options) => handleDrop(newTree as NodeModel<CustomData>[], options as DropOptions<CustomData>)}
                    onDragStart={(node) => handleDragStart(node as NodeModel<CustomData>)}
                    onDragEnd={handleDragEnd}
                    canDrop={(tree, options) => {
                    if (
                        selectedNodes.some(
                        (selectedNode) => selectedNode.id === options.dropTargetId
                        )
                    ) {
                        return false;
                    }
                    }}
                    classes={{
                    root: styles.treeRoot,
                    draggingSource: styles.draggingSource,
                    dropTarget: styles.dropTarget
                    }}
                />
                </div>
                </div>
            </DndProvider>
            <hr />
            <h2>Get & Set ajax Data test</h2>
            <br />
            <button className="btn btn-outline-secondary btn-sm me-2" onClick={resetTreeData}>되돌리기</button>
            <button className="btn btn-outline-secondary btn-sm" onClick={setDummyData}>수정완료</button>        
        </Fragment>    
    )
}

export default TreeVeiw

// 230425 - 이광희
// 참조 사이트 : https://minop1205.github.io/react-dnd-treeview/?path=/docs/basic-examples-multiple-selections--multiple-selections-story
// 체크박스 생성해서 다중 선택하는 기능 있음 - 230425 확인

// TODO : node edit 가능한 로직 있음 - 230425 확인
// 토글버튼 이용해서 편집모드 추가 개발 필요.

/*  
    TODO 230502 - 추가 작업 내용 정리

    서버 호출 - 비동기 - 저장api 호출, 응답 후 액션 등
    서버랑 피드백을 하는 상황에서 테스트 필요.
    api 자체 호출을 더미로 하더라도 서버단에서 선언해놓고 비동기로 호출 해서 가져와서 뿌려주게 변경
    실패했을때 예외처리 등도 추가 작업 필요.

*/
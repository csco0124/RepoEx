import { NodeModel } from "./types";
import React, { useState, Fragment, useContext, useEffect } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { ChildContext } from "../../AdminMenuMgt";
import useModals from "../../../../common/useModal";
import { commModal, MODAL_SIZE } from "../../CommModal";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import alertContext from "../../../../store/alert-context";
import styles from "../menu-tree/AddDialog.module.css";

interface Props {
  node?: NodeModel,
  showModal?: boolean;
  tree: NodeModel[];
  onSubmit: (e: NodeModel) => void;
  handleNodeChange?: (id: NodeModel["id"], value: NodeModel) => void;
  setIcon?: (icon: string) => void;
};

const AddDialog = (props: Props) => {
  const { show, setShow } = useContext(ChildContext);
  const { openModal } = useModals();

  const [text, setText] = useState("");
  const [id, setId] = useState("");
  const [url, setUrl] = useState("");
  const [path, setPath] = useState("");
  const [parent, setParent] = useState<string | number>(0);
  const [droppable, setDroppable] = useState(true); 
  const [icon, setIcon] = useState('');
  const testState = useSelector((state: RootState) => state.leftTree);
  const [isDuplicatedId, setIsDuplicatedId] = useState(false);
  const commAlert = useContext(alertContext);
  const [isMiddleMenu, setIsMiddleMenu] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if(props.node != undefined) {
      setText(props.node.text);
      setId(String(props.node.id));
      setPath(String(props.node.path));
      setParent(props.node.parent);
      setUrl(props.node.url != undefined? props.node.url : '');
      setTitle(props.node.text);
    } else setTitle('메뉴 추가');
    if(props.showModal == true) {
      setShow(true);
    }
  }, []);

  // TODO : 리덕스 동적으로 추가되게 변경되면 수정 예정.
  useEffect(() => {
    setIsDuplicatedId(false);
    for (const myTree of props.tree as NodeModel[]) {
      if (myTree.id === id) {
        setIsDuplicatedId(true);
      }
    }

    for (const myTree of testState.treeData1 as NodeModel[]) {
        if (myTree.id === id) {
          setIsDuplicatedId(true);
        }
    }
    for (const myTree of testState.treeData2 as NodeModel[]) {
        if (myTree.id === id) {
          setIsDuplicatedId(true);
        }
    }
    for (const myTree of testState.treeData3 as NodeModel[]) {
        if (myTree.id === id) {
          setIsDuplicatedId(true);
        }
    }
  }, [testState.treeData1, id]);

  useEffect(() => {
    if(props.node?.icon != undefined) {
      setIcon(props.node.icon != undefined? props.node.icon : '');
    }else {
      setIcon("");
    }
    setIsMiddleMenu(props.tree.some((node) => node.id === parent && node.parent === 0));
    if(props.tree.some((node) => node.id === parent && node.parent === 0) == false 
      && ((props.node != undefined && props.node.parent != 0) || (props.node == undefined && parent != 0))) setDroppable(false);
    else setDroppable(true);
  }, [parent]);

  const changeIconHandler = () => {
    openAddMenuModal();
    if(props.node?.icon != undefined) {
      setIcon(props.node.icon != undefined? props.node.icon : '');
    }else {
      setIcon("");
    }
  }

  const handleClose = () => {
    setShow(false);
    resetHandler();
  };

  const openAddMenuModal = () => {
    openModal(commModal.iconModal, {onSelect : handleIconSelect}, {MODAL_SIZE: MODAL_SIZE.XL});
  }

  const handleIconSelect = (className:string) => {
    setIcon(className);
  };

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleChangeNodeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const handleChangeNodeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleChangeNodePath = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPath(e.target.value);
  };

  const handleChangeParent = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setParent(String(e.target.value));
  };

  const resetHandler = () => {
    setText("");
    setId("");
    setUrl("");
    setParent(0);
    setIcon("");
    setIsDuplicatedId(false);
    setDroppable(true);
  }

  return (
    <Fragment>
      <div
        className={`modal fade ${show ? 'show' : ''}`}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        style={{ display: show ? 'block' : 'none' }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">{title}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
            </div>
            <div className="modal-body">
              <div className="form-itme">
                <dl>
                    <dt><p>Node id</p></dt>
                    <dd>
                      {props.node == undefined ? (
                        <input type="text" id={`nodeId${id}`} className="mb-2" onChange={handleChangeNodeId} value={id} />) : (<p>{id}</p>)}
                    </dd>
                </dl>
                <dl>
                    <dt><label htmlFor={`nodeTitle${id}`}>Node title</label></dt>
                    <dd>
                      <input type="text" id={`nodeTitle${id}`} className="mb-2" onChange={handleChangeText} value={text} /> 
                    </dd>
                </dl>
                <dl>
                    <dt><label htmlFor={`nodeUrl${id}`}>Node url</label></dt>
                    <dd>
                      <input type="text" id={`nodeUrl${id}`} className="mb-2" onChange={handleChangeNodeUrl} value={url} /> 
                    </dd>
                </dl>
                <dl>
                    <dt><label htmlFor={`nodeParent${id}`}>Parent</label></dt>
                    <dd>
                      <select id={`nodeParent${id}`} className="form-select mb-2" onChange={handleChangeParent} value={parent}>
                      <option value={0}>(root)</option>
                      {props.tree
                        .filter((node) => node.droppable === true)
                        .map((node) => (
                          <option key={node.id} value={node.id}>
                            {node.text}
                          </option>
                        ))}
                      </select>
                    </dd>
                </dl>
                {isMiddleMenu == false && ((props.node != undefined && props.node.parent != 0) || (props.node == undefined && parent != 0)) && (
                  <dl>
                      <dt><label htmlFor={`nodePath${id}`}>Node path</label></dt>
                      <dd>
                        <input type="text" id={`nodePath${id}`} className="mb-2" onChange={handleChangeNodePath} value={path} /> 
                      </dd>
                  </dl>
                )}
                {isMiddleMenu == true && (
                <dl>
                  <dt><p>Icon</p></dt>
                  <dd>
                    <input type="hidden" value={icon} readOnly />
                    <div>
                      {icon == ""? (
                        <input type="text" id={`nodeIcon${id}`} className={styles.isCurcer} onClick={openAddMenuModal} placeholder="아이콘을 선택해 주세요." readOnly/>
                      ) : (
                        <Fragment>
                          <p className={styles.isCurcer} onClick={changeIconHandler}>선택된 아이콘 : <i className={icon}></i></p>
                        </Fragment>
                      )}
                    </div>
                    <div>
                    </div>
                  </dd>
              </dl>
                )}
              </div>
            </div>
            {props.handleNodeChange == undefined ? (
              <div className="modal-footer">
              <button type="button" className="btn btn-sm btn-outline-secondary" data-bs-dismiss="modal" onClick={handleClose}>취소</button>
              {url === "" ? (
                <button
                className="btn btn-sm btn-primary"
                disabled={text === "" || id === "" || (isMiddleMenu == true && icon === "")}
                onClick={() => {
                    if(isDuplicatedId == true) {
                      commAlert.call('중복된 아이디 입니다.')
                    }else {
                      resetHandler();
                      handleClose();
                      props.onSubmit({ id, text, path, parent, droppable, icon });
                    }
                  }
                }>추가</button>
              ) : (
                <button
                className="btn btn-sm btn-primary"
                disabled={text === "" || id === "" || (isMiddleMenu == true && icon === "")}
                onClick={() => {
                    if(isDuplicatedId == true) {
                      commAlert.call('중복된 아이디 입니다.')
                    }else {
                      resetHandler();
                      handleClose();
                      props.onSubmit({ id, text, path, parent, droppable, url, icon });
                    }
                  }
                }>추가</button>
              )}
            </div>
            ) : (
              <div className="modal-footer">
              <button type="button" className="btn btn-sm btn-outline-secondary" data-bs-dismiss="modal" onClick={handleClose}>취소</button>
              {url === "" ? (
                <button
                className="btn btn-sm btn-primary"
                disabled={text === "" || id === "" || (isMiddleMenu == true && icon === "")}
                onClick={() => {
                    if(props.handleNodeChange != undefined) {
                      resetHandler();
                      handleClose();
                      if(props.setIcon != undefined) props.setIcon(icon);
                      props.handleNodeChange(id,{ id, text, path,  parent, droppable, icon });
                    }
                  }
                }>수정</button>
              ) : (
                <button
                className="btn btn-sm btn-primary"
                disabled={text === "" || id === "" || (isMiddleMenu == true && icon === "")}
                onClick={() => {           
                    if(props.handleNodeChange != undefined) {
                      resetHandler();
                      handleClose();
                      if(props.setIcon != undefined) props.setIcon(icon);
                      props.handleNodeChange(id,{ id, text, path, parent, droppable, url, icon });
                    }
                  }
                }>수정</button>
              )}
            </div>
            )}
            
          </div>
        </div>
      </div>
      {show && <div className="modal-backdrop fade show"></div>}
    </Fragment>
  );
}

export default AddDialog;
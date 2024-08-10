import { NodeModel } from "./types";
import React, { useState, Fragment } from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import styles from "./AddDialog.module.css";
import PlusIcon from "./menu-icons/PlusIcon";

interface Props {
  tree: NodeModel[];
  onSubmit: (e: NodeModel) => void;
};

const AddDialog = (props: Props) => {
  const [text, setText] = useState("");
  const [id, setId] = useState("");
  const [url, setUrl] = useState("");
  const [fileType, setFileType] = useState("text");
  const [parent, setParent] = useState<string | number>(0);
  //const [droppable, setDroppable] = useState(false);
  const [droppable, setDroppable] = useState(true); // 230515 메뉴트리 droppable 옵션 항시 true상태 고정, 추후 필요하면 해당 기능 사용자가 선택가능하게 커스터마이징 할것.
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    resetHandler();
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

  const handleChangeParent = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setParent(String(e.target.value));
  };

  const handleChangeDroppable = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDroppable(e.target.checked);
  };

  const handleChangeFileType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFileType(e.target.value);
  };

  const resetHandler = () => {
    setText("");
    setId("");
    setUrl("");
    setFileType("text");
    setParent(0);
    //setDroppable(false);
    setDroppable(true); // 230515 메뉴트리 droppable 옵션 항시 true상태 고정, 추후 필요하면 해당 기능 사용자가 선택가능하게 커스터마이징 할것.
  }

  return (
    <Fragment>
      <button className="btn btn-primary" onClick={handleShow}>
        <PlusIcon />
        Add Node
      </button>

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
              <h5 className="modal-title">Add Node</h5>
              <button type="button" className="close" onClick={handleClose} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div>
                <label>Node id</label>
                <input type="text" className="form-control mb-2" onChange={handleChangeNodeId} value={id} /> 
              </div>
              <div>
                <label>Node title</label>
                <input type="text" className="form-control mb-2" onChange={handleChangeText} value={text} />
              </div>
              <div>
                <label>Node url</label>
                <input type="text" className="form-control mb-2" onChange={handleChangeNodeUrl} value={url} />
              </div>
              <div>
                <div className={styles.select}>
                  <label>Parent</label>
                  <select className="form-select mb-2" onChange={handleChangeParent} value={parent}>
                  <option value={0}>(root)</option>
                  {props.tree
                    .filter((node) => node.droppable === true)
                    .map((node) => (
                    <option key={node.id} value={node.id}>
                      {node.text}
                    </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                {/* <label className="form-check-label mb-2 me-1">
                  Droppable
                </label>
                <input className="form-check-input mb-2" type="checkbox"
                  checked={droppable}
                  onChange={handleChangeDroppable}
                  color="primary"
                  readOnly={true}
                /> */}
                {!droppable && (
                  <div>
                    <div className={styles.select}>
                    <label>File type</label>
                    <select className="form-select" onChange={handleChangeFileType} value={fileType}>
                      <option value="text">TEXT</option>
                      <option value="csv">CSV</option>
                      <option value="image">IMAGE</option>
                    </select>
                    </div>
                  </div>
                  )}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
              {url === "" ? (
                <button
                className="btn btn-primary"
                disabled={text === "" || id === ""}
                onClick={() => {
                    resetHandler();
                    handleClose();
                    props.onSubmit({
                      id,
                      text,
                      parent,
                      droppable,
                      data: {
                        fileType
                      }
                    })
                  }
                }>Save changes</button>
              ) : (
                <button
                className="btn btn-primary"
                disabled={text === "" || id === ""}
                onClick={() => {
                    resetHandler();
                    handleClose();
                    props.onSubmit({
                      id,
                      text,
                      parent,
                      droppable,
                      url,
                      data: {
                        fileType
                      }
                    })
                  }
                }>Save changes</button>
              )}
            </div>
          </div>
        </div>
      </div>

      {show && <div className="modal-backdrop fade show"></div>}
    </Fragment>
  );
}

export default AddDialog;


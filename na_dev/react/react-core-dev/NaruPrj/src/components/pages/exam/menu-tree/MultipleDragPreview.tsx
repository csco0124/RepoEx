import React from "react";
import { NodeModel } from "@minoru/react-dnd-treeview";
import styles from "./MultipleDragPreview.module.css";

interface Props {
  dragSources: NodeModel[];
};

export const MultipleDragPreview: React.FC<Props> = (props) => {
  return (
    <button type="button" className="btn btn-secondary position-relative">
        <div className={`${styles.root} d-flex w-100 h-100`} data-testid="custom-drag-preview">
         {props.dragSources.map((node, index) => (
         <div className={styles.item} key={index}>
             <div className={styles.icon}>
              <i className="bi bi-folder-fill"></i>
             </div>
             <div className={styles.label}>{node.text}</div>
         </div>
         ))}
       </div>
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {props.dragSources.length}
            <span className="visually-hidden">unread messages</span>
        </span>
    </button>
  );
};

import React from "react";
import { NodeModel } from "@minoru/react-dnd-treeview";
import { CustomData } from "./types";
import { TypeIcon } from "./TypeIcon";
import styles from "./MultipleDragPreview.module.css";

interface Props {
  dragSources: NodeModel<CustomData>[];
};

export const MultipleDragPreview: React.FC<Props> = (props) => {
  return (
    <button type="button" className="btn btn-primary position-relative">
        <div className={styles.root} data-testid="custom-drag-preview">
         {props.dragSources.map((node, index) => (
         <div className={styles.item} key={index}>
             <div className={styles.icon}>
             <TypeIcon
                 droppable={node.droppable || false}
                fileType={node?.data?.fileType}
             />
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

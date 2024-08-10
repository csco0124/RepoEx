import React from "react";
import { DragLayerMonitorProps } from "@minoru/react-dnd-treeview";
import styles from "./CustomDragPreview.module.css";
import { NodeModel } from "./types";

interface Props {
  monitorProps: DragLayerMonitorProps<NodeModel>;
};

export const CustomDragPreview: React.FC<Props> = (props) => {
  const item = props.monitorProps.item;

  return (
    <div className={styles.root}>
      <div className={styles.icon}>
        <i className="bi bi-folder-fill"></i>
      </div>
      <div className={styles.label}>{item.text}</div>
    </div>
  );
};

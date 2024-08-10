import React, {useState} from "react";
import { useDragOver, RenderParams } from "@minoru/react-dnd-treeview";
import { NodeModel, CustomData } from "./types";
import { TypeIcon } from "./TypeIcon";
import styles from "./CustomNode.module.css";
import ArrowRightIcon from "./menu-icons/ArrowRightIcon";
import CheckIcon from "./menu-icons/CheckIcon";
import CancleIcon from "./menu-icons/CancleIcon";
import EditIcon from "./menu-icons/EditIcon";
import Delete from "./menu-icons/Delete";

type Props = RenderParams & {
  node: NodeModel<CustomData>;
  nodeList? : NodeModel[];
  depth: number;
  isSelected: boolean;
  isOpen: boolean;
  onToggle: (id: string | number) => void;
  onDelete: (id: NodeModel["id"]) => void;
  isDragging: boolean;
  testIdPrefix?: string;
  onClick: (e: React.MouseEvent, node: NodeModel<CustomData>) => void;
  onTextChange: (id: NodeModel["id"], value: string) => void;
};

export const CustomNode: React.FC<Props> = ({	
  testIdPrefix = "",	
  ...props	
}) => {
  const [hover, setHover] = useState<boolean>(false);
  const { id, text, droppable, data } = props.node;
  const [visibleInput, setVisibleInput] = useState(false);
  const [labelText, setLabelText] = useState(text);
  const indent = props.depth * 24;

  const handleClick = (e: React.MouseEvent) => {
    props.onClick(e, props.node);
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.onToggle(props.node.id);
  };

  const handleShowInput = () => {
    setVisibleInput(true);
  };

  const handleCancel = () => {
    setLabelText(text);
    setVisibleInput(false);
  };

  const handleSubmit = () => {
    setVisibleInput(false);
    props.onTextChange(id, labelText);
  };

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabelText(e.target.value);
  };

  if (props.isSelected) {
    props.containerRef.current?.classList.add(styles.selected);
  } else {
    props.containerRef.current?.classList.remove(styles.selected);
  }

  if (props.isDragging) {
    props.containerRef.current?.classList.add(styles.dragging);
  } else {
    props.containerRef.current?.classList.remove(styles.dragging);
  }

  //const handleSelect = () => props.onSelect(props.node);

  const dragOverProps = useDragOver(id, props.isOpen, props.onToggle);

  return (
    <div
      className={styles.root}
      style={{ paddingInlineStart: indent }}
      data-testid={`${testIdPrefix}custom-node-${id}`}
      onClick={handleClick}
      {...dragOverProps}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {props.node.droppable && (props.nodeList != undefined && props.nodeList.some((NodeList : any) => NodeList.parent === props.node.id)) && (
        <div
          className={`${styles.expandIconWrapper} ${
            props.isOpen ? styles.isOpen : ""
          }`}
        >
        <div onClick={handleToggle}>
          <ArrowRightIcon data-testid={`arrow-right-icon-${id}`} />
        </div> 
      </div>
      )}
      {/* {props.node.droppable && (props.nodeList != undefined && props.nodeList.some((NodeList : any) => NodeList.parent === props.node.id)) && (
          <div className={styles.filetype}>
            <TypeIcon droppable={droppable || false} fileType={data?.fileType} />
          </div>
        )} */}
      {visibleInput ? (
        <div className={styles.inputWrapper}>
        <input
          className="form-control form-control-sm"
          value={labelText}
          onChange={handleChangeText}
        />
        <button
          className={styles.editButton}
          onClick={handleSubmit}
          disabled={labelText === ""}
        >
          <CheckIcon />
        </button>
        <button className={styles.editButton} onClick={handleCancel}>
          <CancleIcon />
        </button>
        </div>
      ) : (
        <div className={styles.label}>
        {/* <Typography variant="body2">{props.node.text}</Typography> */}
        <span className="fs-6 fw-normal lh-base">{props.node.text}</span>
        </div>
      )}
      {hover && !visibleInput && (
        <>
          <div className={styles.actionButton}>
            <button className="btn btn btn-light btn-sm" onClick={() => props.onDelete(id)}>
              <Delete />
            </button>
            <button className="btn btn btn-light btn-sm" onClick={handleShowInput}>
              <EditIcon />
            </button>
          </div>         
        </>
      )}
    </div>
  );
};

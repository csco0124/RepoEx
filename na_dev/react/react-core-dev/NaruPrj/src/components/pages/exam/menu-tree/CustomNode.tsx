import React, { Fragment, useEffect, useState, useContext, RefObject } from "react";
import { useDragOver, RenderParams } from "@minoru/react-dnd-treeview";
import { NodeModel } from "./types";
import styles from "./CustomNode.module.css";
import ArrowRightIcon from "./menu-icons/ArrowRightIcon";
import useModals from "../../../../common/useModal";
import { commModal, MODAL_SIZE } from "../../CommModal";
import AddDialog from "./AddDialog";
import { ChildContext } from "../../AdminMenuMgt";

type Props = RenderParams & {
  node: NodeModel;
  nodeList : NodeModel[];
  depth: number;
  isSelected: boolean;
  isOpen: boolean;
  onToggle: (id: string | number) => void;
  onDelete: (id: NodeModel["id"]) => void;
  isDragging: boolean;
  testIdPrefix?: string;
  onClick: (e: React.MouseEvent, node: NodeModel) => void;
  onTextChange: (id: NodeModel["id"], value: string) => void;
  isCtrlPressing?: boolean;
  onIconChange: (id: NodeModel["id"], value: string) => void;
  handleSubmit: (newNode: NodeModel) => void;
  handleNodeChange: (id: NodeModel["id"], value: NodeModel) => void;
  handleRef: RefObject<any>;
  //editOrdMode: boolean;
  //ordUpSubmit: (id: NodeModel["id"]) => void;
  //ordDownSubmit: (id: NodeModel["id"]) => void;
};

export const CustomNode: React.FC<Props> = ({	
  testIdPrefix = "",	
  ...props	
}) => {
  const [hover, setHover] = useState<boolean>(false);
  const { id } = props.node;
  const indent = props.depth * 24 + 24;
  const [peekIcon, setPeekIcon] = useState('');
  const [icon, setIcon] = useState('');
  const {openModal} = useModals();
  const [showModal, setShowModal] = useState(false);
  const { show, setShow } = useContext(ChildContext);
  //const [backgroundColor, setBackgroundColor] = useState("#00ff0000");

  useEffect(() => {
    if(props.node.icon != undefined) setIcon(props.node.icon);
  }, []);

  useEffect(() => {
    if(show == false) setShowModal(false);
  }, [show]);

  useEffect(() => {
    if(peekIcon != "") props.onIconChange(props.node.id, icon);
  }, [peekIcon]);


  const handleIconSelect = (className:string) => {
    setPeekIcon(className);
    setIcon(className);
  };

  const openAddMenuModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    openModal(commModal.iconModal, {onSelect : handleIconSelect}, {MODAL_SIZE: MODAL_SIZE.XL});
  }

  const handleClick = (e: React.MouseEvent) => {
    props.onClick(e, props.node);
    handleToggle(e);
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if(props.isCtrlPressing == false) {
      props.onToggle(props.node.id);
    }
  };

  const handleShowInput = (event: React.MouseEvent) => {
    event.stopPropagation();
    setShowModal(true);
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

  // const ordUpHandler = (event: React.MouseEvent) => {
  //   event.stopPropagation();
  //   props.ordUpSubmit(props.node.id);
  //   setBackgroundColor("#FDEDE2");
  //   setHover(false)

  //   setTimeout(() => {
  //     setBackgroundColor("#00ff0000");
  //   }, 500);
  // }
  // const ordDownHandler = (event: React.MouseEvent) => {
  //   event.stopPropagation();
  //   props.ordDownSubmit(props.node.id);
  //   setBackgroundColor("#FDEDE2");
  //   setHover(false)

  //   setTimeout(() => {
  //     setBackgroundColor("#00ff0000");
  //   }, 500);
  // }

  const handleMenuDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.onDelete(id);
  }

  const dragOverProps = useDragOver(id, props.isOpen, props.onToggle);

  return (
    <Fragment>
      <div
        className={styles.root}
        // style={{ paddingInlineStart: indent, 
        //           backgroundColor: !props.editOrdMode? '': backgroundColor, 
        //           transition:  !props.editOrdMode? '': "background-color 0.5s ease-in-out"}}
        style={{ paddingInlineStart: indent}}
        data-testid={`${testIdPrefix}custom-node-${id}`}
        onClick={handleClick}
        // {...dragOverProps}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div>
          <div>
            <i className={`${styles.handle} drag-handle bi-justify`} 
                ref={props.handleRef} 
                data-testid={`drag-handle-${props.node.id}`}
                style={{ cursor: 'grab', display: hover ? 'block' : 'none'}}
            ></i> 
          </div>
          {props.node.droppable && (props.nodeList != undefined && props.nodeList.some((NodeList : any) => NodeList.parent === props.node.id)) && (
            <div
              className={`${styles.expandIconWrapper} ${
                props.isOpen ? styles.isOpen : ""
              }`}
            >
              <div className={styles.treeArrow}>
                <ArrowRightIcon data-testid={`arrow-right-icon-${id}`} />
              </div> 
            </div>
          )}
          {/* 230524 - 이광희 - bootstrap 스타일적용하려면 요소가 총 3개 필요해서 삼각형이없는경우 빈 div를 넣어줌. */}
          {!props.node.droppable || !(props.nodeList != undefined && props.nodeList.some((NodeList : any) => NodeList.parent === props.node.id)) && (
            <div><div></div></div> 
          )}
          {props.nodeList != undefined && props.nodeList.some(n => n.id === props.node.parent && n.parent === 0) 
            && (<i className={`${styles.treeIcon} ${icon}`} onClick={openAddMenuModal}></i> )}
          <div className={styles.label}>
            <span className={styles.treeLabel}>{props.node.text}</span>
          </div>
        </div>
        <div className={styles.btnEdit}>
        {/* {hover && !props.editOrdMode && ( */}
        {hover && (
          <>
            <button className="btn btn-s" onClick={handleShowInput}>
              수정
            </button>
            <button className="btn btn-s" onClick={handleMenuDelete}>
              삭제
            </button>    
          </>
        )}
        {/* {hover && props.editOrdMode && ( */}
        {/* {hover && props.editOrdMode && (
          <>
            <button className="bi-caret-up-square" onClick={ordUpHandler} />
            <button className="bi-caret-down-square" onClick={ordDownHandler} />   
          </>
        )} */}
        </div>
      </div>
      {showModal && (
        <AddDialog
          showModal={showModal}
          node={props.node}
          tree={props.nodeList}
          onSubmit={props.handleSubmit}
          handleNodeChange={props.handleNodeChange}
          setIcon={setIcon}
        />
      )}
    </Fragment>
  );
};

import React from "react";
import BootstrapIcon from "../../../layout/data/bootstrapIcon.json";

interface Props {
  onSelect: (icon:string) => void;
  onClose: () => void;
}

const IconModal = (props: Props) => {
    const handleIconClick = (icon:string) => {
      console.log(icon);
      props.onClose();
      props.onSelect(icon); // 선택된 아이콘을 부모 컴포넌트로 전달
    };
  
    return (
      <>
        <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="addMenuModalTitle">
            아이콘 목록
          </h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={props.onClose}></button>
        </div>
        <div className="modal-body">
          {<div className="icon-modal">
            {BootstrapIcon.map((icon:string, index:number) => (
              <button
                key={index}
                onClick={() => handleIconClick(icon)}
              >
                <i className={icon}></i>
              </button>
            ))}
          </div>}
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={props.onClose}>
              닫기
          </button>
        </div>
      </div>
    </>
    );
  };

  export default IconModal;
import React, {useEffect, useState} from "react";
import {Confirm} from "../../../store/confirm-context";
import classes from "../../../resources/css/Modal.module.css";

const ConfirmContent = (props : Confirm) => {
  const [modalShowClass, setModalShowClass] = useState('');

  useEffect(() => {
    setModalShowClass('show');
    return () => setModalShowClass('');
  }, []);

  return (
    <div className={`modal modal-sm alert fade ${classes.openModal} ${modalShowClass}`}  aria-modal="true" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body"><p className="text-info fs-6">{props.message}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-sm btn-outline-secondary" data-bs-dismiss="modal" onClick={props.onCancel}>{props.noText}</button>
            <button type="button" className="btn btn-sm btn-primary" onClick={props.onConfirm}>{props.yesText}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmContent;
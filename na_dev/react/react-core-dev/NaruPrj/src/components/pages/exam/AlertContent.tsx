import React, {useEffect, useState} from "react";
import {Alert} from "../../../store/alert-context";
import classes from '../../../resources/css/Modal.module.css';

const AlertContent = (props : Alert) => {
  const [modalShowClass, setModalShowClass] = useState('');
  useEffect(() => {
    setModalShowClass('show');
    return () => setModalShowClass('');
  }, []);
  const messageLines = props.message.split('\n')
  return (
    <div className={`modal modal-sm alert fade ${classes.openModal} ${modalShowClass}`}  aria-modal="true" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            {messageLines.map((line, index) => (
              <p key={index} className="text-info fs-6">
                {line}
              </p>
            ))}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-sm btn-primary" onClick={props.onClose}>확인</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlertContent;
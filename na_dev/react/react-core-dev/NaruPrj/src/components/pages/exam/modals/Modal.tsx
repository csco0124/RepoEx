import React, {useEffect, useState, useRef} from 'react';
import classes from '../../../../resources/css/Modal.module.css';
import { ModalOptionProps } from "../../CommModal";

interface Props {
  children : any;
  option?: ModalOptionProps;
  onClose?: () => void;
}

const Modal = ({ children, option, onClose }: Props) => {
  const [modalShowClass, setModalShowClass] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
      setModalShowClass('show');
      document.addEventListener('mousedown', outSideClickHandler);
      return () => {
        setModalShowClass('')
        document.removeEventListener('mousedown', outSideClickHandler);
      };
  }, []);

  const outSideClickHandler = (e: any) => {
    modalRef.current && !modalRef.current.contains(e.target) && option?.outsideClose && onClose && onClose();
  }

  return (
    <>
      <div className={`${classes.openModal} modal fade ${modalShowClass} ${option?.MODAL_SIZE || ''}`}
           tabIndex={-1}
           aria-modal="true"
           role="dialog"
      >
        <div className="modal-dialog" ref={modalRef}>
          <div className="modal-content">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
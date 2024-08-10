import React, {useEffect, useState} from 'react';
import classes from './Modal.module.css';

interface Props {
    children : any;
}

const Modal = ({ children }:Props) => {
  const [modalShowClass, setModalShowClass] = useState('');
  useEffect(() => {
      setModalShowClass('show');
      return () => setModalShowClass('');
  }, []);

  return (
      <>
          <div/>
          <div>
              <div className={`${classes.openModal} modal fade ${modalShowClass}`} id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel"
                   aria-modal="true" role="dialog" style={{display:"block"}} >
                  <div className="modal-dialog">
                      {children}
                  </div>
              </div>
          </div>
      </>
  );
}

export default Modal;
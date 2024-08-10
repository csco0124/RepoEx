import React, {useEffect, useState} from "react";
import {POSITIONS} from "../../store/toast-context";


const ToastContent = (
  {
    bodyMessage,
    options,
  } : any) => {

  const {position = POSITIONS.TOP_CENTER, duration = 2000} = options || {};

  return (
    <>
      <div className={`toast-container p-3 ${position}`}
           data-original-class="toast-container p-3">
        <div className="toast fade show">
          <div className="toast-header">
            <svg className="bd-placeholder-img rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg"
                 aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false">
              <rect width="100%" height="100%" fill="#007aff"></rect>
            </svg>
            <strong className="me-auto"></strong>
            {/*<small></small>*/}
          </div>
          <div className="toast-body">{bodyMessage}</div>
        </div>
      </div>
    </>
  )
}
export default ToastContent;

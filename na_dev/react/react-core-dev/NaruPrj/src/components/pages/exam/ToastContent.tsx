import React from "react";
import { Toast } from "../../../store/toast-context";


const ToastContent = (toast : Toast) => {
  return (
    <>
      <div className="toast align-items-center show" role="alert" aria-live="assertive" aria-atomic="true">
        <div className="d-flex">
          <div className="toast-body">
            <p className={toast.options?.type}>{toast.message}</p>
            {/*<p className="text-warning">토스트 내용 두줄 토스트 내용 두줄 토스트 내용 두줄 토스트 내용 두줄 토스트 내용 두줄 토스트 내용 두줄</p>*/}
          </div>
        </div>
      </div>
    </>
  )
}
export default ToastContent;

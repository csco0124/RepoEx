import React, {useEffect, useState} from "react";
import ToastContent from "../pages/test/ToastContent";

interface Toast {
  headerMessage?: string;
  bodyMessage: string;
  timeText?: string;
  options?: ToastOptions;
}

interface ToastOptions {
  position?: POSITIONS;
  duration?: number;
  type?: TOAST_TYPES;
}

enum POSITIONS {
  TOP_LEFT = "top-0 start-0",
  TOP_CENTER = "top-0 start-50 translate-middle-x",
  TOP_RIGHT = "top-0 end-0",
  BOTTOM_LEFT = "bottom-0 start-0",
  BOTTOM_CENTER = "bottom-0 start-50 translate-middle-x",
  BOTTOM_RIGHT = "bottom-0 end-0",
  MIDDLE_LEFT = "top-50 start-0 translate-middle-y",
  MIDDLE_CENTER = "top-50 start-50 translate-middle",
  MIDDLE_RIGHT = "top-50 end-0 translate-middle-y",
};

enum TOAST_TYPES {
  TOAST = "toast",
  TOAST_ERROR = "toast-error",
  TOAST_SUCCESS = "toast-success",
  TOAST_WARNING = "toast-warning",
  TOAST_INFO = "toast-info",
}

const ToastContext = React.createContext({
  call: (props: string | Toast) => {},
  error: (props: string | Toast) => {},
  success: (props: string | Toast) => {},
  warn: (props: string | Toast) => {},
  info: (props: string | Toast) => {},
});

const ToastContextProvider = (props: any) => {

  const toast = () => {

  }

  const toastError = () => {

  }
  const toastSuccess = () => {

  }
  const toastWarning = () => {

  }
  const toastInfo = () => {

  }

  return (
    <ToastContext.Provider
      value={{
        call: toast,
        error: toastError,
        success: toastSuccess,
        warn: toastWarning,
        info: toastInfo,
      }}
    >
      {props.children}
    </ToastContext.Provider>
  );
};

export {ToastContextProvider, POSITIONS, TOAST_TYPES};
export default ToastContext;


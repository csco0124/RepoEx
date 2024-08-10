import React, { useState } from "react";
import ToastContent from "../components/pages/exam/ToastContent";
import { createKey } from "../common/commonUtil";

/**
 * ToastContextProvider에서 사용하는 Toast의 인터페이스
 */
interface Toast {
  uid?: string;
  message?: string;
  //timeText?: string;
  options?: ToastOptions;
}

interface ToastOptions {
  position?: POSITIONS;
  duration?: number;
  type?: TOAST_TYPES;
}

/**
 *  토스트 위치
 */
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

/**
 * 토스트가 사용될 타입, 기본값은 TOAST
 */
enum TOAST_TYPES {
  TOAST = "text-check",
  TOAST_ERROR = "toast-error",
  TOAST_SUCCESS = "toast-success",
  TOAST_WARNING = "text-warning",
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
  const [toasts, setToasts] = useState<{ [key:string]: Toast }>({});

  const addToast = (message: string | Toast, type: TOAST_TYPES) => {
    const key = createKey('toast');

    const option = typeof message === "string" ? undefined : message.options;
    const toast = {
      uid: key,
      message: typeof message === "string" ? message : message.message,
      options: defaultOptions(type, option)
    }

    setToasts((prevToasts) => {
      return {...prevToasts, [key]: toast};
    });

    setTimeout(() => {
      removeToast(key);
    }, toast.options.duration);
  }

  const removeToast = (uid: string) => {
    setToasts((prevToasts) => {
      const newToasts = {...prevToasts};
      delete newToasts[uid];
      return newToasts;
    });
  }

  const defaultOptions = (type: TOAST_TYPES, options?: ToastOptions) => {
    return {
      position: options?.position || POSITIONS.BOTTOM_CENTER,
      duration: options?.duration || 3000,
      type: type,
    }
  }

  const toast = (message: string | Toast ) => {
    addToast(message, TOAST_TYPES.TOAST);
  }

  const toastError = (message: string | Toast ) => {
    addToast(message, TOAST_TYPES.TOAST_ERROR);
  }

  const toastSuccess = (message: string | Toast ) => {
    addToast(message, TOAST_TYPES.TOAST_SUCCESS);
  }

  const toastWarning = (message: string | Toast ) => {
    addToast(message, TOAST_TYPES.TOAST_WARNING);
  }

  const toastInfo = (message: string | Toast ) => {
    addToast(message, TOAST_TYPES.TOAST_INFO);
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
      {
        Object.values(toasts).map((toast) =>
            <ToastContent
              key={toast.uid}
              {...toast}
            />
        )
      }
    </ToastContext.Provider>
  );
};

export { ToastContextProvider, POSITIONS };
export type { Toast, ToastOptions };
export default ToastContext;


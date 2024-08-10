import React, { useState } from "react";
import ToastContent from "@components/toast/ToastContent";
import { createKey } from "@utils/commonUtil";

/**
 * ToastContextProvider에서 사용하는 Toast의 인터페이스
 */
interface ToastProps {
  uid?: string;
  message?: string;
  options?: ToastOptions;
}

interface ToastOptions {
  position?: POSITIONS; //토스트 위치
  duration?: number;    //토스트닫히는시간
  type?: 'success' | 'info' | 'warning' | 'error';   //토스트 타입
}

/**
 *  토스트 위치
 *  @TODO 부트스트랩 기준이라 변경 필요
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
 * @TODO 부트스트랩 기준이라 변경 필요 
 */ 
enum TOAST_TYPES {
  TOAST = 'info',
  TOAST_ERROR = 'error',
  TOAST_SUCCESS = 'success',
  TOAST_WARNING = 'warning',
}

const ToastContext = React.createContext({
  Toast: (props: string | ToastProps) => {},
  ToastError: (props: string | ToastProps) => {},
  ToastSucc: (props: string | ToastProps) => {},
  ToastWarn: (props: string | ToastProps) => {},
});

const ToastContextProvider = ({children}: any) => {
  const [toasts, setToasts] = useState<{ [key:string]: ToastProps }>({});

  const addToast = (props: string | ToastProps, type: TOAST_TYPES) => {
    const key = createKey('toast');

    const option = typeof props === 'string' ? undefined :props.options;
    const toast = {
      uid: key,
      message: typeof props === 'string' ? props : props.message,
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

  const Toast = (message: string | ToastProps) => addToast(message, TOAST_TYPES.TOAST);
  const ToastError = (message: string | ToastProps) => addToast(message, TOAST_TYPES.TOAST_ERROR);
  const ToastSucc = (message: string | ToastProps) => addToast(message, TOAST_TYPES.TOAST_SUCCESS);
  const ToastWarn = (message: string | ToastProps) => addToast(message, TOAST_TYPES.TOAST_WARNING);

  return (
    <ToastContext.Provider value={{Toast, ToastError, ToastSucc, ToastWarn}}>
      {children}
      {
        Object.values(toasts)
              .map(toast => <ToastContent key={toast.uid} {...toast} />) 
      }
    </ToastContext.Provider>
  );
};

export { ToastContextProvider, POSITIONS };
export type { ToastProps, ToastOptions };
export default ToastContext;


import AlertContent from "@components/alert/AlertContent";
import React, { useState } from "react";
import { createKey } from "@utils/commonUtil";
import { AlertColor } from "@mui/material/Alert/Alert";
/**
 * AlertContextProvider에서 사용하는 Alert의 인터페이스
 * alertType은 ALERT_TYPES의 ALERT가 기본값
 * options는 추가 요건이 생기면 정의
 * onClose는 닫았을 때 호출되는 함수
 */
interface AlertProps {
  uid?: string;           //uid
  message: string;        //메시지
  alertType?: AlertColor; //info, error, success, warning
  onClose?: () => void;   //닫을때 실행할 콜백함수
  options?: AlertOptions; // 추가 요건이 생기면 정의
}

interface AlertOptions {
  
}

/**
 * AlertContextProvider에서 사용하는 AlertOptions의 기본값
 * @param type
 * @param option
 */
const AlertContext = React.createContext({
  Alert: (_props: string | AlertProps) => {},
  AlertError: (_props: string | AlertProps) => {},
  AlertSucc: (_props: string | AlertProps) => {},
  AlertWarn: (_props: string | AlertProps) => {},
});

const AlertContextProvider = ({children}: any) => {
  const [alerts, setAlerts] = useState<{ [key:string]: AlertProps }>({});

  const addAlert = (props: string | AlertProps, type: AlertColor) => {
    const key = createKey('alert');
    const alert = {
      uid: key,
      message: typeof props === 'string' ? props : props.message,
      alertType: type,
      options: typeof props === 'string' ? undefined : props.options,
      onClose: onCloseFn(key, typeof props === 'string' ? undefined : props.onClose)
    }

    setAlerts(prevAlerts => {
      return {...prevAlerts, [key]: alert};
    });
  }

  /**
   * alert를 삭제하는 함수
   */
  const removeAlert = (key: string) => {
    setAlerts((prevAlerts) => {
      const newAlerts = {...prevAlerts};
      delete newAlerts[key];
      return newAlerts;
    });
  }

  /**
   * alert를 닫았을 때 호출되는 함수
   * @param key
   * @param callBackFn
   */
  const onCloseFn = (key: string, callBackFn?: () => void) => {
    return () => {
      callBackFn?.();
      removeAlert(key);
    }
  }

  const Alert = (props: string | AlertProps) => addAlert(props, 'info');
  const AlertError = (props: string | AlertProps) => addAlert(props, 'error');
  const AlertSucc = (props: string | AlertProps) => addAlert(props, 'success');
  const AlertWarn = (props: string | AlertProps) => addAlert(props, 'warning');
  
  return (
    <AlertContext.Provider value={{ Alert, AlertError, AlertSucc, AlertWarn }}>
      {children}
      {
        Object.values(alerts).map(alert => <AlertContent key={alert.uid} {...alert}/> )
      }
    </AlertContext.Provider>
  )
}

export { AlertContextProvider };
export type { AlertProps, AlertOptions };
export default AlertContext;
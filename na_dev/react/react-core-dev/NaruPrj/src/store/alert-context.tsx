import React, { useState } from "react";
import AlertContent from "../components/pages/exam/AlertContent";
import { createKey } from "../common/commonUtil";

/**
 * AlertContextProvider에서 사용하는 Alert의 인터페이스
 * alertType은 ALERT_TYPES의 ALERT가 기본값
 * options는 추가 요건이 생기면 정의
 * onClose는 닫았을 때 호출되는 함수
 */
interface Alert {
  uid?: string;
  message: string;
  alertType?: string;
  onClose?: () => void;
  options?: AlertOptions;
}

enum ALERT_TYPES {
  ALERT = "alert",
  ALERT_ERROR = "alert-error",
  ALERT_SUCCESS = "alert-success",
  ALERT_WARNING = "alert-warning",
  ALERT_INFO = "alert-info",
}

interface AlertOptions {
  //TODO: 추가 요건이 생기면 다시 정의
}

/**
 * AlertContextProvider에서 사용하는 AlertOptions의 기본값
 * @param type
 * @param option
 */
const AlertContext = React.createContext({
  call: (message:string | Alert) => {},
  error: (message:string | Alert) => {},
  success: (message:string | Alert) => {},
  warn: (message:string | Alert) => {},
  info: (message:string | Alert) => {},
});

const AlertContextProvider = (props: any) => {
  /** alert 를 관리 하기 위한 useState */
  const [alerts, setAlerts] = useState<{ [key:string]: Alert }>({});

  const addAlert = (message: string | Alert, type: ALERT_TYPES) => {
    const key = createKey('alert');
    const alert = {
      uid: key,
      message: typeof message === "string" ? message : message.message,
      alertType: type,
      options: typeof message === "string" ? undefined : message.options,
      onClose: onCloseFn(key, typeof message === "string" ? undefined : message.onClose)
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

  const alert = (message: string | Alert) => {
    addAlert(message, ALERT_TYPES.ALERT);
  }

  const alertError = (message: string | Alert) => {
    addAlert(message, ALERT_TYPES.ALERT_ERROR);
  }

  const alertSuccess = (message: string | Alert) => {
    addAlert(message, ALERT_TYPES.ALERT_SUCCESS);
  }

  const alertWarning = (message: string | Alert) => {
    addAlert(message, ALERT_TYPES.ALERT_WARNING);
  }

  const alertInfo = (message: string | Alert) => {
    addAlert(message, ALERT_TYPES.ALERT_INFO);
  }

  return (
    <AlertContext.Provider
      value={{
        call: alert,
        error: alertError,
        success: alertSuccess,
        warn: alertWarning,
        info: alertInfo
      }}>
      {props.children}
      {
        Object.values(alerts).map(alert => <AlertContent key={alert.uid} {...alert}/> )
      }
    </AlertContext.Provider>
  )
}

export {AlertContextProvider};
export type {Alert, AlertOptions};
export default AlertContext;
import React, { useState } from "react";
import AlertContent from "../pages/test/AlertContent";
import { AlertOptions } from "../pages/test/AlertContent";


const AlertContext = React.createContext({
  call: (bodyMessage: string, onClose?: () => void, options?: AlertOptions) => {},
  error: (bodyMessage: string, onClose?: () => void, options?: AlertOptions) => {},
  success: (bodyMessage: string, onClose?: () => void, options?: AlertOptions) => {},
  warn: (bodyMessage: string, onClose?: () => void, options?: AlertOptions) => {},
  info: (bodyMessage: string, onClose?: () => void, options?: AlertOptions) => {},
  clear: (bodyMessage: string, onClose?: () => void, options?: AlertOptions) => {},
});

const AlertContextProvider = (props: any) => {
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [options, setOptions] = useState<AlertOptions>({});
  const [showAlert, setShowAlert] = useState(false);
  const [onClose, setOnClose] = useState<() => void>(() => {});

  const onCloseFn = (callBackFn?: () => void) => {
    return () => {
      callBackFn && callBackFn();
      setShowAlert(false);
    }
  }

  const defaultSettings = (message: string, onClose?: () => void, options?: AlertOptions) => {
    setMessage(message);
    setOptions({...options});
    setShowAlert(true);
    setOnClose(() => onCloseFn(onClose));
  }

  const alert = (message: string, onClose?: () => void, options?: AlertOptions) => {
    defaultSettings(message, onClose, options);
    setAlertType("alert");
  }

  const alertError = (message: string, onClose?: () => void, options?: AlertOptions) => {
    defaultSettings(message, onClose, options);
    setAlertType("alert-error");
  }

  const alertSuccess = (message: string, onClose?: () => void, options?: AlertOptions) => {
    defaultSettings(message, onClose, options);
    setAlertType("alert-success");
  }

  const alertWarning = (message: string, onClose?: () => void, options?: AlertOptions) => {
    defaultSettings(message, onClose, options);
    setAlertType("alert-warning");
  }

  const alertInfo = (message: string, onClose?: () => void, options?: AlertOptions) => {
    defaultSettings(message, onClose, options);
    setAlertType("alert-info");
  }

  const alertClear = () => {
    setMessage("");
    setAlertType("");
    setOptions({});
    setShowAlert(false);
    setOnClose(() => {setShowAlert(false)});
  }

  return (
    <AlertContext.Provider
      value={{
        call: alert,
        error: alertError,
        success: alertSuccess,
        warn: alertWarning,
        info: alertInfo,
        clear: alertClear,
      }}>
      {props.children}
      {
        showAlert &&
        <AlertContent message={message} alertType={alertType} options={options} onClose={onClose} />
      }
    </AlertContext.Provider>
  )
}

export {AlertContextProvider};

export default AlertContext;
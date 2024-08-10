import React, { useState } from "react";
import ConfirmContent from "../components/pages/exam/ConfirmContent";
import { createKey } from "../common/commonUtil";

interface Confirm {
  uid?: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  yesText?: string;
  noText?: string;
  options?: ConfirmOptions;
}

interface ConfirmOptions {
  //TODO: 추가 요건이 생기면 다시 정의
}

const ConfirmContext = React.createContext({
  call: (confirmProps: Confirm) => {},
});

const ConfirmContextProvider = (props: any) => {
  const [confirms, setConfirms] = useState<{ [key:string]: Confirm }>({});

  const addConfirm = (confirmProps: Confirm) => {
    const key = createKey('confirm');

    const confirm = {
      uid: key,
      message: confirmProps.message,
      options: confirmProps.options,
      onConfirm: onConfirmFn(key, confirmProps.onConfirm),
      onCancel: onCancelFn(key, confirmProps.onCancel),
      yesText: confirmProps.yesText || '확인',
      noText: confirmProps.noText || '취소',
    }

    setConfirms(prevConfirms => {
      return {...prevConfirms, [key]: confirm};
    });
  }

  const removeConfirm = (key: string) => {
    setConfirms((prevConfirms) => {
      const newConfirms = {...prevConfirms};
      delete newConfirms[key];
      return newConfirms;
    });
  }

  const onCancelFn = (key: string, callBackFn?: () => void) => {
    return () => {
      callBackFn?.();
      removeConfirm(key);
    }
  }

  const onConfirmFn = (key: string, callBackFn?: () => void) => {
    return () => {
      callBackFn?.();
      removeConfirm(key);
    }
  }

  const call = (confirmProps: Confirm) => {
    addConfirm(confirmProps);
  }

  return (
    <ConfirmContext.Provider
      value={{call: call}}>
      {props.children}
      {
        Object.values(confirms).map(confirm => <ConfirmContent key={confirm.uid} {...confirm}/>)
      }
    </ConfirmContext.Provider>
  )
}

export {ConfirmContextProvider};
export type {Confirm, ConfirmOptions};
export default ConfirmContext;
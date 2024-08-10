import React, { useState } from "react";
import ConfirmContent from "@components/confirm/ConfirmContent";
import { createKey } from "@utils/commonUtil";

interface ConfirmProps {
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
  Confirm: (props: ConfirmProps) => {},
});

const ConfirmContextProvider = (props: any) => {
  const [confirms, setConfirms] = useState<{ [key:string]: ConfirmProps }>({});

  const addConfirm = (props: ConfirmProps) => {
    const key = createKey('confirm');

    const confirm = {
      uid: key,
      message: props.message,
      options: props.options,
      onConfirm: onConfirmFn(key, props.onConfirm),
      onCancel: onCancelFn(key, props.onCancel),
      yesText: props.yesText || '확인',
      noText: props.noText || '취소',
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

  const Confirm = (props: ConfirmProps) => addConfirm(props);

  return (
    <ConfirmContext.Provider value={{ Confirm }}>
      {props.children}
      {
        Object.values(confirms).map(confirm => <ConfirmContent key={confirm.uid} {...confirm}/>)
      }
    </ConfirmContext.Provider>
  )
}

export { ConfirmContextProvider };
export type { ConfirmProps, ConfirmOptions };
export default ConfirmContext;
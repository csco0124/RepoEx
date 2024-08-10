import React from 'react';
import { ToastContextProvider } from '../store/toast-context';
import { AlertContextProvider } from '../store/alert-context';
import { ConfirmContextProvider } from './confirm-context';
import { ModalProvider } from './modal-context';


const UIContextProvider = (props: any) => {
  return (
    <ConfirmContextProvider>
      <ToastContextProvider>
        <AlertContextProvider>
          <ModalProvider>
          {props.children}
          </ModalProvider>
        </AlertContextProvider>
      </ToastContextProvider>
    </ConfirmContextProvider>
  );
}

export { UIContextProvider };
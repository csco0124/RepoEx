import React from 'react';
import { ToastContextProvider } from '../store/toast-context';
import { AlertContextProvider } from '../store/alert-context';

const UIContextProvider = (props: any) => {
  return (
      <ToastContextProvider>
        <AlertContextProvider>
          {props.children}
        </AlertContextProvider>
      </ToastContextProvider>
  );
}

export { UIContextProvider };
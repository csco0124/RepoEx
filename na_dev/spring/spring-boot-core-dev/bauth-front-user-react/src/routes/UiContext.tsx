import { ToastContextProvider } from '@components/toast/ToastContext';
import { AlertContextProvider } from '@components/alert/AlertContext';
import { ConfirmContextProvider } from '@components/confirm/ConfirmContext';
import { ModalProvider } from '@components/modal/ModalContext';
import {SnackbarProvider} from 'notistack';
import { NotistackContextProvider } from '@components/notistack/NotistackContext';
import DownloadReadyComponent from '@components/notistack/CustomComponent';

const UIContextProvider = (props: any) => {
  return (
    <SnackbarProvider 
      maxSnack={5}
      Components={{
        customComponents: DownloadReadyComponent
      }}
    >
      <NotistackContextProvider>
        <ConfirmContextProvider>
          <ToastContextProvider>
            <AlertContextProvider>
              <ModalProvider>
                {props.children}
              </ModalProvider>
            </AlertContextProvider>
          </ToastContextProvider>
        </ConfirmContextProvider>
      </NotistackContextProvider>
    </SnackbarProvider>
  );
}

export { UIContextProvider };
import { ToastContextProvider } from '@components/toast/ToastContext';
import { AlertContextProvider } from '@components/alert/AlertContext';
import { ConfirmContextProvider } from '@components/confirm/ConfirmContext';
import { ModalProvider } from '@components/modal/ModalContext';
import {SnackbarProvider} from 'notistack';
import { NotistackContextProvider } from '@components/notistack/NotistackContext';

const UIContextProvider = (props: any) => {
  return (
    <SnackbarProvider maxSnack={5}>
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
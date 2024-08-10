import React, { createContext } from "react";
import { SnackbarKey, useSnackbar } from "notistack";
// import NotistackContent from "@/components/notistack/NotistackContent";
// import { SnackbarProps } from "@mui/material";

/** NotistackContextProvider에서 사용할 Notistack 인터페이스 */
interface NotistackProps {
    key?: SnackbarKey;
    message?: string;
    options?: NotistackOptions;
}

interface NotistackOptions {
    anchorOrigin?: { horizontal: 'left' | 'center' | 'right', vertical: 'top' | 'bottom' }; // 위치
    autoHideDuration?: number; // 자동 hide 시간
    variant?: 'default' | 'success' | 'info' | 'warning' | 'error'; // 타입
    persist?: boolean; // 유지 여부
    action?: React.ReactNode; // Noti에 액션 추가
}

/** Position 속성을 빠르게 사용하기 위한 세팅 */
const NOTISTACK_POSITIONS:any = {
    TOP_LEFT : {horizontal: 'left', vertical:'top'},
    TOP_CENTER : {horizontal: 'center', vertical:'top'},
    TOP_RIGHT : {horizontal: 'right', vertical:'top'},
    BOTTOM_LEFT : {horizontal: 'left', vertical:'bottom'},
    BOTTOM_CENTER : {horizontal: 'center', vertical:'bottom'},
    BOTTOM_RIGHT : {horizontal: 'right', vertical:'bottom'},
}

/** Notistack 타입 */
enum NOTISTACK_TYPES {
    NOTISTACK = 'default',
    NOTISTACK_INFO = 'info',
    NOTISTACK_ERROR = 'error',
    NOTISTACK_SUCCESS = 'success',
    NOTISTACK_WARNING = 'warning',
}

/** 
 * NotistackContext 변수 리턴 값을 선언한 type
 * @param {string | NotistackProps, NOTISTACK_TYPES}
 * @returns SnackbarKey
 */
type NotifiStackContextValue = {
    StackNoti: (message: string | NotistackProps, type: NOTISTACK_TYPES) => SnackbarKey;
    StackInfoNoti: (message: string, options: NotistackOptions) => SnackbarKey;
    StackErrorNoti: (message: string, options: NotistackOptions) => SnackbarKey;
    StackSuccNoti: (message: string, options: NotistackOptions) => SnackbarKey;
    StackWarnNoti: (message: string, options: NotistackOptions) => SnackbarKey;
    CloseNotiStack: (key: SnackbarKey) => void;
}

const NotistackContext = createContext<NotifiStackContextValue>({} as NotifiStackContextValue);

const NotistackContextProvider = ({children}: any) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const StackNoti = (props: string | NotistackProps, type: NOTISTACK_TYPES) => {
      if (typeof props === 'string') {
        return enqueueSnackbar(
          props, {
            variant: type
          }
        );
      } else {
        const option = props.options;
        return enqueueSnackbar(
          props.message, 
          {
            variant: type,
            anchorOrigin: option?.anchorOrigin || NOTISTACK_POSITIONS.BOTTOM_LEFT,
            autoHideDuration: option?.autoHideDuration,
            persist: option?.persist,
            action: option?.action,
          }
        );
      }
    };

    const StackInfoNoti = (props: string | NotistackProps) => {
      return StackNoti(props, NOTISTACK_TYPES.NOTISTACK_INFO);
    };

    const StackErrorNoti = (props: string | NotistackProps) => {
      return StackNoti(props, NOTISTACK_TYPES.NOTISTACK_ERROR);
    };

    const StackSuccNoti = (props: string | NotistackProps) => {
      return StackNoti(props, NOTISTACK_TYPES.NOTISTACK_SUCCESS);
    };

    const StackWarnNoti = (props: string | NotistackProps) => {
      return StackNoti(props, NOTISTACK_TYPES.NOTISTACK_WARNING);
    };

    const CloseNotiStack = (key: SnackbarKey) => {
      closeSnackbar(key);
    };

    // const defaultOptions = (type: NOTISTACK_TYPES, options?: NotistackOptions) => {
    //   return {
    //     anchorOrigin: options?.anchorOrigin || NOTISTACK_POSITIONS.BOTTOM_LEFT,
    //     autoHideDuration: options?.autoHideDuration || 3000,
    //     variant: type,
    //   }
    // }

    const contextValue: NotifiStackContextValue = {
      StackNoti,
      StackInfoNoti,
      StackErrorNoti,
      StackSuccNoti,
      StackWarnNoti,
      CloseNotiStack
    };
  
    return (
      
        <NotistackContext.Provider value={contextValue}>
          {children}
        </NotistackContext.Provider>
    );
  };


export { NotistackContextProvider, NOTISTACK_POSITIONS };
export type { NotistackProps, NotistackOptions };
export default NotistackContext;
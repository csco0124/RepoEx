import { useModal } from '@hooks/useModal';
import { useAlert } from '@hooks/useAlert';
import { useConfirm } from '@hooks/useConfirm';
import { useToast } from '@hooks/useToast';
import { ModalSample } from "@routes/Modals";
import { useNotistack } from '@/hooks/useNotistack';
import { NOTISTACK_POSITIONS } from '@/components/notistack/NotistackContext'
import { Button, IconButton, Tooltip } from '@mui/material';
import AlertProps from '@components/alert/AlertContext';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ConfirmProps from '@components/confirm/ConfirmContext';
import ToastProps from '@components/toast/ToastContext';

const Sample = () => {
  
  const { openModal } = useModal();
  const { Confirm } = useConfirm();
  const { Alert, AlertError, AlertSucc, AlertWarn } = useAlert();
  const { Toast, ToastError, ToastSucc, ToastWarn } = useToast();
  const { StackNoti, StackInfoNoti, StackErrorNoti, StackSuccNoti, StackWarnNoti, StackCustomCpntNoti, CloseNotiStack } = useNotistack();

  /**
   * alert 사용법 String 또는 AlertProps 형식에 맞춰 오브젝트 전달
   * @param {string | AlertProps} 
   */
  const alertSample = () => Alert('alert~~~');
  const alertErrorSample = () => AlertError('AlertError~~~');
  const alertSuccSample = () => AlertSucc('AlertSucc~~~');
  const alertWarnSample = () => AlertWarn('AlertWarn~~~');

  const alertCallBackSample = () => {
    Alert({message: 'message', onClose:() => alert('닫기콜백')});
  }
  
  /**
   * confirm 사용법 String 또는 ConfirmProps 형식에 맞춰 오브젝트 전달
   * @param {string | ConfirmProps}
   */
  const confirmSample = () => {
    Confirm({message: 'message', onConfirm: () => alert('확인 콜백'), onCancel: () => alert('취소 콜백')});
  }

  /**
   * modal 사용법
   * @param (모달컴포넌트, props?: any, options?: ModalOptionProps)
   * props 와 options 는 선택사항
   */
  const modalSample = () => {
    openModal(ModalSample,  /** @routes/Modals에 등록한 모달 */
      {title: 'modalTitle', message : '모달 샘플 props'}, /** modal에 전달할 props<any> close 함수의 경우 자동 전달*/
      {outsideClose:true}); /*모달 밖 클릭시 창 닫기 옵션*/
  }

  /**
   * toast 사용법 String 또는 ToastProps 형식에 맞춰 오브젝트 전달
   * @param {string | ToastProps}
   */
  const toastSample = () => {
    Toast({message:'toast~~5초후에 닫히는 옵션설정 기본은 3초', options:{duration:5000}}); // 5초 후에 닫힘
    //Toast('기본은 3초후에 닫힘');
    //toast 의 경우도 alert 과 동일한 네이밍으로 사용 가능
    // ToastError('ToastError~~~');
    // ToastSucc('ToastSucc~~~');
    // ToastWarn('ToastWarn~~~');
  }

  /**
   * Notistack 사용법 String 또는 NotistackProps 형식에 맞춰 오브젝트와 타입명 전달
   * @param message - string 혹은 NotistackProp
   * @param type - Notistack 타입명
   */
  const newStack = () => {
    StackNoti({
      message: 'default',
      options: {
        anchorOrigin: NOTISTACK_POSITIONS.TOP_CENTER, // default: BOTTOM_LEFT
        autoHideDuration: 2000, // default: 3000
        // persist: true // default: false
      }
    }, 'default');
    // CloseNotiStack();
  }

  /**
   * StackInfoNoti 사용법 String 또는 NotistackProps 형식에 맞춰 오브젝트 전달
   * @param message | NotistackProps - string 혹은 NotistackProp
   */
  const newStackInfo = () => {
    StackInfoNoti("info");
  }

  const newStackError = () => {
    StackErrorNoti("error");
  }

  const newStackSucc = () => {
    StackSuccNoti("success");
  }

  const newStackWarn = () => {
    StackWarnNoti("warning");
  }

  /** React.ReactNode를 포함한 customNotiStack 예제 1 */
  const customStack1 = () => {
    StackNoti({
      message: 'custom Noti',
      options: {
        anchorOrigin: NOTISTACK_POSITIONS.BOTTOM_CENTER,
        autoHideDuration: 5000,
        action: customAction // React.ReactNode
      }
    }, 'default');
  }

  /** 커스텀 컴포넌트를 포함한 customNotiStack 예제 2 */
  const customStack2 = () => {
    StackCustomCpntNoti(
      'CustomNoti Ready!!!', // 메시지 내용
      {
        variant: 'customComponents', // 커스텀 컴포넌트 명
        // 그외 Notistack 옵션
        anchorOrigin: NOTISTACK_POSITIONS.BOTTOM_RIGHT,
      }
    );
  }

  // customNotiStack에 포함될 action 선언
  const customAction = snackbarId => (
    <>
      <Tooltip title="snackbarId 값 확인">
        <IconButton color="info" onClick={() => { Alert(`snackbarId 값은 ${snackbarId} 입니다!`); }}>
          <CheckIcon/>
        </IconButton>
      </Tooltip>
      <Tooltip title="닫기">
        <IconButton color="error" onClick={() => { CloseNotiStack(snackbarId) }}>
          <CloseIcon/>
        </IconButton>
      </Tooltip>
    </>
  );
  
  return (
    <div>
      <h1>Sample Alert</h1>
      각 알럿에 따라 디자인 수정이 필요<br/>
      <Button variant="contained" color="info" onClick={alertSample}>alert</Button>
      <Button variant="contained" color="error" onClick={alertErrorSample}>error</Button>
      <Button variant="contained" color="success" onClick={alertSuccSample}>success</Button>
      <Button variant="contained" color="warning" onClick={alertWarnSample}>warning</Button>
      <Button variant="contained" onClick={alertCallBackSample}>alertCallBack</Button>

      <h1>Sample Confirm</h1>
      <Button variant="contained" color="info" onClick={confirmSample}>confirm</Button>

      <h1>Sample Modal</h1>
      <Button variant="contained" color="info" onClick={modalSample}>modal</Button>

      <h1>Sample Toast</h1>
      <Button variant="contained" color="info" onClick={toastSample}>toast</Button>

      <h1>Sample Notistack</h1>
      <Button variant="contained" sx={{backgroundColor: '#313131'}}onClick={newStack}>Noti Default</Button>
      <Button variant="contained" color="info" onClick={newStackInfo}>Noti Info</Button>
      <Button variant="contained" color="error" onClick={newStackError}>Noti Error</Button>
      <Button variant="contained" color="success" onClick={newStackSucc}>Noti Success</Button>
      <Button variant="contained" color="warning" onClick={newStackWarn}>Noti Warning</Button>

      <h1>Custom Notistack</h1>
      <Button variant="contained" sx={{backgroundColor: '#313131'}}onClick={customStack1}>Noti Custom 1</Button>
      <Button variant="contained" sx={{backgroundColor: '#313131'}}onClick={customStack2}>Noti Custom 2</Button>
    </div>
  )
}

export default Sample;
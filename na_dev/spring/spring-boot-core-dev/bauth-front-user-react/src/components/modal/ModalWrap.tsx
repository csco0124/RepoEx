import { useEffect, useRef, ReactNode, Suspense } from 'react';
import { ModalOptionProps } from "@components/modal/CommModal";
import { Tooltip, IconButton, Box, Modal } from '@mui/material';
import { LoadingScreen } from '@components/LoadingScreen';
import { modal } from '@components/popupStyle';
import ClearIcon from '@mui/icons-material/Clear'

interface Props {
  children: ReactNode;
  option?: ModalOptionProps;
  onClose: () => void;
}

const ModalWrap = ({ children, option, onClose }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.history.pushState(null, '', window.location.href);
    document.addEventListener('mousedown', outSideClickHandler);
    window.addEventListener('popstate', onClose);
    
    return () => {
      document.removeEventListener('mousedown', outSideClickHandler);
      window.removeEventListener('popstate', onClose);
    };
  }, []);
  
  const historyBackClose = () => {
    onClose();
    window.history.back();
  }

  const outSideClickHandler = (e: any) => {
    //마우스 뒤로 가기 버튼
    if (e.button === 3) {
      return;
    }
    
    modalRef.current && !modalRef.current.contains(e.target) && option?.outsideClose && historyBackClose();
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Modal open={true}>
        <Box sx={modal} ref={modalRef}>
          <Box>
            {children}
            <Tooltip title="닫기">
              <IconButton size="large" onClick={historyBackClose}>
                <ClearIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Modal>
    </Suspense>
  );
}

export default ModalWrap;
import { ToastProps } from "@components/toast/ToastContext";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const ToastContent = (toast : ToastProps) => {
  return (
    <Snackbar open={true}>
      <MuiAlert variant="filled" severity={toast.options?.type} sx={{ width: '100%' }}>
        {toast.message}
      </MuiAlert>
    </Snackbar>
  )
}
export default ToastContent;

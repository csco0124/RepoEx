import { useContext } from 'react';
import ToastContext from '@components/toast/ToastContext';

export const useToast = () => useContext(ToastContext);

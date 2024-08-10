import { useContext } from 'react';
import ConfirmContext from '@components/confirm/ConfirmContext';

export const useConfirm = () => useContext(ConfirmContext);
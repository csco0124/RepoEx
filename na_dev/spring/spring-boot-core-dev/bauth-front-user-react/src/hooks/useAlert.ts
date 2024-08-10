import { useContext } from 'react';
import AlertContext from '@components/alert/AlertContext';

export const useAlert = () => useContext(AlertContext);
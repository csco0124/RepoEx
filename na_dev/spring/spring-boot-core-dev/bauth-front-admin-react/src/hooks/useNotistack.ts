import { useContext } from 'react';
import NotistackContext from '@components/notistack/NotistackContext';

export const useNotistack = () => {
    const context = useContext(NotistackContext);
    if (!context) {
      throw new Error('노티스택 호출 위치 확인 필요');
    }
    return context;
};
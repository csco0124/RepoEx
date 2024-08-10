// react
import { useReducer } from 'react';
// interface 
import type { GridSortItem } from '@mui/x-data-grid';

// 상태를 변경할 액션 타입 정의
export type ActionType = { type: 'SET_FIELD', field: string } | { type: 'SET_SORT', sort: 'asc' | 'desc' | undefined };


// sort item 초기값
const sortModel: GridSortItem = { field: '', sort: undefined };

// reduceer
const sortReducer = (state: GridSortItem, action: ActionType): GridSortItem => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, field: action.field };
    case 'SET_SORT':
      return { ...state, sort: action.sort };
    default:
      throw new Error();
  }
}

export { sortModel, sortReducer };

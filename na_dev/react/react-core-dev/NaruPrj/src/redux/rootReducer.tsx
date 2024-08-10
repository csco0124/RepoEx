import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
//slices
import boardReducer from './slices/board';
import leftTreeReducer from '../store/LeftTreeReducer';

// ----------------------------------------------------------------------

const createNoopStorage = () => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem<T, K extends keyof T>(_key: K, value: T) {
    return Promise.resolve(value);
  },
  removeItem() {
    return Promise.resolve();
  },
});

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const boardPersistConfig = {
  key: 'board',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy'],
};

const leftTreePersistConfig = {
  key: 'leftTree',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy'],
}

const rootReducer = combineReducers({
  board: persistReducer(boardPersistConfig, boardReducer),
  leftTree: persistReducer(leftTreePersistConfig, leftTreeReducer),
});

export { rootPersistConfig, rootReducer };

// export type RootState = ReturnType<typeof rootReducer>;
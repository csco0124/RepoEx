import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { rootPersistConfig, rootReducer } from './rootReducer';

// ----------------------------------------------------------------------

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);

const { dispatch } = store;

const useSelector = useAppSelector;

const useDispatch: () => AppDispatch = useAppDispatch;

export { store, persistor, dispatch, useSelector, useDispatch };
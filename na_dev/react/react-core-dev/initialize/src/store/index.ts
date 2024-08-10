import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import TestReducer from "./TestReducer";

const server = import.meta.env.VITE_APP_SERVER;

export const store = configureStore({
  reducer: {
    test: TestReducer,
  },
  middleware: (getDefaultMiddleware) => (server === 'production')?getDefaultMiddleware():getDefaultMiddleware().concat(logger)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

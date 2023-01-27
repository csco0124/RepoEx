import { all, fork } from "redux-saga/effects";
import timeSaga from "./timeSaga";

export default function* rootSaga() {
  yield all([fork(timeSaga)]);
}

import $api from "../../../../../common/CommonAxios";
import { DummyDataRequest, DummyData } from "./agGridTypes";

export const getDummyData = ({pageNum = 1, rowCnt = 5, searchType = 0, searchStr = ''} : DummyDataRequest = {}) => {
  return $api.get(`/api/dummy/getDataList`, {params : {pageNum, rowCnt, searchType, searchStr}});
}

export const updateDummyData = ({...param}: DummyData) => {
  return $api.post(`/api/dummy/updateData`, param);
}

export const insertDummyData = ({...param}: DummyData) => {
  return $api.post(`/api/dummy/setData`, param);
}

export const deleteDummyData = ({...param}: DummyData) => {
  return $api.post(`/api/dummy/deleteData`, param);
}
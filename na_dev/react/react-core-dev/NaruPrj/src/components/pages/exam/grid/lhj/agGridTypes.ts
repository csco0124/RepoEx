import {ColDef} from 'ag-grid-community';

export const DUMMY_DATA_COL_DEF: ColDef[] = [
  { field: 'dataPath', headerName: '경로', width: 200},
  { field: 'methodType', headerName: '호출 방식', width: 120 },
  { field: 'statusCode', headerName: '상태 코드', width: 120 },
  { field: 'delayTime', headerName: '지연시간', width: 120 },
  { field: 'jsonData', headerName: '데이터', width: 220 },
  { field: 'dataInfo', headerName: '설명', width: 200 }
]

export const SEARCH_TYPES = [
  { value: 0, label: '선택' },
  { value: 1, label: '경로' },
  { value: 2, label: '설명' },
  { value: 3, label: '호출 방식' },
  { value: 4, label: '상태 코드' },
]

export const ROW_CNTS = [
{ value: 5, label: '5개 보기' },
{ value: 10, label: '10개 보기' },
{ value: 20, label: '20개 보기' },
{ value: 30, label: '30개 보기' },
]

export const METHOD_TYPES = [
  { value: 'GET', label: 'GET' },
  { value: 'POST', label: 'POST' },
  { value: 'PUT', label: 'PUT' },
  { value: 'PATCH', label: 'PATCH' },
  { value: 'DELETE', label: 'DELETE' },
  { value: 'HEAD', label: 'HEAD' },
  { value: 'OPTIONS', label: 'OPTIONS' },
  { value: 'TRACE', label: 'TRACE' },
  { value: 'CONNECT', label: 'CONNECT' },
];

export interface DummyData {
  uid?: string;
  dataPath: string; // 경로
  jsonData: string; // JSON 데이터
  dataInfo: string; // 데이터 정보
  statusCode: string; // 상태코드 (200,404,500 등등)
  delayTime: string ; // 지연시간 (0~9 사이로)
  methodType: string; // GET or POST
}

export interface DummyDataRequest {
  searchStr?: string;
  searchType?: number;
  rowCnt?: number;
  pageNum?: number;
}
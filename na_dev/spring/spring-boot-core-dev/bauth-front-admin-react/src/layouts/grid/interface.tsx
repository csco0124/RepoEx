
// mui-type
import type { GridSortItem } from "@mui/x-data-grid";

// components type
import type { SearchBarContainer } from "@/components/search-bar/interface"
import type { DataGridContainer } from '@/components/grid/interface';

// axios
import { Method } from "axios";

// criteria parameter
export type SearchCriteria = {
  filterKey: string; // 검색키
  value: object; // 검색값
  // 검색 조건
  operation: 'cn'|'nc'|'eq'|'ne'|'bw'|'bn'|'ew'|'en'|'nu'|'nn'|'gt'|'ge'|'lt'|'le';
}

// condition search parameter
export type SearchParam = {
  searchCriteriaList: SearchCriteria[]; // jpa 크리테리아 객체배열
  dataOption: 'all' | 'any'; // 데이터옵션 - all(and) | any(or)
}

// pagenation parameter
export type Pagination = {
  size: number; // 페이징 사이즈   
  page: number; // 현제 페이지
}

// customRequestParam for axios request (instead AxiosConfig)
export type CustomRequestParam<D = any> = {
  url?: string;
  method?: Method | string;
  params?: any;
  data?: D;
}

// SWRFetcherParam
export interface FetcherParam extends CustomRequestParam, FetchCondition {}

// GetDataFunction parameter
export interface FetchCondition {
  searchParam: SearchParam; // for search criteria
  pagination: Pagination; // for paging
  sortModel: GridSortItem; // for sort
}

// gridFrame type
export interface GridFrameProps extends SearchBarContainer, DataGridContainer {
  // axiosConfig for data fetch
  customRequestParam: CustomRequestParam;
  // row data processing method
  dataFlowXract(): any;
}
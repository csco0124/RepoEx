import React, {useContext, useEffect, useRef, useState} from "react";
import {AgGridReact} from "ag-grid-react";
import toastContext from "../../../../../store/toast-context";
import alertContext from "../../../../../store/alert-context";
import confirmContext from "../../../../../store/confirm-context";

import useModals from "../../../../../common/useModal";
import {commModal} from "../../../CommModal";
import MenuDepth from "../../../../common/MenuDepth";

import {DummyData, DUMMY_DATA_COL_DEF, ROW_CNTS, SEARCH_TYPES} from "./agGridTypes";
import {updateBtnRenderer, deleteBtnRenderer, apiExecuteBtnRenderer} from "./AgGridRenderer";
import {HttpStatusCode} from 'axios';
import {deleteDummyData, getDummyData} from "./agGridService";
import Pagination from "../hyeonSu/Pagination";
import {isEmpty, isNotEmpty} from "../../../../../common/commonUtil";
import {AgGridEvent, DragStoppedEvent} from "ag-grid-community/dist/lib/events";
import {ColDef} from "ag-grid-community";


const ExamAgGrid = () => {
  const commToast = useContext(toastContext);
  const commAlert = useContext(alertContext);
  const commConfirm = useContext(confirmContext);

  const {openModal} = useModals();

  const [dummyDataList, setDummyDataList] = useState<DummyData[]>([]);

  const [pageNum, setPageNum] = useState<number>(1);
  const [searchStr, setSearchStr] = useState<string>('');
  const [searchType, setSearchType] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [rowCnt, setRowCnt] = useState<number>(10);


  /** 컬럼 커스텀을한다. 표현할 데이터 외의 수정, 삭제 기능이 추가 되어 컬럼을 임의적으로 추가하고 이벤트를 추가한다 */
  const customDataColDef: ColDef[] = [
    { field: 'test', headerName: 'TEST', width: 150, cellRenderer: apiExecuteBtnRenderer},
    ...DUMMY_DATA_COL_DEF,
    { field: "update", headerName: "수정", width: 140, cellRenderer: updateBtnRenderer },
    { field: "delete", headerName: "삭제", width: 140, cellRenderer: deleteBtnRenderer },
  ];

  const [columnDefs, setColumnDefs] = useState<ColDef[]>(customDataColDef);

  useEffect(() => {
    const localDefs = localStorage.getItem("columnDefs");
    localDefs && setColumnDefsCusTom(JSON.parse(localDefs));
  }, []);

  useEffect(() => {
    initDummyData();
  },[pageNum, rowCnt]);

  // 해더 위치 변경 이벤트 처리
  const onDragStopped = (params : DragStoppedEvent) => {
    const columnDefs = getColDef(params);
    localStorage.setItem("columnDefs", JSON.stringify(columnDefs));
    setColumnDefsCusTom(columnDefs);
  };

  const getColDef = (params: AgGridEvent) => {
    return params.columnApi.getAllGridColumns().map(column => column.getColDef());
  }

  const setColumnDefsCusTom = (params: ColDef[]) => {
    isEmpty(params) ? setColumnDefs(customDataColDef)
                    : setColumnDefs(params.map(col => customDataColDef.find(v => v.field == col.field) || col));
  }


  /** 그리드 로우 삭제 버튼 이벤트 */
  const deleteDummyFn = (data: DummyData) => {
    commConfirm.call({
      message: '삭제하시겠습니까?',
      onConfirm: () => onDeleteFn(data)
    });
  }

  const onDeleteFn = async (data: DummyData) => {
    const res = await deleteDummyData({...data});
    if (HttpStatusCode.Ok !== res.status) {
      commToast.warn('데이터 삭제에 실패하였습니다.');
      return;
    }
    commToast.call('데이터가 삭제되었습니다.');
    await initDummyData();
  }

  const updateDummyModalOpen = (props: DummyData) => {
    openModal(commModal.agGridModal, {data: {...props}, initDummyData, flag: 'update'});
  }

  const insertDummyModalOpen = () => {
    openModal(commModal.agGridModal, {initDummyData, flag: 'insert'});
  }

  const apiExecuteModalOpen = (props: DummyData) => {
    openModal(commModal.apiExecuteModal, {data: {...props}});
  }


  const initDummyData = async () => {
    let res = await getDummyData({pageNum, searchStr, searchType, rowCnt});

    if (HttpStatusCode.Ok !== res.status) {
      commToast.warn('데이터 조회에 실패하였습니다.');
      return;
    }

    if (isEmpty(res.data.dataList) && pageNum > 1) {
      setPageNum(1);
    }

    setDummyDataList(res.data.dataList);
    setTotalPage(res.data.totalPage);
  }

  const searchBtnHandler = () => {

    /*if (!validate.searchType()) {
      commAlert.call('검색 조건을 선택해주세요.');
      return;
    }*/

    if (!validate.searchStr()) {
      commAlert.call('검색어를 입력해주세요.');
      return;
    }

    initDummyData();
  }

  const validate = {
    searchStr: () => isNotEmpty(searchStr),
    searchType: () => searchType !== 0,
  }

  const searchTypeRender = () => {
    return (
      <select className='form-select' value={searchType} onChange={(e) => setSearchType(Number(e.target.value))}>
      {
        SEARCH_TYPES.map(type =>
            <option key={type.value} value={type.value}>
              {type.label}
            </option>)
      }
      </select>
    );
  }

  const rowCntRender = () => {
    return (
      <select className='form-select' value={rowCnt} onChange={(e) => setRowCnt(Number(e.target.value))} name={'rowCnt'}>
        {ROW_CNTS.map(row => (
          <option key={row.value} value={row.value}>
            {row.label}
          </option>
        ))}
      </select>
    )
  }

  //그리드 콜백함수
  const gridCallBackFn = {updateDummyModalOpen, deleteDummyFn, apiExecuteModalOpen}
  
  return (
        <div className="content">
          <MenuDepth/>
          <div className="cont-item">
            <div className="d-flex justify-content-between mb-3">
              <div className='btn-area left'>
                {rowCntRender()}
              </div>
              <div className='btn-area right'>
                {searchTypeRender()}
                <input type="text" value={searchStr} onChange={(e) => setSearchStr(e.target.value)}/>
                <button className='btn btn-sm btn-primary' onClick={searchBtnHandler}>
                  검색
                </button>
              </div>
            </div>
            <div className={'grid-wrapper ag-theme-alpine'}>
              <AgGridReact
                rowData={dummyDataList}
                columnDefs={columnDefs}
                suppressDragLeaveHidesColumns={true}
                context={gridCallBackFn}
                rowHeight={50}
                onDragStopped={onDragStopped}
              ></AgGridReact>
            </div>
            <Pagination pageNum={pageNum} totalPage={totalPage} setPageNum={setPageNum}/>
            <div className="btn-area right">
              <button className="btn btn-sm btn-primary" onClick={insertDummyModalOpen}>등록</button>
            </div>
          </div>
        </div>
  );
}

export default ExamAgGrid;
import { useFilters, useSortBy, useTable } from 'react-table';
import React, { useRef, useEffect, useState, useContext } from 'react';
import OperationModal from './OperationModal';
import './GridStyle.css';
import $api from '../../../../../common/CommonAxios';
import confirmContext from '../../../../../store/confirm-context';
import AlertContext from '../../../../../store/alert-context';
import toastContext from '../../../../../store/toast-context';

const ReactTableGrid = () => {
  /**
   * state 정의
   */
  const [tableData, setTableData] = useState<any>([]); // 테이블 구성 데이터
  const [isEditing, setIsEditing] = useState(false); // edit 기능을 위한 boolean 값
  const [updateCellData, setUpdateCellData] = useState(''); // 셀 업데이트 데이터
  const [deleteOnOff, setDeleteOnOff] = useState(false); // 삭제 기능 on/off
  const [updateOnOff, setUpdateOnOff] = useState(false); // 수정 기능 on/off
  const [searchOnOff, setSearchOnOff] = useState(false); // 검색 기능 on/off
  const [updateRowData, setUpdateRowData] = useState(''); // 업데이트 시킬 행 데이터
  const [editedData, setEditedData] = useState({ rowIdx: '',colIdx: '',value: '' , uid:''}); // prettier-ignore
  const [selectedRows, setSelectedRows]: any = useState([]); // 삭제 데이터 체크 값
  const inputRef = useRef<HTMLInputElement>(null); // 셀 수정 시 , input 태그 창에 focus를 맞추기 위한 참조 기능
  const selectRef = useRef<HTMLSelectElement>(null); // 셀 수정 시 , select 태그 창에 focus를 맞추기 위한 참조 기능
  const modalRef: any = useRef(null); // 'OperationModal' 컴포넌트 참조
  const [showTfoot, setShowTfoot] = useState(true); // 테이블의 tfoot show / hide 여부
  const [disableOnOff, setDisableOnOff] = useState(true); // select 값 선택에 따른 검색 창 disable 여부
  const showMoreDisplayBtn = useState(true); // '더 보기' 버튼 show / hide 여부
  const [increaseStartRowNum, setIncreaseStartRowNum]: any = useState(0); // 보여줄 데이터 시작지점(더보기 버튼을 통한 증가 요소)
  const fixStartRowNum = 0; // 보여줄 데이터 시작지점(현 시점을 나타내기 위한 고정 요소)
  const howMuchNum = 10; // 보여줄 데이터의 행 수
  const commConfirm = useContext(confirmContext); // 공통 confirm
  const commAlert = useContext(AlertContext); // 공통 alert
  const commToast = useContext(toastContext); // 행 추가 알림 toast
  const [searchTextVal, setSearchTextVal] = useState(''); // 검색 값
  const [searchForSelectval, setSearchForSelectval] = useState(''); // 검색에 앞서 선택된 select 태그 값

  /**
   * 렌더링 시 loadMoreRows() 실행
   */
  useEffect(() => {
    getData();
  }, []);

  // TODO : getData() 와 moreGetData() 병합 및 리팩토링 필요

  /**
   * 테이블 구성 데이터 셋팅
   * crud 기능 후 , 행의 증가 없이 현 그리드 상태 유지
   */
  const getData = async () => {
    let data = {
      params: {
        startRowNum: fixStartRowNum,
        howMuchNum: howMuchNum + increaseStartRowNum,
      },
    };
    let res = await $api.get('/api/mby/grid/data', data);
    if (res.data.length < howMuchNum) setShowTfoot(false);
    setTableData([...res.data]);
  };

  /**
   * 테이블 구성 데이터 셋팅
   * '더 보기' 버튼 클릭 후 증가된 행을 붙여서 그리드 구성
   */
  const moreGetData = async (updateNum: any) => {
    let data = {
      params: {
        startRowNum: updateNum,
        howMuchNum,
      },
    };
    let res = await $api.get('/api/mby/grid/data', data);
    if (res.data.length < howMuchNum) setShowTfoot(false);
    setTableData([...tableData, ...res.data]);
  };

  /**
   * '더 보기' 버튼 클릭 시 getData() 함수 호출로 그리드 행 수 증가
   * 최초 렌더링 시에는 toast 생략
   */
  const loadMoreRows = async () => {
    let updateNum = increaseStartRowNum + howMuchNum;
    await setIncreaseStartRowNum(updateNum);
    await moreGetData(updateNum);
    commToast.call('행이 추가되었습니다.');
  };

  /**
   * 테이블 구성 데이터 셋팅
   */
  const data = React.useMemo(
    () =>
      tableData.map((item: any) => ({
        uid: item.uid,
        DATA_PATH: item.dataPath,
        DATA_INFO: item.dataInfo,
        JSON_DATA: item.jsonData,
        STATUS_CODE: item.statusCode,
        DELAY_TIME: item.delayTime,
        METHOD_TYPE: item.methodType,
      })),
    [tableData]
  );

  /**
   * 테이블 컬럼 - 데이터 맵핑
   */
  const columns: any = React.useMemo(
    () => [
      { Header: 'DATA_PATH', accessor: 'DATA_PATH' },
      { Header: 'DATA_INFO', accessor: 'DATA_INFO' },
      { Header: 'JSON_DATA', accessor: 'JSON_DATA' },
      { Header: 'STATUS_CODE', accessor: 'STATUS_CODE' },
      { Header: 'DELAY_TIME', accessor: 'DELAY_TIME' },
      { Header: 'METHOD_TYPE', accessor: 'METHOD_TYPE' },
    ],
    []
  );

  /**
   * 테이블 인스턴스 생성
   */
  const tableInstance = useTable({ columns, data }, useFilters, useSortBy);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow,setFilter } = tableInstance; // prettier-ignore

  /**
   * 검색 필터 기능
   */
  useEffect(() => {
    // columns 에서 header 추출
    let headerArr = columns.map((item: any) => {
      return { [item.accessor]: item.accessor };
    });

    // 추출된 header 객체화
    let headerObject = headerArr.reduce((acc: any, curr: any) => {
      return Object.assign(acc, curr);
    }, {});

    // 객체의 키값으로 searchForSelectval 사용해서 동적 필터링
    if (headerObject.hasOwnProperty(searchForSelectval)) {
      setFilter(headerObject[searchForSelectval], searchTextVal);
    }
  }, [searchTextVal, setFilter]);

  /**
   * 더블클릭 시 셀 업데이트 기능 활성화
   */
  const editCell = (item: any, cell: any) => {
    // 'editedData' 데이터 셋팅
    setEditedData({
      rowIdx: item.index,
      colIdx: cell.column.id,
      value: cell.value,
      uid: item.original.uid,
    });

    setIsEditing(true); // editing 기능 활성화

    // METHOD_TYPE 열에 경우 edit 기능 활성화 시 태그 별 포커스 분기
    if (editedData.colIdx === 'METHOD_TYPE') {
      setTimeout(() => {
        selectRef.current?.focus();
      }, 0.5);
    } else {
      // input 요소가 생성된 이후에 자동으로 focus를 맞추기 위해 setTimeout 함수 사용
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0.5);
    }
  };

  /**
   * '행 수정' 버튼 클릭
   *  값 셋팅 전 , 참조 오류 방지 async/await 사용
   */
  const editRow = async (event: any, item: any) => {
    await setUpdateRowData(item.original);
    modalRef.current.openUpdateModal(event);
  };

  /**
   * edit 후 외부 클릭 시 업데이트 confirm 창 출력 및 진행
   */
  const updateTriggerBlur = async (e: any) => {
    commConfirm.call({
      message: '수정하시겠습니까?',
      onConfirm: async () => {
        let data = {
          uid: editedData.uid, // 수정될 데이터 uid
          column: editedData.colIdx, // 수정될 데이터 column
          updateCellData: updateCellData, // 수정하고자 기입한 값
        };
        await $api.post('/api/mby/grid/cell-new-data', data);
        setIsEditing(false);
        e.target.contentEditable = false;
        getData();
      },
      onCancel: () => {
        setIsEditing(false);
        e.target.contentEditable = false;
      },
    });
  };

  /**
   * 컬럼 on/off
   */
  const onOffDeleteBtn = () => setDeleteOnOff(!deleteOnOff); // 삭제 버튼
  const onOffUpdateBtn = () => setUpdateOnOff(!updateOnOff); // 수정 버튼
  const onOffSearchText = (event: any) => {
    setDisableOnOff(false); // option 선택 시 disable 해제
    setSearchForSelectval(event.target.value); // 선택된 option 값
  };
  const onOffSearchBtn = () => {
    setSearchOnOff(!searchOnOff); // 검색 버튼
    setDisableOnOff(true); // text 창 disable
    setSearchForSelectval(''); // 검색 select 값 초기화
    setSearchTextVal(''); // 검색 input 값 초기화
  };

  /**
   * 검색 값 셋팅
   */
  const searchTextValSet = (event: any) => setSearchTextVal(event.target.value);

  /**
   * 삭제 할 데이터의 행 체크 여부
   */
  const selectChkBox = (event: any, row: any) => {
    if (event.target.checked) {
      setSelectedRows([...selectedRows, row.index]);
    } else {
      setSelectedRows(selectedRows.filter((idx: any) => idx !== row.index));
    }
  };

  /**
   * 셀 데이터 없데이트 할 값 셋팅
   */
  const updateCellDataSet = (event: any) => setUpdateCellData(event.target.value); // prettier-ignore

  /**
   * 행 삭제
   */
  const deleteRow = () => {
    let deleteDataArr = selectedRows.map((idx: any) => rows[idx].original);
    if (deleteDataArr.length == 0) {
      commAlert.call({ message: '삭제 할 행을 체크해주세요.' });
      return false;
    } else {
      commConfirm.call({
        message: '삭제 하시겠습니까?',
        noText: '아니오',
        onConfirm: async () => {
          await $api.post('/api/mby/grid/data-dy', deleteDataArr);
          getData();
          setSelectedRows([]);
        },
      });
    }
  };

  /**
   * 시작페이지로 이동
   */
  const returnStartPage = () => (window.location.href = '/StartPage');

  return (
    <div className="content">
      <div className="cont-item">
        <div className="searchItem">
          {searchOnOff && (
            <>
              <select
                id="searchSelectTag"
                className="form-select"
                style={{ width: 175 }}
                value={searchForSelectval}
                onChange={onOffSearchText}
              >
                <option value="" disabled>
                  검색
                </option>
                {headerGroups[0].headers.map((column: any) => (
                  <option key={column.Header} value={column.Header}>
                    {column.Header}
                  </option>
                ))}
              </select>
              <input
                type="text"
                id="searchInput"
                style={{ width: 200 }}
                disabled={disableOnOff}
                onChange={searchTextValSet}
              />
            </>
          )}
          <button
            type="button"
            id="searchBtn"
            onClick={onOffSearchBtn}
            className="btn-icon"
          >
            {searchOnOff ? (
              <i
                className="icon-icon19"
                data-bs-toggle="tooltip"
                data-bs-html="true"
                title="취소"
              />
            ) : (
              <i
                className="bi-search"
                data-bs-toggle="tooltip"
                data-bs-html="true"
                title="검색"
              />
            )}
          </button>
          <OperationModal
            ref={modalRef}
            getData={getData}
            updateRowData={updateRowData}
          />
          <button type="button" className="btn-icon" onClick={onOffDeleteBtn}>
            {deleteOnOff ? (
              <i
                className="icon-icon19"
                data-bs-toggle="tooltip"
                data-bs-html="true"
                title="취소"
              />
            ) : (
              <i
                className="icon-icon22"
                data-bs-toggle="tooltip"
                data-bs-html="true"
                title="삭제"
              />
            )}
          </button>
          <button type="button" className="btn-icon" onClick={onOffUpdateBtn}>
            {updateOnOff ? (
              <i
                className="icon-icon19"
                data-bs-toggle="tooltip"
                data-bs-html="true"
                title="취소"
              />
            ) : (
              <i
                className="icon-icon21"
                data-bs-toggle="tooltip"
                data-bs-html="true"
                title="수정"
              />
            )}
          </button>
          <button type="button" className="btn-icon" onClick={returnStartPage}>
            <i
              className="bi bi-arrow-left"
              data-bs-toggle="tooltip"
              data-bs-html="true"
              title="이전페이지"
            />
          </button>
        </div>
        <div className="mt-4">
          <table id="reactTableGrid" {...getTableProps()} className="table">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render('Header')}
                      &nbsp;
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <i className="bi bi-caret-down-fill" />
                          ) : (
                            <i className="bi bi-caret-up-fill" />
                          )
                        ) : (
                          ''
                        )}
                      </span>
                    </th>
                  ))}
                  {deleteOnOff && (
                    <th>
                      <button
                        id="deleteBtn"
                        type="button"
                        className="btn-icon"
                        onClick={deleteRow}
                      >
                        <i
                          className="icon-icon22"
                          data-bs-toggle="tooltip"
                          data-bs-html="true"
                          title="선택 정보 삭제"
                        />
                      </button>
                    </th>
                  )}
                  {updateOnOff && <th>--</th>}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((item: any) => {
                prepareRow(item);
                return (
                  <tr {...item.getRowProps()}>
                    {item.cells.map((cell: any) => (
                      <td
                        {...cell.getCellProps()}
                        onDoubleClick={() => editCell(item, cell)}
                      >
                        {isEditing &&
                        editedData.rowIdx === item.index &&
                        editedData.colIdx === cell.column.id ? (
                          cell.column.id === 'METHOD_TYPE' ? (
                            <select
                              defaultValue={editedData.value}
                              onBlur={updateTriggerBlur}
                              onChange={updateCellDataSet}
                              ref={selectRef}
                            >
                              <option value="GET">GET</option>
                              <option value="POST">POST</option>
                            </select>
                          ) : (
                            <input
                              type="text"
                              defaultValue={editedData.value}
                              onBlur={updateTriggerBlur}
                              onChange={updateCellDataSet}
                              ref={inputRef}
                            />
                          )
                        ) : (
                          cell.render('Cell')
                        )}
                      </td>
                    ))}
                    {deleteOnOff && (
                      <td>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={selectedRows.includes(item.index)}
                          onChange={(event) => selectChkBox(event, item)}
                        />
                      </td>
                    )}
                    {updateOnOff && (
                      <td>
                        <button
                          type="button"
                          className="btn btn-s"
                          id="updateBtn"
                          onClick={() => editRow(event, item)}
                        >
                          {/* 버튼 중간 및 가장자리에 따른 포인터 인식이 다른 상황에서 동일한 id를 가져오기 위해서 id 같게 설정  */}
                          <span id="updateBtn">수정</span>
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
            {showTfoot && (
              <tfoot>
                <tr>
                  <td colSpan={headerGroups[0].headers.length}>
                    {showMoreDisplayBtn && (
                      <button
                        id="moreDisplayBtn"
                        className="btn btn-sm btn-outline-dark"
                        onClick={loadMoreRows}
                      >
                        <i className="bi bi-plus-lg" />
                        더보기
                      </button>
                    )}
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReactTableGrid;

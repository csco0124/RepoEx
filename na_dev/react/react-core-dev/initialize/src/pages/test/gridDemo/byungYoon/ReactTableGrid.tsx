import { useSortBy, useTable } from 'react-table';
import { Button } from 'react-bootstrap';
import React, { useRef, useEffect, useState } from 'react';
import $api from '../../../../common/CommonAxios';
import OperationModal from './OperationModal';
import './GridStyle.css';

const ReactTableGrid = () => {
  /**
   * state 정의
   */
  const [tableData, setTableData] = useState([]); // 테이블 구성 데이터
  const [isEditing, setIsEditing] = useState(false); // edit 기능을 위한 boolean 값
  const [updateCellData, setUpdateCellData] = useState(''); // 셀 업데이트 데이터
  const [deleteOnOff, setDeleteOnOff] = useState(false); // 삭제 기능 on/off
  const [updateOnOff, setUpdateOnOff] = useState(false); // 수정 기능 on/off
  const [updateRowData, setUpdateRowData] = useState(''); // 업데이트 시킬 행 데이터
  const [editedData, setEditedData] = useState({ rowIdx: '',colIdx: '',value: '' , uid:''}); // prettier-ignore
  const [selectedRows, setSelectedRows]: any = useState([]); // 삭제 데이터 체크 값
  const inputRef = useRef<HTMLInputElement>(null); // input 태그 창에 focus를 맞추기 위한 참조 기능
  const selectRef = useRef<HTMLSelectElement>(null); // select 태그 창에 focus를 맞추기 위한 참조 기능
  const modalRef: any = useRef(null); // 'OperationModal' 컴포넌트 참조

  /**
   * 렌더링 시 getData() 실행
   */
  useEffect(() => {
    getData();
  }, []);

  /**
   * 테이블 구성 데이터 셋팅
   */
  const getData = async () => {
    let res = await $api.get('/api/mby/data');
    setTableData(res.data);
  };

  /**
   * 테이블 구성 데이터 셋팅
   */
  const data = React.useMemo(
    () =>
      tableData.map((item: any) => ({
        uid: item.uid,
        DATA_PATH: item.dataPath,
        JSON_DATA: item.jsonData,
        DATA_INFO: item.dataInfo,
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
      { Header: 'JSON_DATA', accessor: 'JSON_DATA' },
      { Header: 'DATA_INFO', accessor: 'DATA_INFO' },
      { Header: 'STATUS_CODE', accessor: 'STATUS_CODE' },
      { Header: 'DELAY_TIME', accessor: 'DELAY_TIME' },
      { Header: 'METHOD_TYPE', accessor: 'METHOD_TYPE' },
    ],
    []
  );

  const tableInstance = useTable({ columns, data }, useSortBy); // colums , data 를 기반으로 table 인스턴스 생성

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance; // 테이블 기본 구성 인스턴스 생성

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
    if (confirm('수정하시겠습니까?')) {
      let data = {
        uid: editedData.uid, // 수정될 데이터 uid
        column: editedData.colIdx, // 수정될 데이터 column
        updateCellData: updateCellData, // 수정하고자 기입한 값
      };
      await $api.post('/api/mby/cell-new-data', data);
      setIsEditing(false);
      e.target.contentEditable = false;
      getData();
    } else {
      setIsEditing(false);
      e.target.contentEditable = false;
    }
  };

  /**
   * 컬럼 on/off
   */
  const onOffDeleteBtn = () => setDeleteOnOff(!deleteOnOff); // 삭제 버튼
  const onOffUpdateBtn = () => setUpdateOnOff(!updateOnOff); // 수정 버튼

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
  const updateCellDataSet = (event: any) => {
    setUpdateCellData(event.target.value);
  };

  /**
   * 행 삭제
   */
  const deleteRow = async () => {
    if (confirm('삭제하시겠습니까?')) {
      let deleteDataArr = selectedRows.map((idx: any) => rows[idx].original);
      await $api.post('/api/mby/data-dy', deleteDataArr);
      getData();
    }
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <OperationModal
          ref={modalRef}
          getData={getData}
          updateRowData={updateRowData}
        />
        <Button variant="outline-secondary" onClick={onOffDeleteBtn}>
          {deleteOnOff ? (
            <i className="bi bi-arrow-return-left" />
          ) : (
            <i className="bi bi-trash3" />
          )}
        </Button>
        <Button variant="outline-dark" onClick={onOffUpdateBtn}>
          {updateOnOff ? (
            <i className="bi bi-arrow-return-left" />
          ) : (
            <i className="bi bi-pencil" />
          )}
        </Button>
      </div>
      <table id="reactTableGrid" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  &nbsp;
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <i className="bi bi-arrow-down-circle-fill"></i>
                      ) : (
                        <i className="bi bi-arrow-up-circle-fill"></i>
                      )
                    ) : (
                      ''
                    )}
                  </span>
                </th>
              ))}
              {deleteOnOff && (
                <th>
                  <Button variant="outline-secondary" onClick={deleteRow}>
                    <i className="bi bi-trash3" />
                  </Button>
                </th>
              )}
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
                      checked={selectedRows.includes(item.index)}
                      onChange={(event) => selectChkBox(event, item)}
                    />
                  </td>
                )}
                <td>
                  {updateOnOff && (
                    <Button
                      id="updateBtn"
                      style={{ border: 'none' }}
                      variant="outline-secondary"
                      onClick={() => editRow(event, item)}
                    >
                      {/* 버튼 중간 및 가장자리에 따른 포인터 인식이 다른 상황에서 동일한 id를 가져오기 위해서 id 같게 설정  */}
                      <i id="updateBtn" className="bi bi-pencil" />
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReactTableGrid;

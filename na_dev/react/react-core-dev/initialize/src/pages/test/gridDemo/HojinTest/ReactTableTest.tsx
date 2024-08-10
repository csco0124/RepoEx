import React, { useState, useMemo, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useTable, useFilters } from 'react-table';
import $api from '../../../../common/CommonAxios';
import AddDataModal from './AddDataModal';

// Column 인터페이스 정의
interface Column {
  Header: string;
  accessor: string;
}

function ReactTableTest({
  data,
  columns,
  handleDeleteRow,
  handleEditRow,
}: {
  data: any[];
  columns: Column[];
  handleDeleteRow: (rowIndex: number) => void;
  handleEditRow: (rowIndex: number, newData: any) => void;
}) {
  //테이블 인스턴스 생성
  const tableInstance = useTable({ columns, data }, useFilters);

  // 테이블 인스턴스에서 필요한 속성 추출
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const [editRowIndex, setEditRowIndex] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<any>({}); // 배열의 타입을 명시

  const handleEditStart = (rowIndex: number, rowData: any) => {
    //수정 시작 시 해당 행 인덱스와 행 데이터 설정
    setEditRowIndex(rowIndex);
    setEditedData(rowData);
  };

  const handleEditCancel = () => {
    // 수정 취소 시 상태 초기화
    setEditRowIndex(null);
    setEditedData({});
  };

  const handleEditSave = () => {
    if (editRowIndex !== null) {
      // 수정 저장 시 수정된 데이터와 함꼐 처리 함수 호출
      handleEditRow(editRowIndex, editedData);
      setEditRowIndex(null);
      setEditedData({});
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // 입력 필드 값 변경 시 상태 업데이트
    setEditedData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <Table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>
                {column.render('Header')}
                <div>{column.canFilter ? column.render('Filter') : null}</div>
              </th>
            ))}
            <th>삭제</th>
            <th>수정</th>
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, rowIndex) => {
          prepareRow(row);
          const rowData = row.original;
          const isEditing = editRowIndex === rowIndex;

          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteRow(rowIndex)}
                >
                  삭제
                </Button>
              </td>
              <td>
                {!isEditing && (
                  <Button
                    variant="info"
                    onClick={() => handleEditStart(rowIndex, rowData)}
                  >
                    수정
                  </Button>
                )}
                {isEditing && (
                  <>
                    <Button variant="success" onClick={handleEditSave}>
                      저장
                    </Button>
                    <Button variant="secondary" onClick={handleEditCancel}>
                      취소
                    </Button>
                  </>
                )}
              </td>
            </tr>
          );
        })}
        {editRowIndex !== null && (
          <tr>
            {columns.map((column, columnIndex) => (
              <td key={columnIndex}>
                <input
                  type="text"
                  name={column.accessor}
                  value={editedData[column.accessor] || ''}
                  onChange={handleInputChange}
                />
              </td>
            ))}
            <td colSpan={2}></td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

export default function App() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState<any[]>([]); // 배열의 타입을 명시

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchData(); // 컴포넌트가 마운트되었을 때 데이터를 조회하기 위해 fetchData 함수를 호출
  }, []); // 빈 배열을 전달하여 한 번만 실행되도록 설정

  const fetchData = async () => {
    try {
      const response = await $api.get(
        '/api/dummy/getDataList?pageNum=1&rowCnt=10'
      );
      console.log(response);
      setData(response.data.dataList); // 받아온 데이터를 상태에 저장
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddData = (newData: any): string => {
    // 기존 데이터 배열에 새로운 데이터를 추가
    setData((prevData) => [...prevData, newData]);
    setShow(false);
    return '데이터가 성공적으로 추가되었습니다.';
  };

  const handleDeleteRow = async (rowIndex: number) => {
    try {
      if (confirm('삭제하시겠습니까?')) {
        const rowData = data[rowIndex]; //삭제할 행의 데이터
        await $api.post('/api/dummy/deleteData', rowData);
        setData((prevData) => {
          const newData = [...prevData];
          newData.splice(rowIndex, 1);
          return newData;
        });
      }
    } catch (error) {
      console.error('데이터 삭제 중에 오류가 발생했습니다:', error);
    }
  };

  const handleEditRow = async (rowIndex: number, newData: any) => {
    try {
      if (confirm('수정하시겠습니까?')) {
        await $api.post('/api/dummy/updateData', newData);
        setData((prevData) => {
          const newDataArray = [...prevData];
          newDataArray[rowIndex] = newData;
          return newDataArray;
        });
      }
    } catch (error) {
      console.error('데이터 수정 중에 오류가 발생했습니다:', error);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: '데이터 경로',
        accessor: 'dataPath',
        Filter: DefaultColumnFilter,
      },
      {
        Header: 'JSON 데이터',
        accessor: 'jsonData',
        Filter: DefaultColumnFilter,
      },
      {
        Header: '데이터 정보',
        accessor: 'dataInfo',
        Filter: DefaultColumnFilter,
      },
      {
        Header: '상태코드',
        accessor: 'statusCode',
        Filter: SelectColumnFilter,
      },
      {
        Header: '지연시간',
        accessor: 'delayTime',
        Filter: DefaultColumnFilter,
      },
      {
        Header: '메소드Type',
        accessor: 'methodType',
        Filter: SelectColumnFilter,
      },
    ],
    []
  );

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        생성
      </Button>

      <AddDataModal
        show={show}
        handleClose={handleClose}
        handleAddData={handleAddData}
      />

      <ReactTableTest
        columns={columns}
        data={data}
        handleDeleteRow={handleDeleteRow}
        handleEditRow={handleEditRow}
      />
    </>
  );
}

function DefaultColumnFilter({
  column: { filterValue, setFilter },
}: {
  column: { filterValue: any; setFilter: (value: any) => void };
}) {
  return (
    <input
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      placeholder="검색"
    />
  );
}
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}: {
  column: {
    filterValue: any;
    setFilter: (value: any) => void;
    preFilteredRows: any;
    id: string;
  };
}) {
  // 필터링에 필요한 고유한 값 목록 가져오기
  const options = useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row: any) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <select
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">전체</option>
      {options.map((option, i) => (
        <option key={i} value={String(option)}>
          {String(option)}
        </option>
      ))}
    </select>
  );
}

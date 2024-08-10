import React, {
  useState,
  useMemo,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { useTable, useFilters, useSortBy } from 'react-table';
import $api from '../../../../../common/CommonAxios';
import AddDataModal from './AddDataModal';
import MenuDepth from '../../../../common/MenuDepth';

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
  handleShow,
}: {
  data: any[];
  columns: Column[];
  handleDeleteRow: (rowIndex: number) => void;
  handleEditRow: (rowIndex: number) => void;
  handleShow: () => void;
}) {
  //테이블 인스턴스 생성
  const tableInstance = useTable({ columns, data }, useFilters, useSortBy);

  // 테이블 인스턴스에서 필요한 속성 추출
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const [editRowIndex, setEditRowIndex] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<any>({}); // 배열의 타입을 명시

  const [editModalData, setEditModalData] = useState<any>({});
  const [showEditModal, setShowEditModal] = useState(false);

  //편집 모달을 열고 초기 데이터를 설정하도록 함수 수정
  const handleEditStart = (rowIndex: number, rowData: any) => {
    setEditModalData(rowData);
    setShowEditModal(true);
  };

  //편집 취소 처리하는 함수
  const handleEditModalClose = () => {
    setShowEditModal(false);
    setEditModalData({});
  };

  // 수정 저장 시 수정된 데이터와 함꼐 처리 함수 호출
  const handleEditSave = () => {
    if (editModalData) {
      const newData = { ...editModalData };
      handleEditRow(newData);
      setShowEditModal(false);
      setEditModalData({});
    }
  };

  const methodTypes = [
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'PATCH',
    'HEAD',
    'OPTIONS',
    'TRACE',
    'CONNECT',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // 입력 필드 값 변경 시 상태 업데이트
    setEditedData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className="content">
      <MenuDepth />
      <div className="cont-item">
        <div className="searchItem mb-3">
          <button type="button" className="btn-icon" onClick={handleShow}>
            <i
              id="addBtn"
              className="icon-icon20"
              data-bs-toggle="tooltip"
              data-bs-html="true"
              title="등록"
            />
          </button>
        </div>
        <Table {...getTableProps()}>
          <colgroup>
              <col width="10%" />
              <col width="auto" />
              <col width="10%" />
              <col width="10%" />
              <col width="10%" />
              <col width="10%" />
              <col width="7%" />
              <col width="7%" />
          </colgroup>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    
                  >
                    <div
                      onClick={() => column.toggleSortBy()}
                      style={{ cursor: 'pointer' }}
                    >
                      {column.render('Header')}
                    </div>
                    <div>
                      {column.canFilter ? column.render('Filter') : null}
                    </div>
                  </th>
                ))}
                <th>
                  수정
                </th>
                <th>
                  삭제
                </th>
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
                    {!isEditing && (
                      <Button
                        variant="info"
                        onClick={() => handleEditStart(rowIndex, rowData)}
                        className="btn btn-s"
                      >
                        수정
                      </Button>
                    )}
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteRow(rowIndex)}
                      className="btn btn-s"
                    >
                      삭제
                    </Button>
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
          <Modal show={showEditModal} onHide={handleEditModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>수정</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form className="form-itme-div">
                <Form.Group controlId="dataPath">
                  <Form.Label>데이터 경로</Form.Label>
                  <Form.Control
                    type="text"
                    readOnly
                    disabled
                    value={editModalData.dataPath || ''}
                    onChange={(e: any) =>
                      setEditModalData((prevData: any) => ({
                        ...prevData,
                        dataPath: e.target.value,
                      }))
                    }
                  />
                </Form.Group>
                <Form.Group controlId="jsonData">
                  <Form.Label>JSON 데이터</Form.Label>
                  <Form.Control
                    type="text"
                    value={editModalData.jsonData || ''}
                    onChange={(e: any) =>
                      setEditModalData((prevData: any) => ({
                        ...prevData,
                        jsonData: e.target.value,
                      }))
                    }
                  />
                </Form.Group>
                <Form.Group controlId="dataInfo">
                  <Form.Label>데이터 정보</Form.Label>
                  <Form.Control
                    type="text"
                    value={editModalData.dataInfo || ''}
                    onChange={(e: any) =>
                      setEditModalData((prevData: any) => ({
                        ...prevData,
                        dataInfo: e.target.value,
                      }))
                    }
                  />
                </Form.Group>
                <Form.Group controlId="statusCode">
                  <Form.Label>상태 코드</Form.Label>
                  <Form.Control
                    type="text"
                    value={editModalData.statusCode || ''}
                    onChange={(e: any) =>
                      setEditModalData((prevData: any) => ({
                        ...prevData,
                        statusCode: e.target.value,
                      }))
                    }
                  />
                </Form.Group>
                <Form.Group controlId="delayTime">
                  <Form.Label>지연 시간</Form.Label>
                  <Form.Control
                    type="text"
                    value={editModalData.delayTime || ''}
                    onChange={(e: any) =>
                      setEditModalData((prevData: any) => ({
                        ...prevData,
                        delayTime: e.target.value,
                      }))
                    }
                  />
                </Form.Group>
                <Form.Group controlId="methodType">
                  <Form.Label>메소드Type</Form.Label>
                  <Form.Control
                    readOnly
                    disabled
                    as="select"
                    value={editModalData.methodType || ''}
                    onChange={(e: any) =>
                      setEditModalData((prevData: any) => ({
                        ...prevData,
                        methodType: e.target.value,
                      }))
                    }
                  >
                    {methodTypes.map((item) => (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                //variant="success"
                onClick={handleEditSave}
                className="btn btn-sm btn-primary"
              >
                저장
              </Button>
              <Button variant="secondary" onClick={handleEditModalClose}
                className="btn btn-sm btn-secondary">
                취소
              </Button>
            </Modal.Footer>
          </Modal>
        </Table>
      </div>
    </div>
  );
}

export default function App() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [pageNum, setPageNum] = useState(1); // 페이지 번호 상태
  const [rowCnt] = useState(9); // 한 번에 가져올 데이터
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasMore, setHasMore] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchData(); // 컴포넌트가 마운트되었을 때 데이터를 조회하기 위해 fetchData 함수를 호출
  }, []); // 빈 배열을 전달하여 한 번만 실행되도록 설정

  const fetchData = async () => {
    try {
      const response = await $api.get(
        `/api/dummy/getDataList?pageNum=${pageNum}&rowCnt=${rowCnt}`
      );
      setData(response.data.dataList); // 받아온 데이터를 상태에 저장
      setHasMore(true); // 추가 데이터가 있는 것으로 설정
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMoreData = useCallback(async () => {
    try {
      setIsLoading(true);
      const nextPageNum = pageNum + 1; // 다음 페이지 번호 계산
      const response = await $api.get(
        `/api/dummy/getDataList?pageNum=${nextPageNum}&rowCnt=${rowCnt}`
      );
      const newData = response.data.dataList;
      setHasMore(newData.length > 0); // 추가 데이터가 있는지 여부를 업데이트

      if (newData.length > 0) {
        setData((prevData) => [...prevData, ...newData]);
      }
      setPageNum(nextPageNum); // 페이지 번호 업데이트
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }, [pageNum, rowCnt]);

  const handleScroll = useCallback(() => {
    const container = containerRef.current as HTMLElement;
    if (container) {
      const scrollTop = container.scrollTop;
      const clientHeight = container.clientHeight;
      const scrollHeight = container.scrollHeight;

      if (
        scrollTop + clientHeight >= scrollHeight - 200 &&
        !isLoading &&
        hasMore
      ) {
        fetchMoreData();
      }
    }
  }, [isLoading, hasMore, fetchMoreData]);

  useEffect(() => {
    const container = containerRef.current as HTMLElement;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);

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

  const handleEditRow = async (newData: any = {}) => {
    try {
      if (confirm('수정하시겠습니까?')) {
        await $api.post('/api/dummy/updateData', newData);
        setData((prevData) => {
          const rowIndex = prevData.findIndex((row) => row.id === newData.id);
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
      <AddDataModal
        show={show}
        handleClose={handleClose}
        handleAddData={handleAddData}
      />
      <div ref={containerRef} style={{ height: '700px', overflow: 'scroll' }}>
        <ReactTableTest
          columns={columns}
          data={data}
          handleDeleteRow={handleDeleteRow}
          handleEditRow={handleEditRow}
          handleShow={handleShow}
        />
        {isLoading && <h4>Loading...</h4>}
        {!hasMore && <h4>데이터가 없습니다.</h4>}
      </div>
    </>
  );
}

function DefaultColumnFilter({
  column: { filterValue = '', setFilter },
}: {
  column: { filterValue?: any; setFilter: (value: any) => void };
}) {
  return (
    <input
    className="form-input mt-2"
    value={filterValue}
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
      className="form-select mt-2"
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

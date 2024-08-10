import React, { useEffect, useState } from 'react';
import { useTable, useFilters, FilterProps, Column } from 'react-table';
import $api from '../../../../common/CommonAxios';
import AddDataModal from './AddDataModal';
import ReactTable from './ReactTable';

interface modalData {
  uid: number;
  dataPath: string;
  dataInfo: string;
  methodType: string;
  statusCode: number;
  delayTime: number;
  jsonData: string;
}

function App() {
  const [data, setData] = useState<modalData[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<modalData[]>([]);
  const [header, setHeader] = useState('');
  
  // 페이지 필요 재료 페이지 인덱스, 사이즈, 마지막 페이지
  const [pageNum, setPageNum] = useState(1);
  const [rowCnt, setRowCnt] = useState(3);
  const [lastPage, setLastPage] = useState(0);

  const edit = 'edit';
  const add = 'add';
  const del = 'delete';

  useEffect(() => {
    getData();
  }, [pageNum,rowCnt]);

  // ajax
  const getData = async () => {
    const res = await $api.get(`/api/dummy/getDataList?pageNum=${pageNum}&rowCnt=${rowCnt}`, { withCredentials: false });
    setData(res.data.dataList);
    setLastPage(res.data.totalPage)
  };
  
  const handleClickDeleteData = async (e: any) => {
    console.log("pageNum=",pageNum)
    console.log("rowCnt=",rowCnt)
    if (window.confirm('삭제하시겠습니까?')) {
      await $api.post('/api/dummy/deleteData', e);
      getData();
    }
  };


  // modal
  const handleClickAddOpenPop = () => {
    resetModal();
    setHeader(add);
    openModal();
  };

  const handleClickEditOpenPop = (e: any) => {
    setHeader(edit);
    setModalData(e);
    openModal();
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    resetModal();
    setModalOpen(false);
  };

  const resetModal = () => {
    setModalData([]);
  };

  // filter
  const filterTypes = React.useMemo(() => {
    return {
      text: (rows: any, id: any, filterValue: any) => {
        return rows.filter((row: any) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    };
  }, []);

  function DefaultColumnFilter() {
    return (
      <div style={{height:24}}></div>
    );
  }

  function InputColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }: FilterProps<modalData>) {
    const count = preFilteredRows.length;
    return (
      <input
        value={filterValue || ''}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
        placeholder={`Search ${count} records...`}
      />
    );
  }

  function SelectmMethodTypesColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
  }: FilterProps<modalData>) {
    const methodTypes = [ "GET","POST","PUT","DELETE","PATCH","HEAD","OPTIONS","TRACE","CONNECT" ];

    return (
      <select
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option value="">All</option>
        {methodTypes.map((option: any, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }
  function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
  }: FilterProps<modalData>) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
      const options = new Set()
      preFilteredRows.forEach(row => {
        options.add(row.values[id])
      })
      return [...options.values()]
    }, [id, preFilteredRows])
  
    // Render a multi-select box
    return (
      <select
        value={filterValue}
        onChange={e => {
          setFilter(e.target.value || undefined)
        }}
      >
        <option value="">All</option>
        {options.map((option: any, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    )
  }

  // pagination
  const canNextPage = pageNum === lastPage ? false : true
  const canPreviousPage = pageNum === 1 ? false : true
  
  const previousPage = () => {
    setPageNum((prevCount) => {
      const newCount = prevCount - 1;
      return newCount;
    });
  }
  const nextPage = () => {
    setPageNum((prevCount) => {
      const newCount = prevCount + 1;
      return newCount;
    });
  }
  const gotoPage = (number : number) => {
    setPageNum(() => {
      return number;
    });
  }

  const handleChangeSelectData = (e:any) => {
    setPageNum(() => {
      const newCount = 1 ;
      return newCount;
    });
    setRowCnt(Number(e.target.value))
  }
  
  // react table
  const defaultColumn = React.useMemo(() => {
    return {
      Filter: DefaultColumnFilter,
    };
  }, []);

  const columns: Column<modalData>[] = React.useMemo(
    () => [
      {
        Header: 'dataPath',
        accessor: 'dataPath',
        Filter: InputColumnFilter,
      },
      {
        Header: 'dataInfo',
        accessor: 'dataInfo',
        Filter: InputColumnFilter,
      },
      {
        Header: 'methodType',
        accessor: 'methodType',
        Filter: SelectmMethodTypesColumnFilter,
      },
      {
        Header: 'statusCode',
        accessor: 'statusCode',
        Filter: SelectColumnFilter,
      },
      {
        Header: 'delayTime',
        accessor: 'delayTime',
      },
      {
        Header: 'jsonData',
        accessor: 'jsonData',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable<modalData>(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
    },
    useFilters,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        ...columns,
        {
          id: 'buttons',
          Cell: ({ row }:any) => (
            <div style={{ display: 'flex' }}>
              <button onClick={() => handleClickEditOpenPop(row.original)}>{edit}</button>
              <button onClick={() => handleClickDeleteData(row.original)}>{del}</button>
            </div>
          ),
        },
      ]);
    }
  );

  return (
    <React.Fragment>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {data.length > 0 ? (
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        ) : null}
        <tfoot>
          <tr>
            <td colSpan={columns.length} style={{ textAlign: 'center' }}>
              <button onClick={handleClickAddOpenPop}>+NEW data</button>
            </td>
          </tr>
        </tfoot>
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(1)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(lastPage)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageNum} of {lastPage}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageNum}
            max={lastPage}
            min={1}
            onChange={e => {
              const page = Number(e.target.value)
              if(page>0) {
                gotoPage(page)
              }
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={rowCnt}
          onChange={e => {
            handleChangeSelectData(e)
          }}
        >
          {[1, 2, 3, 4, 5].map(rowCnt => (
            <option key={rowCnt} value={rowCnt} >
              Show {rowCnt}
            </option>
          ))}
        </select>
      </div>
      {modalOpen && (
        <AddDataModal open={modalOpen} close={closeModal} getData={getData} header={header} modalData={modalData} />
      )}
      {modalOpen && (
        <ReactTable columns={columns} data={data} />
      )}
    </React.Fragment>
    
  );
}

export default App;

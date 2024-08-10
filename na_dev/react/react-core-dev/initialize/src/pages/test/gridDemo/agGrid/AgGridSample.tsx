import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import $api from "../../../../common/CommonAxios";
import { Column } from "react-table";
import ReactTable, { InputColumnFilter, SelectColumnFilter, SelectmMethodTypesColumnFilter } from "../tabulator/ReactTable";
import AddDataModal from "../tabulator/AddDataModal";
interface modalData {
  uid: number;
  dataPath: string;
  dataInfo: string;
  methodType: string;
  statusCode: number;
  delayTime: number;
  jsonData: string;
}

function AgGridSample() {

  const [data, setData] = useState<modalData[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [rowCnt, setRowCnt] = useState(3);
  const [lastPage, setLastPage] = useState(0);
  
  useEffect(() => {
    getData();
  }, [pageNum,rowCnt]);
  
  useEffect(() => {
    setRenderChart2(<ReactTable columns={columns} data={data} props={props}/>)
  }, [data]);
  // ajax
  const getData = async () => {
    const res = await $api.get(`/api/dummy/getDataList?pageNum=${pageNum}&rowCnt=${rowCnt}`, { withCredentials: false });
    setData(() => {
      const newData = res.data.dataList
      return newData;
    });
    setLastPage(res.data.totalPage)
  };
  

  let [renderChart2, setRenderChart2] = useState<JSX.Element>();
  //page
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

  const handleClickDeleteData = async (data: any, pageNum:number,rowCnt:number) => {
    console.log(pageNum)
    console.log(rowCnt)
    if (window.confirm('삭제하시겠습니까?')) {
      await $api.post('/api/dummy/deleteData', data);
      getData();
    }
  };

  // model
  const [modalOpen, setModalOpen] = useState(false);
  const [usemodal, setusemodal] = useState(false);
  const [modalData, setModalData] = useState<modalData[]>([]);
  const [header, setHeader] = useState('');
  
  const edit = 'edit';
  const add = 'add';
  const del = 'delete';
  
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


  const handleClickAddOpenPop = () => {
    setHeader(() => {
      const newHeader =  add;
      return newHeader;
    });
    resetModal();
    openModal();
  };

  const handleClickEditOpenPop = (e: any) => {
    setHeader(() => {
      const newHeader =  edit;
      return newHeader;
    });
    setModalData(e);
    openModal();
  };

  const props = {
    getData : getData,
    handleClickDeleteData : handleClickDeleteData,
    page: {
      pageNum:pageNum,
      rowCnt:rowCnt,
    },
    modal:{
      modalOpen : modalOpen,
      usemodal:usemodal,
      openModal:openModal,
      closeModal:closeModal,
      handleClickAddOpenPop:handleClickAddOpenPop,
      handleClickEditOpenPop:handleClickEditOpenPop,
      
    }
  }
  
  return (
    <React.Fragment>
      {renderChart2}
      <div style={{ textAlign: 'center' }}>
        <button onClick={handleClickAddOpenPop}>+NEW data</button>
      </div>

        <br/>
        <br/>
        <br/>

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
      <br/>
      <br/>
      <br/>
      {modalOpen && (
        <AddDataModal open={modalOpen} close={closeModal} getData={getData} header={header} modalData={modalData} />
      )}
    </React.Fragment>
  );
}

export default AgGridSample;

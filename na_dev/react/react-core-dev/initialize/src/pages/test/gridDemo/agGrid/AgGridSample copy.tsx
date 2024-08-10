import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  RowValueChangedEvent,
} from 'ag-grid-community';
import $api from "../../../../common/CommonAxios";
import { Column } from "react-table";
import ReactTable, { InputColumnFilter, SelectColumnFilter, SelectmMethodTypesColumnFilter } from "../tabulator/ReactTable";

interface ICar {
  id : number;
  make: string;
  model: string;
  price: number;
}
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

  useEffect(() => {
    getData();
  }, [pageNum,rowCnt]);

  // ajax
  const getData = async () => {
    const res = await $api.get(`/api/dummy/getDataList?pageNum=${pageNum}&rowCnt=${rowCnt}`, { withCredentials: false });
    setData(res.data.dataList);
  };
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


  // 추가 시 id값 구하기 위해서 지정 idCount++ 사용예정 
  // DB연결시 id autoincrement로 중복없이 사용 가능해서 지울 예정
  let idCount = 4;

  const gridRef = useRef<AgGridReact>(null);

  const [rowData] = useState<ICar[]>([
    { id:1, make: "Toyota", model: "Celica", price: 35000, },
    { id:2, make: "Ford", model: "Mondeo", price: 32000 },
    { id:3, make: "Porsche", model: "Boxster", price: 72000 },
  ]);
  const [columnDefs] = useState<ColDef[]>([
    { field: "make" },
    { field: "model" },
    { field: "price" },
    {
      field: "del",
      checkboxSelection: true,
      editable: false,
      sortable: false,
    },
    {
      field: 'selectbox',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ["집","가고","싶다"],
      },
    },
  ]);

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      editable: true,
      sortable: true,
    };
  }, []);

  // 로우 값 변경 시  일어나는 이벤트
  const onRowValueChanged = useCallback((event: RowValueChangedEvent) => {
    let data : ICar = event.data;
    let index : any = event.rowIndex;

    let yesOrNo =  confirm('변경하실?') 
    if(!yesOrNo){
      // 취소 시 되돌리기 해야함
      alert('ㄴㄴ')
    }
    rowData[index] = data
    // 성공 시 axios 사용 가능
    console.log(data);
    console.log(rowData);

  }, []);
  
  // 삭제 시 일어나는 이벤트 (chackbox 선택되어야지 삭제가 가능)
  const onRemoveSelected = useCallback((event: any) => {
    let selectedRowData  = gridRef.current!.api.getSelectedRows();
    const test = gridRef.current!.api.getSelectedNodes()[0].rowIndex ;
    console.log(test)
    console.log(selectedRowData);
    // 삭제 시 selectedRowData.id를 기준으로 삭제 이벤트 가능 (axios 사용)
    gridRef.current!.api.applyTransaction({ remove: selectedRowData });
    console.log(rowData);
  }, []);
  
  const onAddRow = useCallback(
    () => {
      gridRef.current!.api.applyTransaction({ add: [{id:idCount}] });
      const test : ICar = {
        id: idCount,
        make: "",
        model: "",
        price: 0
      }
      rowData.push(test);
      idCount++
      // console.log(test?.add)
      console.log(rowData);
    },[rowData]
  );
  const test = () =>{
    return 'test'
  }
  const props = {
    test : test()
  }

  return (
    <React.Fragment>
    <button onClick={onAddRow}>add rowData</button>
    <button onClick={onRemoveSelected}>del rowData</button>
    <div className="ag-theme-alpine" style={{ height: 600, width: 1500 }}>
      <AgGridReact
        ref={gridRef}
        rowData={rowData} 
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onRowValueChanged={onRowValueChanged}
        editType="fullRow"
      ></AgGridReact>
    </div>
    <ReactTable columns={columns} data={data} props={props}/>
    </React.Fragment>
  );
}

export default AgGridSample;

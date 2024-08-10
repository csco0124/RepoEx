import React, { useContext, useEffect, useState, } from 'react'
import $api from '../../../../../common/CommonAxios';
import DataMoodal from './DataModal';
import alertContext from "../../../../../store/alert-context";

import {
    Table as ReactTable,
    useReactTable,
    getCoreRowModel,
    ColumnDef,
    flexRender,
    getSortedRowModel,
    SortingState,
} from '@tanstack/react-table'
import Modal from '../../modals/Modal';
import Pagenation from './Pagination';
import MenuDepth from '../../../../common/MenuDepth';



interface modalData {
    uid: number;
    dataPath: string;
    dataInfo: string;
    methodType: string;
    statusCode: number;
    delayTime: number;
    jsonData: string;
}

function ReactTable_tanstack() {

    const [sorting, setSorting] = React.useState<SortingState>([])
    const commAlert = useContext(alertContext);
    // table data
    const [data, setData] = useState<modalData[]>([]);

    // page data
    const [pageNum, setPageNum] = useState(1);
    const [rowCnt, setRowCnt] = useState(5);
    const [totalPage, setTotalPage] = useState(0);
    const [searchStart, setSearchStart] = useState(0);
    
    // search data
    const [searchType, setSearchType] = useState(0);
    const [searchStr, setSearchStr] = useState(''); 
    const [tempSearchType, setTempSearchType] = useState(0);
    const [tempSearchStr, setTempSearchStr] = useState(''); //임시
    const optionVal = [ 0 , 1 , 2 , 3 , 4 ];
    const optionStr = ['선택','경로','설명','호출 방식','상태 코드'];

    // modal data
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState<modalData[]>([]);
    const [header, setHeader] = useState('');

    const edit = '수정';
    const add = '추가';
    const del = '삭제';


    // axios
    const getData = async () => {
        let result = await $api.get('/api/dummy/getDataList?pageNum='+pageNum+'&rowCnt='+rowCnt+'&searchType='+searchType+'&searchStr='+searchStr);
        if (JSON.stringify(data) != JSON.stringify(result.data.dataList)) {
            setData(result.data.dataList);
            setTotalPage(result.data.totalPage); 
        }
        console.log(result);
    };

    const handleClickDeleteData = async (e: any) => {
        if (window.confirm('삭제하시겠습니까?')) {
        await $api.post('/api/dummy/deleteData', e);
        getData();
        }
    };

    useEffect(() => {
        getData();
    }, [pageNum,rowCnt,searchType,searchStr]);

    // 모달
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

    const columns = React.useMemo<ColumnDef<modalData>[]>(
        () => [
        {
            id: 'dataPath',
            header: '경로',
            footer: props => props.column.id,
            accessorKey: 'dataPath',
        },
        {
            id: 'dataInfo',
            header: '설명',
            footer: props => props.column.id,
            accessorKey: 'dataInfo',
        },
        {
            id: 'methodType',
            header: '호출 방식',
            footer: props => props.column.id,
            accessorKey: 'methodType',
        },
        {
            id: 'statusCode',
            header: '상태 코드',
            footer: props => props.column.id,
            accessorKey: 'statusCode',
        },
        {
            id: 'delayTime',
            header: '지연시간',
            footer: props => props.column.id,
            accessorKey: 'delayTime',
        },
        {
            id: 'jsonData',
            header: '데이터',
            footer: props => props.column.id,
            accessorKey: 'jsonData',
        },
        {
            id: 'edit',
            header: ( ) => (
                <div>수정</div>
            ),
            cell: ({ row }) => (
            <div className="btn-area right">
                <button className="btn btn-s btn-primary" onClick={() => handleClickEditOpenPop(row.original)}>{edit}</button>
                <button className="btn btn-s btn-outline-secondary" onClick={() => handleClickDeleteData(row.original)}>{del}</button>
            </div>
            ),
        },
    ],
    [pageNum,rowCnt,searchType,searchStr,data]
    )
    const table = useReactTable<modalData>({
        data,
        columns,
        state: {
            sorting,
        },
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
    })

    const paging = {
        pageNum: pageNum,
        totalPage: totalPage,
        setPageNum: setPageNum,
    }
    return (
        <div className="content">
            <MenuDepth />
            <div className="cont-item">
                <div className="searchItem mb-3">
                    <div>
                        <select className='form-select' value={rowCnt} onChange={e => {setPageNum(1); setRowCnt(Number(e.target.value));}}>
                        {[ 3, 5, 10, 20].map(rowCnt => (
                            <option key={rowCnt} value={rowCnt}>
                            {rowCnt}개 보기
                            </option>
                        ))}
                        </select>
                    </div>
                    <div>
                        <select className='form-select' value={tempSearchType} onChange={e => {setTempSearchType(Number(e.target.value));}}>
                        {optionVal.map(i => (
                            <option key={i} value={i}>
                            {optionStr[i]}
                            </option>
                        ))}
                        </select>
                    </div>
                    <div>
                        <input type="text" className='form-input' value={tempSearchStr} onChange={(e) => setTempSearchStr(e.target.value)} />                    </div>
                    <div>
                        <button className='btn btn-sm btn-primary'
                        onClick={() => {
                        if(tempSearchType != 0 && tempSearchStr.length > 0){
                            setSearchType(tempSearchType); 
                            setSearchStr(tempSearchStr); 
                            setPageNum(1); 
                            setSearchStart(searchStart+1);
                        }else{
                            if(tempSearchType == 0){
                            commAlert.call({
                                message: '검색조건을 선택해 주세요',
                                onClose: () => {
                                }
                            });
                            }else if(tempSearchStr.length == 0){
                                commAlert.call({
                                    message: '검색 키워드를 입력해 주세요',
                                    onClose: () => {
                                }
                            });
                            }
                        }
                        }}>
                        검색
                        </button>
                    </div>
                </div>
                <table className="table">
                    <colgroup>
                        <col width="10%" />
                        <col width="10%" />
                        <col width="7%" />
                        <col width="7%" />
                        <col width="7%" />
                        <col width="auto" />
                        <col width="15%" />
                    </colgroup>
                    <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => {
                            return (
                                <th key={header.id} colSpan={header.colSpan}>
                                    {header.isPlaceholder ? null : (
                                    <div
                                        {...{
                                        className: header.column.getCanSort()
                                            ? 'cursor-pointer select-none'
                                            : '',
                                        onClick: header.column.getToggleSortingHandler(),
                                        }}
                                    >
                                        {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                        )}
                                        {{
                                        asc: ' 🔼 ',
                                        desc: ' 🔽',
                                        }[header.column.getIsSorted() as string] ?? null}
                                    </div>
                                    )}
                                </th>
                            )
                        })}
                        </tr>
                    ))}
                    </thead>
                    <tbody>
                    {table.getRowModel().rows.map(row => {
                        return (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => {
                            return (
                                <td key={cell.id}>
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                                </td>
                            )
                            })}
                        </tr>
                        )
                    })}
                    </tbody>
                    <tfoot>
                        <tr>
                        <td colSpan={columns.length}>
                            <button onClick={handleClickAddOpenPop}>+NEW data</button>
                        </td>
                        </tr>
                    </tfoot>
                </table>
                {modalOpen && (
                    <Modal>
                        <DataMoodal open={modalOpen} close={closeModal} getData={getData} header={header} modalData={modalData} />
                    </Modal>
                )}
                <Pagenation pageNum={pageNum} totalPage={totalPage} setPageNum={setPageNum }/>
            </div>
        </div>
    )
}

export default ReactTable_tanstack;

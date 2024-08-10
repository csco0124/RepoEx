

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import MenuDepth from '../../../../common/MenuDepth'
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import $api from '../../../../../common/CommonAxios';
import SetRowCnt from './SetRowCnt';
import DataMoodal from './DataModal';
import Modal from '../../modals/Modal';
import Search from './Search';

interface modalData {
    index?: number;
    uid: number;
    dataPath: string;
    dataInfo: string;
    methodType: string;
    statusCode: number;
    delayTime: number;
    jsonData: string;
}

const TanStackTableV2 =()=> {
    const [data, setData] = useState<modalData[]>([]);

    // page data
    const [pageNum, setPageNum] = useState(1);
    const [rowCnt, setRowCnt] = useState(20);
    const [totalPage, setTotalPage] = useState(-1); // 0으로 시작시 ref 나와서 안됨
    const [searchStart, setSearchStart] = useState(1);
    
    // search data
    const [searchType, setSearchType] = useState(0);
    const [searchStr, setSearchStr] = useState(''); 
    const [tempSearchType, setTempSearchType] = useState(0);
    const [tempSearchStr, setTempSearchStr] = useState(''); //임시
    const optionVal = [ 0 , 1 , 2 , 3 , 4 ];
    const optionStr = ['전체','경로','설명','호출 방식','상태 코드'];

    // modal data
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState<modalData[]>([]);
    const [header, setHeader] = useState('');

    const edit = '수정';
    const add = '추가';
    const del = '삭제';

    const columns = useMemo<ColumnDef<modalData>[]>(
        () => [
            {
                id: 'no',
                header: () => <span>NO.</span>,
                cell: info => 
                    <Fragment>
                        <div>{info.row.index+1}</div>
                    </Fragment>,
            },
            {
                id: 'dataPath',
                header: '경로',
                accessorKey: 'dataPath',
            },
            {
                id: 'dataInfo',
                header: '설명',
                accessorKey: 'dataInfo',
            },
            {
                id: 'methodType',
                header: '호출 방식',
                accessorKey: 'methodType',
            },
            {
                id: 'statusCode',
                header: '상태 코드',
                accessorKey: 'statusCode',
            },
            {
                id: 'delayTime',
                header: '지연시간',
                accessorKey: 'delayTime',
            },
            {
                id: 'jsonData',
                header: '데이터',
                accessorKey: 'jsonData',
            },
            {
                id: 'edit',
                header: () => <span>수정/삭제</span>,
                cell: info => 
                    <Fragment>
                        <div className="btn-area">
                            <button className="btn btn-s btn-primary" onClick={() => handleClickEditOpenPop(info.row.original,info.row.index)}>{edit}</button>
                            <button className="btn btn-s btn-outline-secondary" onClick={() => handleClickDeleteData(info.row.original)}>{del} </button>
                        </div>
                    </Fragment>,
            },
        ],[data]
    )
    
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })
    
    const [loading, setLoading] = useState(false); // 데이터 로딩 중 여부를 저장할 상태
    const targetRef = useRef<HTMLDivElement>(null); // 감지할 요소의 ref
    
    
    useEffect(() => {
        // Intersection Observer 생성
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1, // 감지 임계값 설정
        };
        const observer = new IntersectionObserver(handleIntersection, options);
        
        // 감지할 요소가 있을 경우에만 감지 등록
        if (targetRef.current) {
            observer.observe(targetRef.current);
        }

        return () => {
        // 컴포넌트 언마운트 시 감지 해제
            if (targetRef.current) {
                observer.unobserve(targetRef.current);
            }
        };
    }, [pageNum,searchStr]);

    // Intersection Observer 콜백 함수
    const handleIntersection: IntersectionObserverCallback = (entries) => {
        entries.forEach((entry) => {
        if (entry.isIntersecting && !loading) {
            fetchData();
        }
        });
    };
    // 새로운 데이터를 가져오는 함수
    const fetchData = () => {
        setLoading(true);
        setTimeout(async() => {
            const result = await $api.get('/api/dummy/getDataList?pageNum='+pageNum+'&rowCnt='+rowCnt+'&searchType='+searchType+'&searchStr='+searchStr);
            if(result.data.dataList.length>0){
                setData(prevData => [...prevData,...result.data.dataList]);
                setTotalPage(result.data.totalPage);
                setPageNum(pageNum+1)
            }
            setLoading(false);
        }, 150);
    };

    const handleClickAddOpenPop = () => {
        resetModal();
        setHeader(add);
        openModal();
    };

    const handleClickEditOpenPop = (e: any,index:number) => {
        const test = {
            ...e,index
        }
        setHeader(edit);
        setModalData(test);
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

    const handleClickDeleteData = async (e: any) => {
        if (window.confirm('삭제하시겠습니까?')) {
            await $api.post('/api/dummy/deleteData', e);
            fetchData();
            if(data.length===1 && pageNum !== 1){
                setPageNum((pageNum)=>{
                    const test = pageNum-1
                    return test
                })
            }
            const afterData = data.filter(id => id.uid !== e.uid)
            setData([...afterData])
        }
    };
    const handleClickUpdateData = (resData:any) => {
        data[resData.index]= resData
        setData([...data])
    }
    const handleClickAddData = () => {
        setPageNum(1);
        setData([]);
    }
    return (
        <div className="content" id='test'>
            <MenuDepth />
            <div className="cont-item">
                <div className="searchItem mb-3">
                    <SetRowCnt rowCnt={rowCnt} setPageNum={setPageNum} setRowCnt={setRowCnt} setData={setData} />
                    <Search
                        optionVal ={optionVal}
                        optionStr ={optionStr}
                        tempSearchType ={tempSearchType}
                        setTempSearchType ={setTempSearchType}
                        tempSearchStr ={tempSearchStr}
                        setTempSearchStr ={setTempSearchStr}
                        searchStart ={searchStart}
                        setSearchStart ={setSearchStart}
                        setSearchType ={setSearchType}
                        setSearchStr ={setSearchStr}
                        setPageNum ={setPageNum}
                        setData={setData}
                        setTotalPage ={setTotalPage}
                    />
                    <button onClick={handleClickAddOpenPop}>+NEW data</button>
                </div>
                <table className="table" >
                    <colgroup>
                        <col width="10%" />
                        <col width="10%" />
                        <col width="7%" />
                        <col width="7%" />
                        <col width="7%" />
                        <col width="7%" />
                        <col width="auto" />
                        <col width="18%" />
                    </colgroup>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id}>
                                        <div className='cursor-pointer select-none'>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody id='test'>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {loading && <div>Loading...</div>}
            {pageNum !== totalPage+1 &&
                <div ref={targetRef} />
            }
            {modalOpen && (
                <Modal>
                    <DataMoodal
                        open={modalOpen}
                        close={closeModal}
                        getData={fetchData}
                        header={header}
                        modalData={modalData}
                        handleClickAddData={handleClickAddData}
                        handleClickUpdateData={handleClickUpdateData}
                        />
                </Modal>
            )}
        </div>
    )
}
export default TanStackTableV2;
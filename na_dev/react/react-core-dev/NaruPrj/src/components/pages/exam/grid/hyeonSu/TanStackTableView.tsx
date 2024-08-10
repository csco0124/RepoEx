import React, { Fragment, useEffect, useState, } from 'react'
import $api from '../../../../../common/CommonAxios';
import DataMoodal from './DataModal';
import Modal from '../../modals/Modal';
import Pagenation from './Pagination';
import TanStackTable from './TanStackTable';
import { ColumnDef } from '@tanstack/react-table'
import Search from './Search';
import SetRowCnt from './SetRowCnt';
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

function TanStackTableView() {

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
    };

    const handleClickDeleteData = async (e: any) => {
        if (window.confirm('삭제하시겠습니까?')) {
            await $api.post('/api/dummy/deleteData', e);
            getData();
            if(data.length===1 && pageNum !== 1){
                setPageNum((pageNum)=>{
                    const test = pageNum-1
                    return test
                })
            }
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
                            <button className="btn btn-s btn-primary" onClick={() => handleClickEditOpenPop(info.row.original)}>{edit}</button>
                            <button className="btn btn-s btn-outline-secondary" onClick={() => handleClickDeleteData(info.row.original)}>{del} </button>
                        </div>
                    </Fragment>,
            },
        ],[data]
    )

    return (
        <div className="content">
            <MenuDepth />
            <div className="cont-item">
                <div className="searchItem mb-3">
                    <SetRowCnt rowCnt={rowCnt} setPageNum={setPageNum} setRowCnt={setRowCnt} />
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
                    />
                </div>
                {data.length>0 && (
                    <TanStackTable data={data} column={columns} />
                )}
                <div className='btn-area'>
                    <button onClick={handleClickAddOpenPop}>+NEW data</button>
                </div>
                <Pagenation pageNum={pageNum} totalPage={totalPage} setPageNum={setPageNum }/>
            </div>
            {modalOpen && (
                <Modal>
                    <DataMoodal open={modalOpen} close={closeModal} getData={getData} header={header} modalData={modalData} />
                </Modal>
            )}
        </div>
    )
}

export default TanStackTableView;

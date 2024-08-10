import { useState, useEffect, useMemo, useContext, useRef} from 'react';
import { useTable, useSortBy } from 'react-table';
import { Modal } from 'react-bootstrap';
import $api from '../../../../../common/CommonAxios';
import axios from "axios";
import alertContext from "../../../../../store/alert-context";
import confirmContext from "../../../../../store/confirm-context";
import useModals from "../../../../../common/useModal";
import { commModal } from "../../../CommModal";

const PjsTestVer2 = () => {

  const setLoadingBlock = (display:boolean) => {
    let loading = window.document.getElementById("loading");
    if(loading && display){
      loading.style.display = "block";
    } else if(loading && !display){
      loading.style.display = "none";
    }
  }

  const commAlert = useContext(alertContext);
  const commConfirm = useContext(confirmContext);

  const [dataList, setDataList] = useState<any[]>([]);
  
  const [totalPage, setTotalPage] = useState(0);
  const [totalCnt, setTotalCnt] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [rowCnt, setRowCnt] = useState(5);

  const [tempSearchType, setTempSearchType] = useState(0);
  const [searchType, setSearchType] = useState(0);
  const optionVal = [ 0 , 1 , 2 , 3 , 4 ];
  const optionStr = ['선택','경로','설명','호출 방식','상태 코드'];
  
  const [tempSearchStr, setTempSearchStr] = useState(''); //임시
  const [searchStr, setSearchStr] = useState(''); 

  const [searchStart, setSearchStart] = useState(0);

  //modal popup 관련
  const [mode, setMode] = useState("C"); //C:생성, E:수정
  const [showYn, setShowYn] = useState(false);

  const [modalUid, setModalUid] = useState("");
  const [modalDataPath, setModalDataPath] = useState("");
  const [modalDataInfo, setModalDataInfo] = useState("");
  const [modalStatusCode, setModalStatusCode] = useState("200");
  const [modalMethodType, setModalMethodType] = useState("GET");
  const [modalDelayTime, setModalDelayTime] = useState("0");
  const [modalJsonData, setModalJsonData] = useState("");

  //test modal 관련
  const [testCallShowYn, setTestCallShowYn] = useState(false);
  const [testCallDataPath, setTestCallDataPath] = useState("");
  const [testCallMethodType, setTestCallMethodType] = useState("");
  const [testCallStatusCode, setTestCallStatusCode] = useState("");
  const [testCallJsonData, setTestCallJsonData] = useState("");

  const callTestPath = useRef<any>();

  const [callTestYn, setCallTestYn] = useState('N');

  const copyPath = () => {
    navigator.clipboard.writeText(callTestPath.current.value);
  };

  //JSON_DATA 테이블 리스트 셀렉트 및 데이터 가공
  const getDataList = async () => {
    let result = await $api.get('/api/dummy/getDataList?pageNum='+pageNum+'&rowCnt='+rowCnt+'&searchType='+searchType+'&searchStr='+searchStr);
    //console.log(result.data);
    if (JSON.stringify(dataList) != JSON.stringify(result.data.dataList)) {
      console.log(result.data.dataList);
      setCustomList(result.data.dataList);
      setTotalCnt(result.data.totalCnt);
      setTotalPage(result.data.totalPage);
    }
  };

  const setCustomList = (orgData: []) => {
    if(!!orgData){
      let customList = orgData.map( 
        (item: any) => (
          {
            uid: item.uid
            , dataPath: item.dataPath
            , methodType: item.methodType
            , statusCode: item.statusCode
            , delayTime: item.delayTime
            , jsonData: item.jsonData
            , dataInfo: item.dataInfo
          }
        )
      );
      setDataList([...customList]);
    }
  }

  //랜더링시 실행됨
  useEffect(() => {
      getDataList();
    },[rowCnt, pageNum, searchStart]
  );

  //컬럼 설정
  const columns: any = useMemo(
    () => [
    { Header: '경로', accessor: 'dataPath' },
    { Header: '호출 방식', accessor: 'methodType' },
    { Header: '상태 코드', accessor: 'statusCode' },
    { Header: '지연시간', accessor: 'delayTime' },
    { Header: '데이터', accessor: 'jsonData' },
    { Header: '설명', accessor: 'dataInfo' },
  ],
  []);

  const data = dataList;
  const tableInstance = useTable({ columns, data }, useSortBy );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  tableInstance;

  const openModal = (md: any, orgRow?: any) => {
    setMode(md);
    if(md === "C"){
      setModalUid("");
      setModalDataPath("");
      setModalDataInfo("");
      setModalStatusCode("200");
      setModalMethodType("GET");
      setModalDelayTime("0");
      setModalJsonData("");
    }else if(md === "E"){
      setModalUid(orgRow.uid);
      setModalDataPath(orgRow.dataPath);
      setModalDataInfo(orgRow.dataInfo);
      setModalStatusCode(orgRow.statusCode);
      setModalMethodType(orgRow.methodType);
      setModalDelayTime(orgRow.delayTime);
      setModalJsonData(orgRow.jsonData);
    }
    setShowYn(true);
  }
  const setFormData = () => {
    if(!chkParam()){
      return false;
    }

    let reqUrl = "/api/dummy";
    let alertMsg = "";
    let formData: any = {
      uid: "",
      dataPath: modalDataPath,
      dataInfo: modalDataInfo,
      statusCode: modalStatusCode,
      methodType: modalMethodType,
      delayTime: modalDelayTime,
      jsonData: modalJsonData,
    };
    if(mode === "E"){
      formData.uid = modalUid;
      reqUrl += "/updateData";
      alertMsg = "확인을 누르면 수정됩니다";
    }else if(mode === "C"){
      reqUrl += "/setData";
      alertMsg = "확인을 누르면 등록됩니다";
    }

    commConfirm.call({
      message: alertMsg, // 메시지 [필수 파라미터]
      onConfirm: async () => {
        const result = await $api.post(reqUrl, formData);
        console.log(result.data);
        if(result.data == "등록완료" || result.data == "수정완료"){
          setSearchStart(searchStart+1);
          commAlert.call({
            message: result.data,
            onClose: () => {
            }
          });
          setShowYn(false);
        }else{
          commAlert.call({
            message: result.data,
            onClose: () => {
            }
          });
        }
      }, 
      onCancel: ()=>{}, 
      yesText: '확인', //yes버튼 문구 기본 값 확인
      noText: '취소', //no버튼 문구 기본 값 취소
    });
  }

  const chkParam = () => {
    if(!chkDataPath()){
      return false;
    }else if(modalDataInfo && modalDataInfo.length>255){
      commAlert.call({
        message: "설명은 총 255자를 넘길 수 없습니다",
        onClose: () => {
        }
      });
      return false;
    }else if(!chkStatusCode()){
      return false;
    }else if(!chkDelayTime()){
      return false;
    }
    return true;
  }

  const chkDataPath = () => {
    let a = modalDataPath;
    let chk = true;
    let alertMsg = "";

    if(a){
      let b = a.split('/');
      if(a.length>100){
        alertMsg = '경로는 총 100자를 넘길 수 없습니다';
        chk = false;
      }else if(a.substring(0,1) != '/'){
        alertMsg = '경로는 /로 시작해야합니다 ex) /depth1/depth2/depth3';
        chk = false;
      }else if(b.length > 4){
        alertMsg = '경로는 3depth까지로 제한합니다 ex) /depth1/depth2/depth3';
        chk = false;
      }else{
        let regex = /^[a-zA-Z0-9]+$/;
        let b = a.split('/');
        for(let i = 1; i < b.length; i++){
          if(!b[i]){
            alertMsg = '빈 경로는 입력할 수 없습니다';
            chk = false;
            break;
          }else if(!regex.test(b[i])){
            alertMsg = i+"번째 경로를 영어와 숫자로만 이루어진 문자열로 입력해주세요 ";
            chk = false;
            break;
          }
        }
      }
    }else{
      alertMsg = '값을 입력해주세요';
      chk = false;
    }

    if(!chk){
      commAlert.call({
        message: alertMsg,
        onClose: () => {
        }
      });
    }
    return chk;
  }

  const chkStatusCode = () => {
      let regex = /^[0-9]+$/;
      if(!modalStatusCode){
        commAlert.call({
          message: "상태 코드를 입력해주세요",
          onClose: () => {
          }
        });
      }else if(modalStatusCode.length > 3){
        commAlert.call({
          message: "상태 코드는 숫자 3자리까지 입력이 가능합니다",
          onClose: () => {
          }
        });
      }else if(!regex.test(modalStatusCode)) {
        commAlert.call({
          message: "상태 코드는 숫자만 입력이 가능합니다",
          onClose: () => {
          }
        });
        return false;
      }
      return true;
  }

  const chkDelayTime = () => {
    let regex = /^[0-9]+$/;
    if(!modalDelayTime){
      commAlert.call({
        message: "지연시간을 입력해주세요",
        onClose: () => {
        }
      });
      return false;
    }else if(modalDelayTime.length > 3){
      commAlert.call({
        message: "지연시간은 숫자 3자리까지 입력이 가능합니다",
        onClose: () => {
        }
      });
      return false;
    }else if(!regex.test(modalDelayTime)) {
      commAlert.call({
        message: "지연시간은 숫자만 입력이 가능합니다",
        onClose: () => {
        }
      });
      return false;
    }
    return true;
  }

  const rowDel = (orgRow?: any) => {
    commConfirm.call({
      message: "확인을 누르면 삭제됩니다", // 메시지 [필수 파라미터]
      onConfirm: async () => {
        const result = await $api.post('/api/dummy/deleteData', orgRow);
        console.log(result.data);
        if(result.data == "삭제완료"){
          setSearchStart(searchStart+1);
          commAlert.call({
            message: result.data,
            onClose: () => {
            }
          });
          setShowYn(false);
        }
      }, 
      onCancel: ()=>{}, 
      yesText: '확인', //yes버튼 문구 기본 값 확인
      noText: '취소', //no버튼 문구 기본 값 취소
    });
  }

  const testCall = async (orgRow?: any) => {
    setTestCallShowYn(true);

    let dataPath = import.meta.env.VITE_APP_BACKEND_CALL_URL+'/dummy'+orgRow.dataPath;
    let methodType = orgRow.methodType;

    setTestCallDataPath(dataPath);
    setTestCallMethodType(methodType);
    setTestCallStatusCode("");
    setTestCallJsonData("");

    const csrf = await $api.get('/csrf');
    setLoadingBlock(true);
    setCallTestYn('Y');
    
    let testCall;
    if(methodType == 'POST'){
      testCall = await $api.post(dataPath,{headers: {isLoading: true}});
    }else if(methodType == 'PUT'){
      testCall = await $api.put(dataPath,{headers: {isLoading: true}});
    }else if(methodType == 'PATCH'){
      testCall = await $api.patch(dataPath,{headers: {isLoading: true}});
    }else if(methodType == 'DELETE'){
      testCall = await $api.delete(dataPath,{headers: {isLoading: true}});
    }else if(methodType == 'HEAD'){
      testCall = await $api.head(dataPath,{headers: {isLoading: true}});
    }else if(methodType == 'OPTIONS'){
      testCall = await $api.options(dataPath,{headers: {isLoading: true}});
    }else{
      testCall = await $api.get(dataPath,{headers: {isLoading: true}});
    }
    console.log(typeof testCall.data);
    
    setTestCallStatusCode(testCall.status+"");

    if (typeof testCall.data === 'object') {
      setTestCallJsonData(JSON.stringify(testCall.data)+"");
    } else {
      setTestCallJsonData(testCall.data+"");
    }

    /*
    await axios.request({
      headers:{
        'X-XSRF-TOKEN':csrf.data.token+""
      }
      , xsrfCookieName : "XSRF-TOKEN"
      , xsrfHeaderName : "X-XSRF-TOKEN"
      , method: methodType
      , url: dataPath
    }).then(function (response) {
      setLoadingBlock(false);
      console.log('-- response --');
      console.log(response);
      console.log('-- response --');

      console.log('-- status : ' + response.status);
      console.log('-- data : ' + response.data);

      setTestCallStatusCode(response.status+"");
      setTestCallJsonData(response.data+"");
    }).catch(function (error) {
      setLoadingBlock(false);
      if (error.response) {
        // 서버가 응답을 반환했으며, 이 응답이 에러 상태를 가질 경우
        console.log('-- response --');
        console.log(error.response);
        console.log('-- response --');

        console.log('-- status : ' + error.response.status);
        console.log('-- data : ' + error.response.data);

        setTestCallStatusCode(error.response.status+"");
        setTestCallJsonData(error.response.data+"");
      } else if (error.request) {
        // 요청이 보내졌지만 응답을 받지 못한 경우
        console.log(error.request);
      } else {
        // 기타 설정 에러나 네트워크 문제 등
        console.log('Error', error.message);
      }
    });
    */
    setLoadingBlock(false);
    setCallTestYn('N');
  }

  return (
      <div className="content">
        <input type='hidden' id="callTestYn" defaultValue={callTestYn}></input>
        <div className="title-item">
            <h2 className="h2-title">종석테스트</h2>
            <ul className="location">
                <li>
                  예제
                </li>
                <li>
                  그리도예제
                </li>
                <li>
                  종석테스트
                </li>
            </ul>
        </div>
        <div className="cont-item">
          <div className="title-item">
            <h3 className="h3-title">테이블 타이틀</h3>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <div className='btn-area left'>
              <select className='form-select' value={rowCnt} onChange={e => {setPageNum(1); setRowCnt(Number(e.target.value));}}>
                {[ 5, 10, 20 ].map(rowCnt => (
                  <option key={rowCnt} value={rowCnt}>
                    {rowCnt}개 보기
                  </option>
                ))}
              </select>
            </div>
            <div className='btn-area right'>
              <select className='form-select' value={tempSearchType} onChange={e => {setTempSearchType(Number(e.target.value));}}>
                {optionVal.map(i => (
                  <option key={i} value={i}>
                    {optionStr[i]}
                  </option>
                ))}
              </select>

              <input type="text" value={tempSearchStr} onChange={(e) => setTempSearchStr(e.target.value)} />

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
              {/*<button onClick={() => {
                setTempSearchType(0);
                setTempSearchStr("");
                setSearchType(tempSearchType); 
                setSearchStr(tempSearchStr);
                setPageNum(1);
                setSearchStart(searchStart+1);
              }}>초기화</button>*/}
            </div>

          </div>
          <table {...getTableProps()} className="table">
            <colgroup>
                <col width="6%" />
                <col width="10%" />
                <col width="10%" />
                <col width="7%" />
                <col width="7%" />
                <col width="7%" />
                <col width="auto" />
                <col width="15%" />
                <col width="20%" />
            </colgroup>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  <th style={{width:'4%'}}>No.</th>
                  <th style={{width:'5%'}}>Test</th>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render('Header')}
                      &nbsp;
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <span>▼</span>
                          ) : (
                            <span>▲</span>
                          )
                        ) : (
                          ''
                        )}
                      </span>
                    </th>
                  ))}
                  <th style={{width:'10%'}}>수정/삭제</th>
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row,i) => {
                prepareRow(row);
                let orgRow = row.original;
                return (
                  <tr {...row.getRowProps()}>
                    <td>{(totalCnt - (rowCnt * (pageNum - 1)) - i)}</td>
                    <td>
                      <button type="button" className="btn btn-s" onClick={() => {testCall(orgRow);}}>Test</button>
                    </td>
                    {row.cells.map(cell => (
                      <td style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    ))}
                    <td>
                      <div className="btn-area">
                        <button type="button" className="btn btn-s" onClick={() => {openModal("E", orgRow);}}>수정</button>
                        <button type="button" className="btn btn-s" onClick={() => {rowDel(orgRow);}}>삭제</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="pagination">
            <button className="first" onClick={() => setPageNum(1)} disabled={pageNum === 1}>
              <span className="text-hide">첫 페이지</span>
            </button>
            <button className="prev" onClick={() => setPageNum(Math.max(1, pageNum - 1))} disabled={pageNum === 1}>
            <span className="text-hide">이전 페이지</span>
            </button>
            
            {[...Array(5)].map((_, i) => {
              // 페이지 범위 계산
              const pageNumber =
                totalPage <= 5 || pageNum <= 3 ? i + 1 : Math.min(pageNum - 2 + i, totalPage - 4 + i);
              if (pageNumber > totalPage) return null; // 페이지 번호가 총 페이지 수를 넘으면 표시하지 않음
              return (
                <button
                  key={pageNumber}
                  onClick={() => setPageNum(pageNumber)}
                  disabled={pageNum === pageNumber}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button className="next" onClick={() => setPageNum(Math.min(totalPage, pageNum + 1))} disabled={pageNum === totalPage}>
              <span className="text-hide">다음 페이지</span>
            </button>
            <button className="last" onClick={() => setPageNum(totalPage)} disabled={pageNum === totalPage}>
              <span className="text-hide">마지막 페이지</span>
            </button>
          </div>
          
          <div className="btn-area right">
            <button className="btn btn-sm btn-primary" onClick={() => {openModal("C",{});}}>등록</button>
          </div>
        </div>
        <Modal show={showYn} backdrop="static" style={{zIndex:1054}}>
          <Modal.Body  style={{ maxHeight: 'calc(100vh - 350px)', overflowY: 'auto' }}>
            <h5>경로</h5>
            <br />
            <input
              className="form-control"
              type="text"
              placeholder="ex) /depth1/dep.... 최대 3depth"
              disabled={mode === "E"}
              readOnly={mode === "E" ? true : false}
              defaultValue={modalDataPath}
              onChange={e => {setModalDataPath(e.target.value)}}
            />
            <br />
            <h5>설명</h5>
            <br />
            <input
              className="form-control"
              type="text"
              defaultValue={modalDataInfo}
              onChange={e => {setModalDataInfo(e.target.value)}}
            />
            <br />
            <h5>상태 코드</h5>
            <br />
            <input
              className="form-control"
              type="text"
              defaultValue={modalStatusCode}
              onChange={e => {setModalStatusCode(e.target.value)}}
            />
            <br />
            <h5>호출 방식</h5>
            <br />
            <select
              className="form-select"
              disabled={mode === "E"}
              defaultValue={modalMethodType}
              onChange={e => {setModalMethodType(e.target.value)}}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="PATCH">PATCH</option>
              <option value="DELETE">DELETE</option>
              <option value="HEAD">HEAD</option>
              <option value="OPTIONS">OPTIONS</option>
              {/*
              axios에 없는 호출방식이라 일단 뺌
              <option value="TRACE">TRACE</option>
              <option value="CONNECT">CONNECT</option>
              */}
            </select>
            <br />
            <h5>지연시간</h5>
            <br />
            <input
              className="form-control"
              type="text"
              defaultValue={modalDelayTime}
              onChange={e => {setModalDelayTime(e.target.value)}}
            />
            <br />
            <h5>데이터</h5>
            <br />
            <textarea
              className="form-control"
              defaultValue={modalJsonData}
              onChange={e => {setModalJsonData(e.target.value)}}
              style={{height:150}}
            />
            <br />
          </Modal.Body>
          <Modal.Footer>
            <div className="btn-area right">
              <button className="btn btn-sm btn-primary" onClick={() => {setFormData();}}>
                {mode === "C" && "등록"}
                {mode === "E" && "수정"}
              </button>
              <button className="btn btn-sm btn-outline-secondary" onClick={() => {setShowYn(false)}}>취소</button>
            </div>
          </Modal.Footer>
        </Modal>
        
        <Modal show={testCallShowYn} backdrop="static" style={{zIndex:1054}}>
          <Modal.Body  style={{ maxHeight: 'calc(100vh - 350px)', overflowY: 'auto' }}>
            <h5>경로</h5>
            <br />
            <div className='btn-area'>
              <button type='button' className='btn btn-sm btn-primary' onClick={copyPath}>COPY</button>
              <input
                ref={callTestPath}
                className="form-control"
                type="text"
                disabled
                readOnly
                defaultValue={testCallDataPath}
              />
            </div>
            
            <br />
            <h5>호출 방식</h5>
            <br />
            <input
              className="form-control"
              type="text"
              disabled
              readOnly
              defaultValue={testCallMethodType}
            />

            <br />
            <h5>상태 코드</h5>
            <br />
            <input
              className="form-control"
              type="text"
              disabled
              readOnly
              defaultValue={testCallStatusCode}
            />

            <br />
            <h5>데이터</h5>
            <br />
            <textarea
              className="form-control"
              disabled
              readOnly
              defaultValue={testCallJsonData}
              style={{height:150}}
            />
            <br />
          </Modal.Body>
          <Modal.Footer>
            <div className="btn-area right">
              <button className="btn btn-sm btn-outline-secondary" onClick={() => {setTestCallShowYn(false)}}>닫기</button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>

    
  );
};

export default PjsTestVer2;

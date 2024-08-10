import { Fragment, useContext, useState } from "react";
import $api from "../../../../../common/CommonAxios";
import AlertContext from "../../../../../store/alert-context";

interface sandData {
    uid : number;
    dataPath : string;
    dataInfo : string;
    methodType : string;
    statusCode : number;
    delayTime : number;
    jsonData : string;
    index?:number;
}

const DataMoodal = (props :any) => {
    
    const { open, close, header, modalData, getData, handleClickUpdateData,handleClickAddData } = props; // 무한 스크롤에 필요 : handleClickUpdateData,handleClickAddData
    const [ dataPath, setDataPath ] = useState(modalData.dataPath || "");
    const [ dataInfo, setDataInfo ] = useState(modalData.dataInfo || "");
    const [ methodType, setMethodType ] = useState(modalData.methodType || "GET");
    const [ statusCode, setStatusCode ] = useState(modalData.statusCode || '' );
    const [ delayTime, setDelayTime ] = useState(modalData.delayTime ||'');
    const [ jsonData, setJsonData ] = useState(modalData.jsonData || "");
    
    const handleChangeDataPath = (event:any) => { setDataPath(event.target.value); }
    const handleChangeDataInfo = (event:any) => { setDataInfo(event.target.value); }
    const handleChangeMethodType = (event:any) => { setMethodType(event.target.value); }
    const handleChangeStatusCode = (event:any) => { setStatusCode(event.target.value); }
    const handleChangeDelayTime = (event:any) => { setDelayTime(event.target.value); }
    const handleChangeJsonData = (event:any) => { setJsonData(event.target.value); }
    
    const methodTypes = [ "GET","POST","PUT","DELETE","PATCH","HEAD","OPTIONS","TRACE","CONNECT" ];
    const commAlert = useContext(AlertContext);

    const handleSubmit = async (event:any) => {
        event.preventDefault();

        const numberPattern :RegExp = /^([0-9]{1,3})$/
        const dataPathPattern :RegExp = /^([a-zA-Z0-9]{1})([a-zA-Z0-9\-_]*?([a-zA-Z0-9]{1}))?$/
        
        let reqDataPath:string = dataPath
        let pathCheck :boolean = reqDataPath.charAt(0)==="/" && reqDataPath.length>1 && !!reqDataPath
        const splitPath  = reqDataPath.split("/")
        if(!pathCheck){
            commAlert.call('경로를 정확히 적어주세요');
            return pathCheck
        }
        for(let i = 1; i < splitPath.length;i++){
            if(pathCheck && !dataPathPattern.test(splitPath[i])) {
                commAlert.call('경로를 정확히 적어주세요');
                return false
            }
        }
        if(!!!dataInfo || dataInfo!==dataInfo.trim()) {
            commAlert.call("설명을 적어주세요");
            return false
        }
        if(!numberPattern.test(statusCode)) {
            commAlert.call('상태 코드을 적어주세요');
            return false
        }
        if(!numberPattern.test(delayTime)) {
            commAlert.call('지연시간을 적어주세요');
            return false
        }
        if(!!!jsonData || jsonData!==jsonData.trim()) {
            commAlert.call('데이터을 적어주세요');
            return false
        }
        const req :sandData = {
            uid : modalData.uid,
            dataPath : dataPath,
            dataInfo : dataInfo,
            methodType : methodType,
            statusCode : statusCode,
            delayTime : delayTime,
            jsonData : jsonData,
            index: modalData.index,
        }
        if(header ==='추가'){
            await $api.post('/api/dummy/setData', req);
            if(handleClickAddData){
                handleClickAddData(req)
            }else{
                getData(header);
            }
        }else{
            await $api.post('/api/dummy/updateData', req);
            if(handleClickUpdateData){
                handleClickUpdateData(req)
            } else {
                getData();
            }
        }
        close()
    };
    return (
        <Fragment>
            {open ? (
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="addMenuModalTitle">
                        {header}
                    </h1>
                    <button type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={close}>
                    </button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="form-itme">
                            <dl>
                                <dt>
                                    <label htmlFor={`input-dataPath`}>경로</label>
                                </dt>
                                <dd>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="경로를 입력해 주세요."
                                        maxLength={20}
                                        value={dataPath}
                                        onChange={handleChangeDataPath}
                                        aria-label="dataPath"
                                        aria-describedby={`button-dataPath`}
                                        id={`input-dataPath`}
                                    />
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    <label htmlFor={`input-dataInfo`}>설명</label>
                                </dt>
                                <dd>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="설명을 입력해 주세요."
                                        maxLength={20}
                                        value={dataInfo}
                                        onChange={handleChangeDataInfo}
                                        aria-label="dataPath"
                                        aria-describedby={`button-dataInfo`}
                                        id={`input-dataInfo`}
                                    />
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    <label htmlFor={`input-methodTypes`}>호출 방식</label>
                                </dt>
                                <dd>
                                    <select id="input-methodTypes" className='form-select' onChange={handleChangeMethodType} value={methodType} >
                                        {methodTypes.map((item) => (
                                            <option value={item} key={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    <label htmlFor={`input-statusCode`}>상태 코드</label>
                                </dt>
                                <dd>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="상태코드를 입력해 주세요."
                                        maxLength={20}
                                        value={statusCode}
                                        onChange={handleChangeStatusCode}
                                        aria-label="dataPath"
                                        aria-describedby={`button-statusCode`}
                                        id={`input-statusCode`}
                                    />
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    <label htmlFor={`input-delayTime`}>지연시간</label>
                                </dt>
                                <dd>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="지연시간을 입력해 주세요."
                                        maxLength={20}
                                        value={delayTime}
                                        onChange={handleChangeDelayTime}
                                        aria-label="dataPath"
                                        aria-describedby={`button-delayTime`}
                                        id={`input-delayTime`}
                                    />
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    <label htmlFor={`input-jsonData`}>데이터</label>
                                </dt>
                                <dd>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="데이터를 입력해 주세요."
                                        maxLength={20}
                                        value={jsonData}
                                        onChange={handleChangeJsonData}
                                        aria-label="dataPath"
                                        aria-describedby={`button-jsonData`}
                                        id={`input-jsonData`}
                                    />
                                </dd>
                            </dl>
                        </div>
                    </form>
                </div>

                <div className="modal-footer">
                <button type="button" className="btn btn-sm btn-primary" onClick={handleSubmit}>
                    {header}
                </button>
                <button type="button" className="btn btn-sm btn-outline-secondary" onClick={close}>
                    cancel
                </button>
                </div>
            </div>
            ) : null}
        </Fragment>
    );
};

export default DataMoodal;
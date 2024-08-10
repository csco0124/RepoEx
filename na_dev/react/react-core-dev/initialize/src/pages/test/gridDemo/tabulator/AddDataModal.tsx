import { useState } from "react";
import $api from "../../../../common/CommonAxios";
interface sandData {
    uid : number;
    dataPath : string;
    dataInfo : string;
    methodType : string;
    statusCode : number;
    delayTime : number;
    jsonData : string;
}
const AddDataModal = (props :any) => {
    
    const { open, close, header, modalData, getData } = props;
    const [ dataPath, setDataPath ] = useState(modalData.dataPath || "");
    const [ dataInfo, setDataInfo ] = useState(modalData.dataInfo || "");
    const [ methodType, setMethodType ] = useState(modalData.methodType || "GET");
    const [ statusCode, setStatusCode ] = useState(modalData.statusCode || 200 );
    const [ delayTime, setDelayTime ] = useState(modalData.delayTime || 0);
    const [ jsonData, setJsonData ] = useState(modalData.jsonData || "");
    
    const handleChangeDataPath = (event:any) => { setDataPath(event.target.value); }
    const handleChangeDataInfo = (event:any) => { setDataInfo(event.target.value); }
    const handleChangeMethodType = (event:any) => { setMethodType(event.target.value); }
    const handleChangeStatusCode = (event:any) => { setStatusCode(event.target.value); }
    const handleChangeDelayTime = (event:any) => { setDelayTime(event.target.value); }
    const handleChangeJsonData = (event:any) => { setJsonData(event.target.value); }
    
    const methodTypes = [ "GET","POST","PUT","DELETE","PATCH","HEAD","OPTIONS","TRACE","CONNECT" ];
    const disabled = false
    const handleSubmit = async (event:any) => {
        event.preventDefault();

        const numberPattern :RegExp = /^([0-9]{1,3})$/
        const dataPathPattern :RegExp = /^([a-zA-Z0-9]{1})([a-zA-Z0-9\-_]*?([a-zA-Z0-9]{1}))?$/
        
        let reqDataPath:string = dataPath
        let pathCheck :boolean = reqDataPath.charAt(0)==="/" && reqDataPath.length>1 && !!reqDataPath
        const splitPath  = reqDataPath.split("/")
        if(!pathCheck){
            console.log('dataPath')
            return pathCheck
        }
        for(let i = 1; i < splitPath.length;i++){
            if(pathCheck && !dataPathPattern.test(splitPath[i])) {
                console.log('dataPath')
                return false
            }
        }
        if(!!!dataInfo || dataInfo!==dataInfo.trim()) {
            console.log('dataInfo x')
            return false
        }
        console.log('dataInfo=',dataInfo)
        if(!numberPattern.test(statusCode)) {
            console.log('statusCode x')
            return false
        }
        console.log('statusCode =',statusCode)
        if(!numberPattern.test(delayTime)) {
            console.log('delayTime x')
            return false
        }
        console.log('delayTime=',delayTime)
        if(!!!jsonData || jsonData!==jsonData.trim()) {
            console.log('jsonData x')
            return false
        }
        console.log('jsonData=',jsonData)
        const req :sandData = {
            uid : modalData.uid,
            dataPath : dataPath,
            dataInfo : dataInfo,
            methodType : methodType,
            statusCode : statusCode,
            delayTime : delayTime,
            jsonData : jsonData,
        }
        if(header ==='add'){
            await $api.post('/api/dummy/setData', req);
            getData();
        } else {
            await $api.post('/api/dummy/updateData', req);
            getData();
        }
        close()
    };

    return (
        <div>
            {open ? (
            <section>
                <header>
                {header}
                </header>
                <form onSubmit={handleSubmit}>
                    <label>dataPath</label>
                    <input
                        type="text"
                        name="dataPath"
                        value={dataPath}
                        onChange={handleChangeDataPath}
                    />
                    <label>dataInfo</label>
                    <input
                        type="text"
                        name="dataInfo"
                        value={dataInfo}
                        onChange={handleChangeDataInfo}
                    />
                    <label>methodType</label>
                    <select onChange={handleChangeMethodType} value={methodType} >
                        {methodTypes.map((item) => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </select>

                    <label>statusCode</label>
                    <input
                        type="text"
                        name="statusCode"
                        value={statusCode}
                        onChange={handleChangeStatusCode}
                    />
                    <label>delayTime</label>
                    <input
                        type="text"
                        name="delayTime"
                        value={delayTime}
                        onChange={handleChangeDelayTime}
                    />
                    <label>jsonData</label>
                    <textarea
                        name="jsonData"
                        value={jsonData}
                        onChange={handleChangeJsonData}
                    />
                    <button type="submit" disabled={disabled}>
                        {header}
                    </button>
                    <button type="button" onClick={close}>
                        close
                    </button>
                </form>
            </section>
            ) : null}
        </div>
    );
};

export default AddDataModal;
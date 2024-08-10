
import { Fragment, useContext } from "react";
import AlertContext from "../../../../../store/alert-context";

interface serchData {
    optionVal : number[];
    optionStr : string[];
    tempSearchType: number;
    setTempSearchType: (value: React.SetStateAction<number>) => void;
    tempSearchStr: string;
    setTempSearchStr: (value: React.SetStateAction<string>) => void;
    searchStart: number;
    setSearchStart: (value: React.SetStateAction<number>) => void;
    setSearchType: (value: React.SetStateAction<number>) => void;
    setSearchStr: (value: React.SetStateAction<string>) => void;
    setPageNum: (value: React.SetStateAction<number>) => void;
    setData? : React.Dispatch<React.SetStateAction<any[]>>; // 무한스크롤에 필요함
    setTotalPage? : React.Dispatch<React.SetStateAction<number>> // 무한스크롤에 필요함
}

const Search = (props :serchData) => {
    const commAlert = useContext(AlertContext);
    const nullCheck = () => {
        if(props.tempSearchType != 0 && props.tempSearchStr.length > 0){
            props.setSearchType(props.tempSearchType); 
            props.setSearchStr(props.tempSearchStr); 
            props.setPageNum(1); 
            props.setSearchStart(props.searchStart+1);
            props.setData && props.setData([]); // 무한 스크롤
            props.setTotalPage && props.setTotalPage(-1); // 무한 스크롤

        }else{
            if(props.tempSearchType == 0){
            commAlert.call({
                message: '검색조건을 선택해 주세요',
                onClose: () => {
                }
            });
            }else if(props.tempSearchStr.length == 0){
                commAlert.call({
                    message: '검색 키워드를 입력해 주세요',
                    onClose: () => {
                }
            });
            }
        }
    }
    return (
        <Fragment>
            <div>
                <select className='form-select' value={props.tempSearchType} onChange={e => {props.setTempSearchType(Number(e.target.value));}}>
                {props.optionVal.map(i => (
                    <option key={i} value={i}>
                    {props.optionStr[i]}
                    </option>
                ))}
                </select>
            </div>
            <div>
                <input type="text" className='form-input' value={props.tempSearchStr} onChange={(e) => props.setTempSearchStr(e.target.value)} />                    </div>
            <div>
                <button className='btn btn-sm btn-primary' onClick={nullCheck}> 검색 </button>
            </div>
        </Fragment>
    )
};

export default Search;
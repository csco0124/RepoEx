interface rowCntData{
    rowCnt :number;
    setPageNum :React.Dispatch<React.SetStateAction<number>>;
    setRowCnt :React.Dispatch<React.SetStateAction<number>>;
    setData? : React.Dispatch<React.SetStateAction<any[]>>; // 무한스크롤에 필요함
}

const SetRowCnt = (props:rowCntData) => {
    const { rowCnt,setPageNum,setRowCnt, setData} = props
    
    return (
        <div>
            <select className='form-select' value={rowCnt} onChange={e => {setPageNum(1); setRowCnt(Number(e.target.value)); setData && setData([]);}}>
            {[ 10, 15, 20, 25].map(rowCnt => (
                <option key={rowCnt} value={rowCnt}>
                {rowCnt}개 보기
                </option>
            ))}
            </select>
        </div>
    )
};

export default SetRowCnt;
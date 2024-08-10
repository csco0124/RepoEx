import { useState } from "react";
import { getLocalStorageWithExpiry, setLocalStorageWithExpiry } from "../../../../common/CommonLocalStorage";

const ExamLocalStorage = () => {
	let [key, setKey] = useState<string>("");
	let [value, setValue] = useState<string>("");
	let [number, setNumber] = useState<number>();
	let [result, setResult] = useState<string>("");

	const testSetLocal = () => {
		setLocalStorageWithExpiry(key, value, number);
	}
	const testGetLocal = () => {
		let res = getLocalStorageWithExpiry(key);
		if(res){
			setResult(res);	
		} else {
			setResult("");	
		}
	}

  return (
    <div className="content">
      <div className="title-item">
        <h2 className="h2-title">로컬스토리지 공통함수</h2>
        <ul className="location">
          <li>예제</li>
          <li>유틸리티</li>
          <li>로컬스토리지 공통함수</li>
        </ul>
      </div>
      <div className="cont-item">
				<div className="title-item">
          <h3 className="h3-title">
					 유효기간이 있는 로컬스토리지 테스트(공통함수 개발)
					</h3>
        </div>
				<div className="row">
					<div className="col-2">
					key : <input type="text" value={key} onChange={(e) => {setKey(e.target.value)}} />
					</div>
					<div className="col-2">
					value : <input type="text" value={value} onChange={(e) => {setValue(e.target.value)}} />
					</div>
					<div className="col-2">
					시간(5000 : 5초/ 0 : 무한) : <input type="number" value={number} onChange={(e) => {setNumber(Number(e.target.value))}} />
					</div>
					<div className="col-2 mt-3">
						<button type="button" className="btn btn-primary" onClick={testSetLocal}>로컬스토리지에 저장</button>
					</div>
					<div className="col-12"><br/><br/><br/></div>
					<div className="col-2">
					target key : <input type="text" value={key} readOnly disabled />
					</div>
					<div className="col-8">
					<button type="button" className="btn btn-primary mt-3" onClick={testGetLocal}>로컬스토리지에서 값 가져오기</button>
					</div>
					<div className="col-4 mt-3">
					get Value Result : <input type="text" value={result} readOnly disabled />
					</div>
				</div>
				
				
        
				
				
				
      </div>
    </div>
  );
};

export default ExamLocalStorage;

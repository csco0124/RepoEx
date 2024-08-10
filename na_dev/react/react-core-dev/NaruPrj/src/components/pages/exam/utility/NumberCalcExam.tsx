import { useState } from "react";
import Big from "big.js";

const NumberCalcExam = () => {
	let [num1, setNum1] = useState<number>(0);
  let [num2, setNum2] = useState<number>(0);
  let [res, setRes] = useState<number>(0);
  
  const calc = (type:string) => {
    let x = new Big(num1);
    let y = new Big(num2);
    if(type === "+"){
      setRes(Number(x.plus(y)));
    } else if(type === "-"){
      setRes(Number(x.minus(y)));
    } else if(type === "*"){
      setRes(Number(x.mul(y)));
    } else if(type === "/"){
      setRes(Number(x.div(y)));
    }
  };
  return (
    <div className="content">
      <div className="title-item">
        <h2 className="h2-title">숫자 소수점계산 유틸</h2>
        <ul className="location">
          <li>예제</li>
          <li>유틸리티</li>
          <li>숫자 소수점계산 유틸 (big.js)</li>
        </ul>
      </div>
      <div className="cont-item">
				<div className="title-item">
          <h3 className="h3-title">
						자바스크립트 숫자 계산을 정확하게 해주는 라이브러리(소수점계산 오류 방지)<br/>
						API Link : <a href="https://github.com/MikeMcl/big.js#readme" className="link-primary" target="_blank">보기</a>
					</h3>
        </div>
				<div className="title-item" style={{marginTop:"10px"}}>
					<div className="row">
						<div className="col-6 mb-3">
						계산숫자입력 1: <input type="number" step="any" value={num1} onChange={(e) => setNum1(Number(e.target.value))} />
						</div>
						<div className="col-6">
						계산숫자입력 2: <input type="number" step="any" value={num2} onChange={(e) => setNum2(Number(e.target.value))} />
						</div>
						<div className="col-3">
							<button className="btn btn-primary" onClick={() => calc('+')} >더하기</button>
						</div>
						<div className="col-3">
							<button className="btn btn-primary" onClick={() => calc('-')} >빼기</button>
						</div>
						<div className="col-3">
							<button className="btn btn-primary" onClick={() => calc('*')} >곱하기</button>
						</div>
						<div className="col-3">
							<button className="btn btn-primary" onClick={() => calc('/')} >나누기</button>
						</div>
						<div className="col-4 mt-3">
						결과 : <input type="number" step="any" value={res} readOnly />
						</div>
					</div>
        </div>
				
				
      </div>
    </div>
  );
};

export default NumberCalcExam;

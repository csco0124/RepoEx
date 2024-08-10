import { useState } from "react";
import Big from 'big.js';

function TestNumberCalc() {
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
    <div>
      <h6>자바스크립트 상에서의 숫자 계산을 정확하게 해주는 라이브러리(소수점계산 오류 방지)</h6>
      <a href="https://github.com/MikeMcl/big.js#readme" target="_blank">https://github.com/MikeMcl/big.js#readme</a>
      <br/><br />
      1: <input type="number" step="any" value={num1} onChange={(e) => setNum1(Number(e.target.value))} />
      <br />
      2: <input type="number" step="any" value={num2} onChange={(e) => setNum2(Number(e.target.value))} />
      <br /><br />
      <button onClick={() => calc('+')} >더하기</button>
      <button onClick={() => calc('-')} >빼기</button>
      <button onClick={() => calc('*')} >곱하기</button>
      <button onClick={() => calc('/')} >나누기</button>
      <br /><br />
      결과 : <input type="number" step="any" value={res} readOnly />
    </div>
  );
}

export default TestNumberCalc;
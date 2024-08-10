import { useState } from "react";
import $api from "../../../common/CommonAxios";

function TestJwt() {
  let [subject, setSubject] = useState<string>("");
  let [time, setTime] = useState<number>(1);
  let [token, setToken] = useState<string>("");
  let [result, setResult] = useState<string>("");
  let [count, setCount] = useState<number>(0);

  const getToken = () => {
    $api.get("/test/jwt/gen_token", {params: {subject, time}}).then(response => {
      setToken(response.data.result);
      getCount((time*60)-1);
    })
  }

  const getCount = (cnt:number) => {
    const intervalObj = setInterval(() => {
      if(cnt <= 0){
        clearInterval(intervalObj);
      }
      setCount(cnt);
      cnt--;
    }, 1000);
  }

  const getSubject = () => {
    $api.get("/test/jwt/get_subject", {params: {token}}).then(response => {
      setResult("Subject : " + response.data.subject + "  / 유효여부 : " + response.data.isExpirationDate);
    })
  }

  return (
    <div>
      Subject : <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
      <br />
      유효시간(분)<input type="number" max={5} value={time} onChange={(e) => setTime(Number(e.target.value))} />
      <br />
      <button onClick={getToken}>토큰 생성</button>
      <p>남은 유효시간(초) : {count}</p>
      <hr/>
      <input type="text" value={token} readOnly />
      <button onClick={getSubject}>토큰 검증(유효여부 확인)</button>
      <br />
      <p>{result}</p>
    </div>
  );
}

export default TestJwt;
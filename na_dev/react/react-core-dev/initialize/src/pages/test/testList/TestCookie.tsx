import { useState } from "react";
import { getCookie, setCookie } from "../../../common/CommonCookie";

function TestCookie() {
  const cookieName = "testCookie";

  let [cookieVal, setCookieVal] = useState<string>("");
  let [cookieResult, setCookieResult] = useState<string>("");
  
  const getCookieVal = () => {
    let cookieRes = getCookie(cookieName);
    if(!cookieRes){
      cookieRes = "";
    }
    setCookieResult(cookieRes);
    
  }
  return (
    <div>
      <h5>쿠키 테스트</h5>
      <input type="text" value={cookieVal} onChange={(e) => setCookieVal(e.target.value)} />
      <br />
      <button onClick={() => {setCookie(cookieName, cookieVal, {maxAge:10})}}>쿠키에 데이터 넣기(유효시간 : 10초 / name : {cookieName})</button>
      <hr />
      <button onClick={getCookieVal}>{cookieName} 쿠키 데이터 가져오기</button>
      <br />
      <input type="text" value={cookieResult} readOnly/>
    </div>
  );
}

export default TestCookie;
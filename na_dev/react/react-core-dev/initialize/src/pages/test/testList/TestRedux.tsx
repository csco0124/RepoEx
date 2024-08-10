import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setTestState } from "../../../store/TestReducer";
import { Link } from "react-router-dom";

function TestRedux() {
  const testState = useSelector((state: RootState) => state.test);
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");
  const [num, setNum] = useState<number>(0);

  useEffect(() => {
    setName(testState.name);
    setNum(testState.num);
  }, []);

  const setTestStateAction = () => {
    dispatch(setTestState({name, num}));
  }

  return (
    <div>
      <h4>리덕스 상태관리 테스트</h4><br />
        이름 : <input type="text" value={name} onChange={e => setName(e.target.value)} />&nbsp;
        숫자 : <input type="number" value={num} onChange={e => setNum(Number(e.target.value))} />
				<br/>
        <button onClick={setTestStateAction}>데이터 공통 적용(개발자도구 콘솔 로그 참고)</button>
				<br/><br/>
        <Link to="/test/testList/testReduxResult"><button>결과페이지 이동</button></Link>
    </div>
  );
}

export default TestRedux;
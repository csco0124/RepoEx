import { ChangeEvent, useEffect, useState } from "react";

const App = () => {
  const [count, setCount] = useState<number>(0);
  const [name, setName] = useState<string>("아이유");
  const [cntStr, setCntStr] = useState<number>(0);
  useEffect(() => {
    //console.log(`${name} 님이 ${count}번 클릭했습니다`);
    setCntStr(cntStr + 1);
  }, [count]);

  return (
    <div>
      이름 변경 :
      <input type="text" value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
      <hr />
      <button onClick={() => setCount(count + 1)}>카운트 1 증가</button>
      <p>
        {name} 님이 {count}번 클릭했습니다.
      </p>
      <p>
        {cntStr}
      </p>
    </div>
  );
};

export default App;

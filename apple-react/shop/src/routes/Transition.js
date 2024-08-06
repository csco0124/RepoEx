import { useState, useTransition } from "react";

function Transition() {
  let [isPending, startTransition] = useTransition(); // startTransition : 코드시작을 뒤로 늦춰줌 (유사한 기능 : useDeferredValue)
  let arr = new Array(1000).fill(0);
  let [name, setName] = useState("");
  return (
    <div>
      <h5>useTransition 예제</h5>
      <div>
        <input
          onChange={(e) => {
            startTransition(() => {
              setName(e.target.value);
            });
          }}
        ></input>
      </div>
      {isPending ? '로딩중(isPending)' : arr.map((a, i) => {
        return <div key={i}>{name}</div>;
      })}
    </div>
  );
}

export default Transition;

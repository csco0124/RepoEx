import axios from "axios";
import { useEffect, useState } from "react";

const Count1 = (props) => {
  const [number, setNumber] = useState(0);
  const onIncrease = () => {
    setNumber(number+1);
  }
  const onDecrease = () => {
    setNumber(number-1);
  }
  const changeNum = (num) => {
    setNumber(num);
  }
  return (
    <div>
      <h1>{number}</h1>
      <div>
        <input type="number" value={number} onChange={(e) => changeNum(e.target.value)} />
        <button onClick={onIncrease}>+</button>
        <button onClick={onDecrease}>-</button>
      </div>
    </div>
  );
};
export default Count1;

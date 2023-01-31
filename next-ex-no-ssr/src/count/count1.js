import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "../spinners/spinners";

const Count1 = ({ number, diff, onIncrease, onDecrease, changeNum }) => {
  
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
}

export default Count1;

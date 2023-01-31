import logo from "./logo.svg";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Count1 from "./count/count1.js";
import List1 from "./list/list1.js";
import Home from "./Home.js";
import { useState } from "react";

function App() {
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/count" element={<Count1 number={number} onIncrease={onIncrease} onDecrease={onDecrease} changeNum={changeNum}/>} />
        <Route path="/list" element={<List1 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

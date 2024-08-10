import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import $api from "./common/CommonAxios";

type TestJsonData = {
  USER: string;
  ADDRESS: string;
};

function App() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    $api.get("/serverType").then(response =>{
      console.log(response.data);
    }).catch(error =>{
      if(import.meta.env.VITE_APP_SERVER !== 'local'){
        alert(error);
      }
    });
  }, []);

  

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h4>[SERVER : {import.meta.env.VITE_APP_SERVER}]</h4>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <br/>
      <div className="card">
        <button><Link to="/test">Sample 및 테스트 페이지 이동</Link></button>
      </div>
    </>
  );
}

export default App;

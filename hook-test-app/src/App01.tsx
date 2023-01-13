import { ChangeEvent, useState } from "react";

const App = () => {
  const [msg, setMsg] = useState<string>("");

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    setMsg(e.target.value);
  };
  
  return (
    <div>
      <input type="text" value={msg} onChange={change} />
      <br />
      <span>입력 메시지 : {msg}</span>
    </div>
  );
};

export default App;

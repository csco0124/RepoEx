import { useState } from "react";

function Transition() {
  let [name, setName] = useState('');
  return (
    <div>
      <div><input onChange={(e)=>{setName(e.target.value)}}></input></div>
      <div>{name}</div>
    </div>
  )
}

export default Transition;
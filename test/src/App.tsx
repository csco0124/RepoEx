import { useState } from "react";
import "./App.css";
import Table from "./Table";
import produce from "immer";

export type Person = {
  name: string;
  age: number;
  email: string;
};

function App() {
  const [person, setPerson] = useState<Person>();
  const [personList, setPersonList] = useState<Person[]>([{name: "test1",age: 20,email: "test@test.com",},
  ]);

  const addPerson = () => {
    const personObj: Person = {name: "test2",age: 22,email: "test2@test.com",};
    //const newPersonList = [...personList, personObj];   // 전개연산자 활용
    const newPersonList = produce(personList, draft => {  // immer 활용
      draft.push(personObj);
    });
    
    setPersonList(newPersonList);
  };

  return (
    <div className="container">
      <button onClick={addPerson}>추가</button>
      <Table personList={personList} />
    </div>
  );
}

export default App;

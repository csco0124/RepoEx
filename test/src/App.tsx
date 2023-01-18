import { useState } from "react";
import "./App.css";
import Table from "./Table";

export type Person = {
  name: string;
  age: number;
  email: string;
};

function App() {
  const [person, setPerson] = useState<Person>();
  const [personList, setPersonList] = useState<Person[]>([{
    name: "test1",
    age: 20,
    email: "test@test.com",
  }]);

  return (
    <div className="container">
      <Table personList={personList}></Table>
    </div>
  );
}

export default App;

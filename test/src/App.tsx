import { useState } from "react";
import "./App.css";
import Table from "./Table";


import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './redux';
import { Person, addPerson } from './redux/PersonList';

function App() {

  let personList:Array<Person> = useSelector((state: RootState) => state.PersonList.personList);
  console.log("personList", personList);
  const dispatch = useDispatch(); // 디스패치 함수를 가져옵니다

  const add = () => {
    /*const personObj: Person = {name: "test2",age: 22,email: "test2@test.com",};
    //const newPersonList = [...personList, personObj];   // 전개연산자 활용
    const newPersonList = produce(personList, draft => {  // immer 활용
      draft.push(personObj);
    });
    
    setPersonList(newPersonList);*/
    const personObj: Person = {name: "test2",age: 22,email: "test2@test.com",}
    dispatch(addPerson(personObj));
  };

  return (
    <div className="container">
      <h4>간단 리덕스</h4>
      <button onClick={add}>추가</button>
      <Table personList={personList} />
    </div>
  );
}

export default App;

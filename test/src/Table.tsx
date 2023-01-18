import { useState } from "react";
import { Person } from "./App";

export type PersonList = {
  personList: Person[];
};

//const Table = ({personList}:{personList:Person[]} ) => {
const Table = (props: PersonList) => {
    
    console.log(ppp);
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        {props.personList.map(({ name, age, email }) => (
          <tr>
            <th scope="row">1</th>
            <td>{name}</td>
            <td>{age}</td>
            <td>{email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

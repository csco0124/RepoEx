import { useState } from "react";
import { Person } from "./App";
type propType = {
    person : Person;
    index : number;
}
//const TableList = (props:propType) => {
const TableList = ({person, index} : {person:Person, index:number}) => {
  return (
    <tr key={index}>
      <th scope="row">1</th>
      <td>{person.name}</td>
      <td>{person.age}</td>
      <td>{person.email}</td>
    </tr>
  );
};

export default TableList;

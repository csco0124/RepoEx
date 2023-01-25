import { useState } from "react";
import { Person } from './redux/PersonList';
type propType = {
    person : Person;
}
//const TableList = (props:propType) => {
const TableList = ({person} : {person:Person}) => {
  return (
    <tr>
      <th scope="row">1</th>
      <td>{person.name}</td>
      <td>{person.age}</td>
      <td>{person.email}</td>
    </tr>
  );
};

export default TableList;

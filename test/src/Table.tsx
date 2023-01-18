import { useState } from "react";
import TableList from "./TableList";
import { Person } from "./App";

export type PersonList = {
  personList: Person[];
};

//const Table = ({personList}:{personList:Person[]} ) => {
const Table = (props: PersonList) => {
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
        {props.personList.map((person, index) => (
            <TableList person={person} index={index} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;

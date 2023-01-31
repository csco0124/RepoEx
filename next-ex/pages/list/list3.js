import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../spinners/spinners";

const List3 = ({ list }) => {
  const tableStyle = {
    border: "solid 1px black",
  };
  return (
      <table style={tableStyle}>
        <tbody>
      {
      list.map((resList) => (
          <tr key={resList.id}>
            <td>{resList.name}</td>
            <td>
              <img src={resList.image_link} />
            </td>
          </tr>
        ))
      }
        </tbody>
      </table>
  );
};
export default List3;


export const getServerSideProps = async () => {
  const res = await axios.get(
    "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline"
  );
  const data = res.data;
  return {
    props: {
      list: data,
    },
  };
};
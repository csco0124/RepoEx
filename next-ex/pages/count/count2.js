import axios from "axios";
import { useEffect, useState } from "react";

const Count2 = ({ list }) => {
  const tableStyle = {
    border: "solid 1px black",
  };
  return (
      <table style={tableStyle}>
        {list.map((resList) => (
          <tr key={resList.id}>
            <td>{resList.name}</td>
            <td>
              <img src={resList.image_link} />
            </td>
          </tr>
        ))}
      </table>
  );
};
export default Count2;


export const getStaticProps = async () => {
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
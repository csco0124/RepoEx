import axios from "axios";
import { useEffect, useState } from "react";

const Count1 = (props) => {
  const [list, setList] = useState([]);
  const tableStyle = {
    border: "solid 1px black",
  };

  useEffect(() => {
    axios.get("http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline")
      .then((res) => {
        console.log(res.data);

        const newList = res.data.map((resList) => (
          <tr key={resList.id}>
            <td>{resList.name}</td>
            <td><img src={resList.image_link}/></td>
          </tr>
        ));
        setList(newList);
      });
  }, []);

  return (
    <div>
      <table style={tableStyle}>{list}</table>
    </div>
  );
};
export default Count1;

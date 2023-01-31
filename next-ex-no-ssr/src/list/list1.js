import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "../spinners/spinners";

const List1 = (props) => {
  const [loading, getLoading] = useState(true);
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
            <td><img src={resList.image_link} alt="img" /></td>
          </tr>
        ));
        setList(newList);
        getLoading(false);
      });
  }, []);

  return (
    <div>
      {
        loading?<Spinner/>:
        <table style={tableStyle}>
          <tbody>
            {list}
          </tbody>
        </table>
      }
      
    </div>
  );
};
export default List1;

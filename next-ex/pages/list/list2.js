import axios from "axios";
import Link from 'next/link'

const List2 = ({ list }) => {
  const tableStyle = {
    border: "solid 1px black",
  };
  return (
      <table style={tableStyle}>
        <tbody>
        {list.map((resList) => (
          <tr key={resList.id}>
            <td>{resList.name}</td>
            <td>
              <img src={resList.image_link} />
            </td>
            <td>
            <Link href={`/list/${resList.id}`}>
              {resList.id}
            </Link>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
  );
};
export default List2;


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
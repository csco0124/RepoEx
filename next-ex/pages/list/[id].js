import Axios from "axios";

//  getServerSideProps를 통해 item을 받아올 수 있으므로
// name도 받아온다
const listItem = ({ item }) => {
  console.log(item);
  return (
    <>
      {item && (
        <>
          {item.brand}
          <br/>
          <img src={item.image_link} />
          <br />
          {item.price}
        </>
      )}
    </>
  );
};

export default listItem;

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { id: "495" } },
      { params: { id: "488" } }
    ],
    fallback: true
  }
}

// getServerSideProps로 서버에서 데이터를 가져옴
export async function getStaticProps(context) {
  const id = context.params.id;
  const apiUrl = `http://makeup-api.herokuapp.com/api/v1/products/${id}.json`;
  const res = await Axios.get(apiUrl);
  const data = res.data;
  return {
    props: {
      item: data
    },
  };
}
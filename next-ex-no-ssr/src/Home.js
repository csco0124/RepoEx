import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Link to={"/count"}>
        <h4>count</h4>
      </Link>
      <br />
      <Link to={"/list"}>
        <h4>list</h4>
      </Link>
    </div>
  );
};
export default Home;

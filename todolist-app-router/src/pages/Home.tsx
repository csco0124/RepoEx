import MyTime from "./MyTime";
import TimeActionCreator from "../redux/TimeActionCreator";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { AnyAction, Dispatch } from "redux";
import { RootStatesType } from "../redux/AppStore";

type PropsType = {
  currentTime: Date;
  changeTime: () => void;
};

const Home = ({ currentTime, changeTime }: PropsType) => {
  const navigate = useNavigate();
  const goLogoutPage = () => {
    navigate("/logout");
  }
  return (
    <div className="card card-body">
      <h2>Home</h2>
      <MyTime currentTime={currentTime} changeTime={changeTime} />
      <br/>
      <button className="col-1 btn btn-secondary" onClick={goLogoutPage}>logout</button>
    </div>
  );
};

const mapStateToProps = (state: RootStatesType) => ({ currentTime: state.home.currentTime });
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  changeTime: () => dispatch(TimeActionCreator.changeTime()),
});

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);
export default HomeContainer;

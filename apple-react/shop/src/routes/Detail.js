import { useParams } from "react-router-dom";
import styled from "styled-components";
import data from "./../data";

const YellowBtn = styled.button`
  background: ${(props) => props.bg};
  color: ${(props) => (props.bg === "blue" ? "white" : "black")};
  padding: 10px;
`;

const NewBtn = styled(YellowBtn)`
  padding: 10px;
`;

function Detail() {
  let { id } = useParams();
  let shoes = data.find(function (x) {
    return x.id === Number(id);
  });
  return (
    <div className="container">
      {/* 
      styled-components 예제
      <YellowBtn bg="blue">버튼</YellowBtn>
      <YellowBtn bg="yellow">버튼</YellowBtn>
      <NewBtn bg="yellow">상속버튼</NewBtn> */}

      {!shoes ? (
        <div>상품없음</div>
      ) : (
        <div className="row">
          <div className="col-md-6">
            <img
              src={process.env.PUBLIC_URL + `/shoes${Number(id) + 1}.jpg`}
              width="100%"
              alt={`shoes${Number(id) + 1}`}
            />
          </div>
          <div className="col-md-6">
            <h4 className="pt-5">{shoes.title}</h4>
            <p>{shoes.content}</p>
            <p>{shoes.price}</p>
            <button className="btn btn-danger">주문하기</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;

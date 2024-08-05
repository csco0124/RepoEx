import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import data from "./../data";
import { Nav } from "react-bootstrap";

const YellowBtn = styled.button`
  background: ${(props) => props.bg};
  color: ${(props) => (props.bg === "blue" ? "white" : "black")};
  padding: 10px;
`;

const NewBtn = styled(YellowBtn)`
  padding: 10px;
`;

function Detail() {
  useEffect(() => {
    let timer = setTimeout(() => {
      setAlert(false);
    }, 2000);
    return () => {
      // useEffect 실행되기 전에 실행됨 (mount시에는 실행안되며, unmount시애는 실행됨)
      clearTimeout(timer); // 기존에 실행되는 타이머는 제거
    };
  }, []);
  let { id } = useParams();
  let [alert, setAlert] = useState(true);
  let [tab, setTab] = useState(0);

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

      {alert === true ? (
        <div className="alert alert-warning">2초이내 구매시 할인</div>
      ) : null}

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

      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link eventKey="link0" onClick={() => {setTab(0)}}>버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link1" onClick={() => {setTab(1)}}>버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link2" onClick={() => {setTab(2)}}>버튼2</Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab} />
    </div>
  );
}

function TabContent({ tab }) {

  let [fade, setFade] = useState('');

  useEffect(() => {
    let fadeTimeout = setTimeout(()=>{setFade("end");}, 10);
    return () => {
      clearTimeout(fadeTimeout);
      setFade("");
    }
  }, [tab]);

  return (
    <div className={`start ${fade}`}>
      {
        [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab]
      }
    </div>
  );
}

export default Detail;

import "./App.css";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import { useQuery } from "react-query";
import data from "./data";
import axios from "axios";
import Cart from "./routes/Cart.js";
import Transition from "./routes/Transition.js";
const Detail = lazy(() => import("./routes/Detail"));

function App() {
  let navigate = useNavigate();
  let [shoes, setShoes] = useState(data);

  useEffect(() => {
    let watchedItem = localStorage.getItem("watched");
    if (!watchedItem) {
      localStorage.setItem("watched", JSON.stringify([]));
    }
  }, []);

  let userdataResult = useQuery(
    "userdata",
    () =>
      axios.get("https://codingapple1.github.io/userdata.json").then((a) => {
        // console.log("useQuery 요청.....");
        return a.data;
      }),
    { staleTime: 2000 } // 2초마다 refetch(호출)
  );
  //console.log(userdataResult);

  return (
    <div className="App">
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              Cart
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/transition");
              }}
            >
              Transition
            </Nav.Link>
            
            <Nav.Link
              onClick={() => {
                navigate("/about");
              }}
            >
              About
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {userdataResult.isLoading && "로딩중"}
            {userdataResult.error && "에러남"}
            {userdataResult.data && `반가워요 ${userdataResult.data.name}`}
          </Nav>
        </Container>
      </Navbar>

      <div className="main-bg"></div>
      <Suspense fallback={<div>로딩중...</div>}>
        {/* Suspense : lazy loading 되는 컴포넌트을 위해 감싸줌 */}
        <Routes>
          <Route
            path="/"
            element={
              <div className="container">
                <div className="row">
                  <Card data={shoes} />
                  <Button
                    onClick={() => {
                      axios
                        .get("https://codingapple1.github.io/shop/data2.json")
                        .then((res) => {
                          console.log("data", res.data);
                          setShoes([...shoes, ...res.data]);
                        })
                        .catch((e) => {
                          console.log("실패", e);
                        });
                    }}
                  >
                    더보기
                  </Button>
                </div>
              </div>
            }
          />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/transition" element={<Transition />} />
          <Route path="/about" element={<About />}>
            <Route path="member" element={<div>멤버임</div>} />
            <Route path="location" element={<div>위치임</div>} />
          </Route>
          <Route path="*" element={<div>없는페이지에요</div>} />
        </Routes>
      </Suspense>
    </div>
  );
}

function About() {
  return (
    <div>
      <h4>회사정보</h4>
      <h5>
        <Outlet />
      </h5>
    </div>
  );
}

function Card(props) {
  let navigate = useNavigate();
  return (
    <>
      {props.data.map((a, i) => {
        return (
          <div className="col-md-4" key={i}>
            <img
              src={process.env.PUBLIC_URL + `/shoes${a.id + 1}.jpg`}
              width="80%"
              style={{ cursor: "pointer" }}
              alt={`shoes${a.id + 1}`}
              onClick={() => {
                navigate(`/detail/${a.id}`);
              }}
            />
            <h4>{a.title}</h4>
            <p>{a.price}</p>
          </div>
        );
      })}
    </>
  );
}

export default App;

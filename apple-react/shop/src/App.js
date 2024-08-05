import { Button, Container, Nav, Navbar } from "react-bootstrap";
import "./App.css";
import { useEffect, useState } from "react";
import data from "./data";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./routes/Detail";
import Cart from "./routes/Cart";
import axios from "axios";

function App() {
  let navigate = useNavigate();
  let [shoes, setShoes] = useState(data);

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify([]));
  }, []);

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
                navigate("/about");
              }}
            >
              About
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="main-bg"></div>
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
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>멤버임</div>} />
          <Route path="location" element={<div>위치임</div>} />
        </Route>
        <Route path="*" element={<div>없는페이지에요</div>} />
      </Routes>
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

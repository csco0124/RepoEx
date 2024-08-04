import { Container, Nav, Navbar } from "react-bootstrap";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#cart">Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="main-bg"></div> 

      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <img src={process.env.PUBLIC_URL +  '/shoes1.jpg'} width="80%" alt="shoes1" />
            <h4>상품명</h4>
            <p>상품정보</p>
          </div>
          <div className="col-md-4">
            <img src={process.env.PUBLIC_URL +  '/shoes2.jpg'} width="80%" alt="shoes2" />
            <h4>상품명</h4>
            <p>상품정보</p>
          </div>
          <div className="col-md-4">
            <img src={process.env.PUBLIC_URL +  '/shoes3.jpg'} width="80%" alt="shoes3" />
            <h4>상품명</h4>
            <p>상품정보</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;

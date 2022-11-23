import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import LoginComponent from "./components/PostComponents/LoginComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import HomeComponent from "./components/HomeComponent";
import SignUpComponent from "./components/PostComponents/SignUpComponent";
import NavbarComponent from "./components/NavbarComponent";
import SettingsComponent from "./components/SettingsComponent";
import ClientPostComponent from "./components/PostComponents/ClientPostComponent";
import AddressPostComponent from "./components/PostComponents/AddressPostComponent";
import ClientiComponent from "./components/GetComponents/ClientiComponent";

function App() {
  return (
    <BrowserRouter>
      <Container fluid >
        <Row className="d-flex justify-content-between mainContainer">
          <Col className="p-0" xs= {2}>
          <NavbarComponent />
          </Col>
          <Col xs={8} className={"p-3"}>
              <Routes>
                <Route path="/" element={<HomeComponent />} />
                <Route path="/login" element={<LoginComponent />} />
                <Route path="/signup" element={<SignUpComponent />} />
                <Route path="/postClient" element={<ClientPostComponent />} />
                <Route path="/postAddress" element={<AddressPostComponent />} />
                <Route path="/clienti" element={<ClientiComponent />} />
              </Routes>
          </Col>
          <Col className="p-0" xs={2}>
          <SettingsComponent />
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
}

export default App;

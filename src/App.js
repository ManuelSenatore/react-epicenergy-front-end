import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import LoginComponent from "./components/LoginComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import HomeComponent from "./components/HomeComponent";
import SignUpComponent from "./components/SignUpComponent";
import NavbarComponent from "./components/NavbarComponent";
import SettingsComponent from "./components/SettingsComponent";
import ClientPostComponent from "./components/ClientPostComponent";
import AddressPostComponent from "./components/AddressPostComponent";
import ClientiComponent from "./components/ClientiComponent";

function App() {
  return (
    <BrowserRouter>
      <Container fluid >
        <Row className="d-flex justify-content-between mainContainer">
          <Col className="p-0" xs= {2}>
          <NavbarComponent />
          </Col>
          <Col xs={6}>
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

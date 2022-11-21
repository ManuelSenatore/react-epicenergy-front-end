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

function App() {
  return (
    <BrowserRouter>
      <Container fluid style={{
        maxWidth: 100 + "vw",
        minWidth: 100 + "vw"
      }}>
        <Row className="d-flex">
          <Col xs= {3}>
          <NavbarComponent />
          </Col>
          <Col xs={6}>
          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/signup" element={<SignUpComponent />} />
            <Route path="/postClient" element={<ClientPostComponent />} />
            <Route path="/postAddress" element={<AddressPostComponent />} />
          </Routes>
          </Col>
          <Col xs={3}>
          <SettingsComponent />
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
}

export default App;

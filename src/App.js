import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import LoginComponent from "./components/LoginComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap";
import HomeComponent from "./components/HomeComponent";
import SignUpComponent from "./components/SignUpComponent";

function App() {
  return (
      <BrowserRouter>
        <Container>
          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/signup" element={<SignUpComponent />} />
          </Routes>
        </Container>
      </BrowserRouter>
  );
}

export default App;

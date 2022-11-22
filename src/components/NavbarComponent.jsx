import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/actions";
import { useNavigate } from "react-router-dom";
import { Button , Col , Container , Row } from "react-bootstrap";

function NavbarComponent() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [ lista , setLista ] = useState (["1", "2"]);

  const navigate = useNavigate();


  useEffect(() => {
    if (user.token === undefined) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.token]);

  return (
    <Container className="text-center navbarContainer">
      <Row className="d-flex flex-column justify-content-between align-items-start h-100">
        <Col className="d-flex flex-column justify-content-center">
          <Button className="d-block w-100" variant="danger" onClick={() => dispatch(logout())}>Logout</Button>
        </Col>
        <Col className="d-flex flex-column justify-content-center">
          <Button className="d-block w-100" variant="primary" onClick={() => navigate("/")}>Home</Button>
        </Col>
        <Col className="d-flex flex-column justify-content-center">
          <Button className="d-block w-100" variant="success" onClick={() => navigate("/clienti")}>Clienti</Button>
        </Col>
      </Row>


    </Container>
  );
}

export default NavbarComponent;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/actions";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

function NavbarComponent() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const navigate = useNavigate();


  useEffect(() => {
    if (user.token === undefined) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.token]);

  return (
    <Container>
      <h1>navbar</h1>
      <Button variant="danger" onClick={() => dispatch(logout())}>Logout</Button>
    </Container>
  );
}

export default NavbarComponent;

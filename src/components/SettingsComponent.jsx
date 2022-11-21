import React , { useEffect , useState } from "react";
import { Container } from "react-bootstrap";
import { Button, Form} from "react-bootstrap";
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

function SettingsComponent() {

    const navigate = useNavigate()

  return (
    <Container>
      <h1>Settings</h1>
      <Button onClick={() => navigate("/postClient")}>Add Client</Button>
      <Button onClick={() => navigate("/postAddress")}>Add Address</Button>
    </Container>
  );
}

export default SettingsComponent;

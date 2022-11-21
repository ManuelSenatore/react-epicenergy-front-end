import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import InputComuniComponent from "./InputComuniComponent";
import { useNavigate } from "react-router-dom";

function AddressPostComponent() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.user.token);

  const [formObj, setFormObj] = useState({
    // oggetto per la compilazione del form

    via: "",
    civico: "",
    cap: "",
    nomeComune: "",
  });

  const handleForm = (key, value) => {
    // setta l'oggetto del form
    setFormObj((form) => {
      return {
        ...form,
        [key]: value,
      };
    });
  };

  const getComuniList = async () => {
    const baseEndpoint = "http://localhost:8080/api/indirizzi/new-raw";
    const header = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(baseEndpoint, {
        method: "POST",
        headers: header,
        body: JSON.stringify(formObj),
      });
      if (response.ok) {
        const data = await response.json();
        navigate("/");
        console.log(data);
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          getComuniList();
        }}
      >
        <Form.Group className="mb-3">
          <Form.Label>Road</Form.Label>
          <Form.Control
            value={formObj.via}
            onChange={(e) => handleForm("via", e.target.value)}
            type="text"
            placeholder="Enter Road"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Civic Number</Form.Label>
          <Form.Control
            value={formObj.civico}
            onChange={(e) => handleForm("civico", e.target.value)}
            type="number"
            placeholder="Enter Civic Number"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Cap</Form.Label>
          <Form.Control
            value={formObj.cap}
            onChange={(e) => handleForm("cap", e.target.value)}
            type="number"
            placeholder="Enter Cap"
          />
        </Form.Group>

        <InputComuniComponent handleForm={handleForm} />
        <Button variant="success" type="submit">
          Add
        </Button>
      </Form>
    </div>
  );
}

export default AddressPostComponent;

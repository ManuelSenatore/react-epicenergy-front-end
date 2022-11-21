import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";

function ClientPostComponent() {
  const token = useSelector((state) => state.user.user.token);

  const [formObj, setFormObj] = useState({
    // oggetto per la compilazione del form

    userId: "",
    partitaIva: "",
    indirizzoLegaleId: "",
    indirizzoOperativoId: "",
    email: "",
    pec: "",
    emailContatto: "",
    nomeContatto: "",
    cognomeContatto: "",
    telefonoContatto: "",
    ragioneSociale: "",
    fatturatoAnnuo: "",
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

  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Form.Group className="mb-3">
          <Form.Label>User Id</Form.Label>
          <Form.Control
            value={formObj.userId}
            onChange={(e) => handleForm("userId", e.target.value)}
            type="number"
            placeholder="Enter Id"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>VAT Number</Form.Label>
          <Form.Control
            value={formObj.partitaIva}
            onChange={(e) => handleForm("partitaIva", e.target.value)}
            type="number"
            placeholder="Enter VAT Number"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Legal Address</Form.Label>
          <Form.Control
            value={formObj.indirizzoLegaleId}
            onChange={(e) => handleForm("indirizzoLegaleId", e.target.value)}
            type="number"
            placeholder="Enter Legal Address"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Operative Address</Form.Label>
          <Form.Control
            value={formObj.indirizzoOperativoId}
            onChange={(e) => handleForm("indirizzoOperativoId", e.target.value)}
            type="number"
            placeholder="Enter Operative Address"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={formObj.email}
            onChange={(e) => handleForm("email", e.target.value)}
            type="email"
            placeholder="Email"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Pec</Form.Label>
          <Form.Control
            value={formObj.pec}
            onChange={(e) => handleForm("pec", e.target.value)}
            type="email"
            placeholder="Pec"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contact Email</Form.Label>
          <Form.Control
            value={formObj.emailContatto}
            onChange={(e) => handleForm("emailContatto", e.target.value)}
            type="email"
            placeholder="Contact Email"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={formObj.nomeContatto}
            onChange={(e) => handleForm("nomeContatto", e.target.value)}
            type="text"
            placeholder="Name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Surame</Form.Label>
          <Form.Control
            value={formObj.cognomeContatto}
            onChange={(e) => handleForm("cognomeContatto", e.target.value)}
            type="text"
            placeholder="Surname"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Telephone</Form.Label>
          <Form.Control
            value={formObj.telefonoContatto}
            onChange={(e) => handleForm("telefonoContatto", e.target.value)}
            type="number"
            placeholder="Telephone"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Business Name</Form.Label>
          <Form.Select
            value={formObj.nomeContatto}
            onChange={(e) => handleForm("ragioneSociale", e.target.selectedOptions)}
          >
            <option value={"PA"}>PA</option>
            <option value={"SAS"}>SAS</option>
            <option value={"SPA"}>SPA</option>
            <option value={"SRL"}>SRL</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Annual Revenue</Form.Label>
          <Form.Control
            value={formObj.password}
            onChange={(e) => handleForm("fatturatoAnnuo", e.target.value)}
            type="number"
            placeholder="Annual Revenue"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default ClientPostComponent;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getClientList, getClientListByParams } from "../../redux/actions/actions";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import CardClienteComponent from "./CardClienteComponent";
import InputGroup from 'react-bootstrap/InputGroup';

const ClientiComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const clientList = useSelector((state) => state.client.clientList);

  const token = useSelector((state) => state.user.user.token);

  const navigate = useNavigate();

  const [formObj, setFormObj] = useState({
    // oggetto per la compilazione del form
    stringa: "",
    value: "",
    value2: "",
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

  useEffect(() => {
    if (user.token === undefined) {
      navigate("/login");
    } else {
      dispatch(getClientList(token));
      if (clientList.length > 0) {
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.token]);

  console.log(formObj);
  console.log(clientList);

  return (
    <Container fluid>
      <Row className="d-flex flex-column justify-content-between">
        <Col className=" w-100 d-flex">
          <Form  onSubmit={ (e) => {
                    e.preventDefault ();
                    dispatch(getClientListByParams(token, formObj.stringa, formObj.value, formObj.value2));
                } }>
            <Form.Group className="mb-3">
              <Form.Label>Cerca per:</Form.Label>
              <Form.Select
                onChange={(e) => handleForm("stringa", e.target.value)}
              >
                <option></option>
                <option value={"filter-data-inserimento"}>
                  Data Inserimento
                </option>
                <option value={"fatturato"}>Fatturato</option>
                <option value={"filter-nome-cognome"}>Nome e Cognome</option>
              </Form.Select>
            </Form.Group>
            {formObj.stringa === "fatturato" && (
              <Form.Group className="d-flex">
                <Form.Control
                  type="number"
                  placeholder="Fatturato"
                  className="me-2 "
                  onChange={(e) => handleForm("value", e.target.value)}
                  style={{}}
                  aria-label="Cerca"
                ></Form.Control>
                <Button type="submit">Search</Button>
              </Form.Group>
            )}
            {formObj.stringa === "filter-nome-cognome" && (
                    <InputGroup className="mb-3">
                    <InputGroup.Text>Nome e Cognome</InputGroup.Text>
                    <Form.Control onChange={(e) => handleForm("value", e.target.value)} aria-label="First name" placeholder="Nome" />
                    <Form.Control onChange={(e) => handleForm("value2", e.target.value)} aria-label="Last name" placeholder="Cognome" />
                    <Button type="submit">Cerca</Button>
                  </InputGroup>
            )}
            {formObj.stringa === "filter-data-inserimento" && (
                 <Form.Group className="d-flex">
                 <Form.Control
                   type="date"
                   placeholder="Fatturato"
                   className="me-2 "
                   onChange={(e) => handleForm("value", e.target.value)}
                   style={{}}
                   aria-label="Cerca"
                 ></Form.Control>
                 <Button type="submit">Search</Button>
               </Form.Group>
            )}
          </Form>
        </Col>
        {clientList?.map((cliente, index) => {
          return (
            <Col className="d-flex justify-content-center" key={index}>
              <CardClienteComponent
                cliente={cliente}
                index={index}
                arrLen={clientList.length}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default ClientiComponent;

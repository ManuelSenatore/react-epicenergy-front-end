import React, { useEffect, useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import MyDatalistInput from "../GetComponents/MyDatalistInput";
import { useDispatch, useSelector } from "react-redux";
import { getUserList } from "../../redux/actions/actions";
import { useNavigate } from "react-router-dom";

const PutUserComponent = () => {
  const navigate = useNavigate();
  const userList = useSelector((state) => state.user.userList);
  const token = useSelector((state) => state.user.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token === undefined) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const dispatchUserList = () => {
    dispatch(getUserList(token));
  };

  const [formObj, setFormObj] = useState({
    id: "",
    nomeCompleto: "",
    email: "",
    username: "",
    password: "",
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

  const handleFormObj = (name, id) => {
    let findObj = userList.find((e) => e.id === id);
    setFormObj({
      id: findObj.id,
      nomeCompleto: findObj.nomeCompleto,
      email: findObj.email,
      username: findObj.username,
      password: findObj.password,
    });
  };

  const putUser = async (obj) => {
    const baseEndpoint = `http://localhost:8080/api/users/${obj.id}`;

    const header = {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await fetch(baseEndpoint, {
        method: "PUT",
        headers: header,
        body: JSON.stringify(obj),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate("/utenti");
      } else {
        console.log("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const maker = () => {
    let arr = [];

    userList?.map((e) => {
      let obj = {
        id: e.id,
        value: "Username: " + e.username + " | Email: " + e.email,
      };
      console.log("eseguo push");
      return arr.push(obj);
    });
    return arr;
  };

  return (
    <div
      style={{
        color: "royalblue",
        borderRadius: "5px",
        padding: "20px",
      }}
    >
      <Row>
        <div className="my-3">
          <MyDatalistInput
            handleForm={handleFormObj}
            handleFormName={""}
            triggerFetch={dispatchUserList}
            arrayComuniList={maker(userList)}
            placeDataList={"Ricerca Utente"}
            labelDataList={"Seleziona o inserisci i dati dell' utente"}
            choice={"id"}
          />
        </div>
      </Row>
      <Row>
        <Form onSubmit={(e) => {
            e.preventDefault();
            putUser(formObj)
        }}>
          <Form.Group className="mb-3 mt-2">
            <Form.Label>Nome Completo</Form.Label>
            <Form.Control
              value={formObj.nomeCompleto}
              onChange={(e) => handleForm("nomeCompleto", e.target.value)}
              type="text"
              placeholder="Nome Completo"
            />
          </Form.Group>
          <Form.Group className="mb-3 mt-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={formObj.email}
              onChange={(e) => handleForm("email", e.target.value)}
              type="email"
              placeholder="Email"
            />
          </Form.Group>
          <Form.Group className="mb-3 mt-2">
            <Form.Label>Username</Form.Label>
            <Form.Control
              value={formObj.username}
              onChange={(e) => handleForm("username", e.target.value)}
              type="text"
              placeholder="Username"
            />
          </Form.Group>
          <Form.Group className="mb-3 mt-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={formObj.password}
              onChange={(e) => handleForm("password", e.target.value)}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button
            className={"w-25 d-block mx-auto"}
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </Row>
    </div>
  );
};

export default PutUserComponent;

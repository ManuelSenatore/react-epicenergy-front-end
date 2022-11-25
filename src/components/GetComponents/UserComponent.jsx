import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { getUserList, setUserList } from "../../redux/actions/actions";
import CardUserComponent from "./CardUserComponent";
import { useNavigate } from "react-router-dom";

const UserComponent = () => {
  const token = useSelector((state) => state.user.user.token);
  const userList = useSelector((state) => state.user.userList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formObj, setFormObj] = useState({
    // oggetto per la compilazione del form
    stringa: "",
    value: "",
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
    if (formObj.stringa.length === 0) {
      dispatch(getUserList(token));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formObj.stringa]);

  useEffect(() => {
    if (token === undefined) {
      navigate("/login");
    } else {
      dispatch(getUserList(token));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const getUserListByUsername = async (key, stringa, value) => {
    const baseEndpoint = `http://localhost:8080/api/users/${stringa}/${value}`;
    const header = {
      Authorization: `Bearer ${key}`,
    };
    try {
      const response = await fetch(baseEndpoint, {
        method: "GET",
        headers: header,
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(setUserList(data));
        console.log(data);
      } else {
        console.log("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container fluid>
      <Row className="d-flex flex-column">
        <Col className=" w-100 d-flex">
          <Form
            className="w-50"
            onSubmit={(e) => {
              e.preventDefault();
              getUserListByUsername(token, formObj.stringa, formObj.value);
            }}
          >
            <Form.Group className="mb-3">
              <Form.Select
                onChange={(e) => handleForm("stringa", e.target.value)}
              >
                <option value={""}>Cerca per: Tutti gli Utenti</option>
                <option value={"username-contains"}>Cerca per: Username</option>
              </Form.Select>
            </Form.Group>
            {formObj.stringa === "username-contains" && (
              <Form.Group className="d-flex">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  className="me-2 "
                  onChange={(e) => handleForm("value", e.target.value)}
                  /*              onKeyUp={(e) => {
                    e.preventDefault();
                    getUserListByUsername(
                      token,
                      formObj.stringa,
                      formObj.value
                    );
                  }} */
                  aria-label="Cerca"
                ></Form.Control>
                <Button type="submit">Cerca</Button>
              </Form.Group>
            )}
          </Form>
        </Col>
        {userList?.map((user, index) => {
          return (
            <Col className="d-flex justify-content-center" key={index}>
              <CardUserComponent
                user={user}
                index={index}
                arrLen={userList.length}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default UserComponent;

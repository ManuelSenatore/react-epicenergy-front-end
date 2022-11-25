import React, { useState } from "react";
import { Button, Card, Col, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getClientListFromUser } from "../../redux/actions/actions";

const CardUserComponent = (props) => {
  const [infoFlag, setInfoFlag] = useState(false);
  const token = useSelector((state) => state.user.user.token);
  const [clientList, setClientList] = useState([]);

  const orgRoleType = (arr) => {
    const arr1 = [];
    arr.forEach((el) => {
      arr1.push(el.roleType.substring(5, el.roleType.length));
    });
    return arr1.join(", ");
  };

  const getClientListFromUser = async (id) => {
    const baseEndpoint = `http://localhost:8080/api/clienti/user/${id}`;
      console.log("eseguo get client list");
    const header = {
      Authorization: `Bearer ${token}`,
    };
      try {
        const response = await fetch(baseEndpoint, {
          method: "GET",
          headers: header,
        });
        if (response.ok) {
          const data = await response.json();
          setClientList(data)
        } else {
          console.log("Error fetching results");
        }
      } catch (error) {
    }
  };

  return (
    <>
      <Card
        className={
          props.index === 0 || props.index === props.arrLen - 1
            ? "text-center w-100 cardBorderStyle"
            : "text-center w-100 "
        }
        border="primary"
        style={{
          borderRadius: 0,
        }}
      >
        <Card.Header style={{fontWeight: "bolder", color: "royalblue"}} className={"text-start"}>
          Utente N.{props.user.id + " " + props.user.nomeCompleto}
        </Card.Header>
        <Card.Body>

          <ListGroup className="list-group-flush d-flex flex-row justify-content-evenly flex-wrap">
            <ListGroup.Item className="borderBottomInfo w-25">
              <b>Email</b> <br />
              {props.user.email}
            </ListGroup.Item>
            <ListGroup.Item className="borderBottomInfo w-25">
              <b>Username</b> <br />
              {props.user?.username}
            </ListGroup.Item>
            <ListGroup.Item className="borderBottomInfo w-25">
              <b>Ruolo</b> <br />
              {orgRoleType(props.user.roles)}
            </ListGroup.Item>
          </ListGroup>

          <div
            onClick={() => {
              setInfoFlag(!infoFlag);
              getClientListFromUser(props.user.id)
            }}
            className={infoFlag ? "openInfoTrue" : "openInfo"}
          ></div>
          {infoFlag && (
            <ListGroup className="list-group-flush d-flex flex-row justify-content-evenly flex-wrap">
              {clientList?.map((client, index) => {
                return (
                  <ListGroup.Item key={index} className="borderBottomInfo w-100">
                    CLIENTE N.
                    {client.clienteId +
                      " " +
                      client.nomeContatto +
                      " " +
                      client.cognomeContatto}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default CardUserComponent;

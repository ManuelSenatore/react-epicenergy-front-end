import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col , Container , Row } from "react-bootstrap";
import { getUserList } from "../../redux/actions/actions";
import CardUserComponent from "./CardUserComponent";
import { useNavigate } from "react-router-dom";


const UserComponent = () => {
  const token = useSelector((state) => state.user.user.token);
  const userList = useSelector((state) => state.user.userList);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getUserList(token))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect ( () => {
    if ( token === undefined) {
      navigate("/login")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[token] );

  return (
    <Container fluid>
      <Row className="d-flex flex-column">
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

import React , { useEffect , useState } from "react";
import { Col , Container , Row } from "react-bootstrap";
import { Button , Form } from "react-bootstrap";
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

function SettingsComponent() {

    const navigate = useNavigate ()

    return (
        <Container className="text-center settingsContainer">
            <Row className="d-flex flex-column justify-content-between align-items-start h-100">
                <Col className="d-flex flex-column justify-content-center">
                    <Button className="d-block w-100" onClick={ () => navigate ( "/postClient" ) }>Add Client</Button>
                </Col>
                <Col className="d-flex flex-column justify-content-center">
                    <Button className="d-block w-100" onClick={ () => navigate ( "/postAddress" ) }>Add Address</Button>
                </Col>
            </Row>

        </Container>
    );
}

export default SettingsComponent;

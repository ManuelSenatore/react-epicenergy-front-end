import React , { useEffect , useState } from "react";
import { Col , Container , Row } from "react-bootstrap";
import { Button , Form } from "react-bootstrap";
import { useSelector } from 'react-redux'
import { useLocation , useNavigate } from "react-router-dom";

function SettingsComponent() {

    const navigate = useNavigate ()
    const location = useLocation()

    console.log(location)

    return (
        <Container className="text-center settingsContainer">
            <Row className="d-flex flex-column justify-content-between align-items-start h-100">
                <Col className="d-flex flex-column justify-content-end">
                    {
                        location.pathname === "/login" ||
                        location.pathname === "/signup" || (
                            <>
                                <Button
                                    variant={"light"}
                                    className={location.pathname === "/postClient" ? "d-block w-100 boxShadowSelected" : "d-block w-100"}
                                    onClick={ () => navigate ( "/postClient" ) }
                                >
                                    Inserisci cliente
                                </Button>
                                {
                                    location.pathname === "/postClient" ? (
                                        <div className="segnalino2 me-auto"></div>
                                    ) : (
                                        <div style={
                                            {
                                                height: "40px",
                                                width: "40px"
                                            }
                                        }>

                                        </div>
                                    )
                                }
                                <Button
                                    variant={"light"}
                                    className={location.pathname === "/postAddress" ? "d-block w-100 boxShadowSelected" : "d-block w-100"}
                                    onClick={ () => navigate ( "/postAddress" ) }
                                >
                                    Aggiungi indirizzo
                                </Button>
                                {
                                    location.pathname === "/postAddress" ? (
                                        <div className="segnalino2 me-auto"></div>
                                    ) : (
                                        <div style={
                                            {
                                                height: "40px",
                                                width: "40px"
                                            }
                                        }>

                                        </div>
                                    )
                                }
                            </>
                        )

                    }

                </Col>
            </Row>

        </Container>
    );
}

export default SettingsComponent;

import React , { useEffect , useState } from "react";
import { useDispatch , useSelector } from "react-redux";
import { logout } from "../redux/actions/actions";
import { useLocation , useNavigate } from "react-router-dom";
import { Button , Col , Container , Row } from "react-bootstrap";

function NavbarComponent() {
    const dispatch = useDispatch ();

    const location = useLocation ()
    const user = useSelector ( (state) => state.user.user );

    const navigate = useNavigate ();


    useEffect ( () => {
        if ( user.token === undefined ) {
            navigate ( "/login" );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [ user.token ] );

    return (
        <Container className="text-center navbarContainer">
            <Row className="d-flex flex-column justify-content-between align-items-start h-100">
                <Col className="d-flex flex-column justify-content-start">

                    {
                        location.pathname === "/login" ||
                        location.pathname === "/signup" ? (
                            <>
                                <div style={
                                    {
                                        height : "40px" ,
                                        width : "40px"
                                    }
                                }>

                                </div>
                                <Button
                                    className={ location.pathname === "/login" ? "d-block w-100 boxShadowSelected" : "d-block w-100" }
                                    variant="light"
                                    onClick={ () => navigate ( "/login" ) }
                                >ACCEDI
                                </Button>
                                {
                                    location.pathname === "/login" ? (
                                        <div className="segnalino ms-auto"></div>
                                    ) : (
                                        <div style={
                                            {
                                                height : "40px" ,
                                                width : "40px"
                                            }
                                        }>

                                        </div>
                                    )
                                }<Button
                                className={ location.pathname === "/signup" ? "d-block w-100 boxShadowSelected" : "d-block w-100" }
                                variant="light"
                                onClick={ () => navigate ( "/signup" ) }
                            >REGISTRATI
                            </Button>
                                {
                                    location.pathname === "/signup" ? (
                                        <div className="segnalino ms-auto"></div>
                                    ) : (
                                        <div style={
                                            {
                                                height : "40px" ,
                                                width : "40px"
                                            }
                                        }>

                                        </div>
                                    )
                                }
                            </>
                        ) : (
                            <>
                                <Button className="d-inline-block"
                                        variant="danger"
                                        onClick={ () => dispatch ( logout () ) }
                                >
                                    Logout
                                </Button>
                                <div style={
                                    {
                                        height : "40px" ,
                                        width : "40px"
                                    }
                                }>

                                </div>
                                <Button
                                    className={ location.pathname === "/" ? "d-block w-100 boxShadowSelected" : "d-block w-100" }
                                    variant="light" onClick={ () => navigate ( "/" ) }
                                >
                                    HOME
                                </Button>
                                {
                                    location.pathname === "/" ? (
                                        <div className="segnalino ms-auto"></div>
                                    ) : (
                                        <div style={
                                            {
                                                height : "40px" ,
                                                width : "40px"
                                            }
                                        }>

                                        </div>
                                    )
                                }
                                <Button
                                    className={ location.pathname === "/clienti" ? "d-block w-100 boxShadowSelected" : "d-block w-100" }
                                    variant="light"
                                    onClick={ () => navigate ( "/clienti" ) }
                                >CLIENTI
                                </Button>
                                {
                                    location.pathname === "/clienti" ? (
                                        <div className="segnalino ms-auto"></div>
                                    ) : (
                                        <div style={
                                            {
                                                height : "40px" ,
                                                width : "40px"
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

export default NavbarComponent;

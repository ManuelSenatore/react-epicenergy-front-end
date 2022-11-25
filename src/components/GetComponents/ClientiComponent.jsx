import React , { useEffect } from 'react';
import { useDispatch , useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getClientList } from "../../redux/actions/actions";
import { Col , Container , Row } from "react-bootstrap";
import CardClienteComponent from "./CardClienteComponent";

const ClientiComponent = () => {
    const dispatch = useDispatch ()
    const user = useSelector ( state => state.user.user )
    const clientList = useSelector ( state => state.client.clientList )

    const token = useSelector ( state => state.user.user.token )

    const navigate = useNavigate ()

    useEffect ( () => {
        if ( user.token === undefined ) {
            navigate ( "/login" )
        } else {
            dispatch ( getClientList ( token ) )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [ user.token ] );


    return (
        <Container fluid>
            <Row className="d-flex flex-column justify-content-between">
                {
                    clientList.map( (cliente, index) => {
                        return (
                            <Col className="d-flex justify-content-center" key={index} >
                                <CardClienteComponent cliente={cliente} index={index} arrLen={clientList.length} />
                            </Col>
                        )
                    })
                }
            </Row>
        </Container>
    )
};

export default ClientiComponent;
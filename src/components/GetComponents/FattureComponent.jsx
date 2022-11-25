import React , { useEffect } from 'react';
import { Col , Container , Row } from "react-bootstrap";
import CardClienteComponent from "./CardClienteComponent";
import CardFatturaComponent from "./CardFatturaComponent";
import { useDispatch , useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getClientList , getFattureList } from "../../redux/actions/actions";

const FattureComponent = () => {
    const user = useSelector ( state => state.user.user )
    const fattureList = useSelector ( state => state.client.fattureList )
    const dispatch = useDispatch ()
    const navigate = useNavigate ()

    useEffect ( () => {
        if ( user.token === undefined ) {
            navigate ( "/login" )
        } else {
            dispatch ( getFattureList ( user.token ) )
            if ( fattureList.length > 0 ) {
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [ user.token ] );

    console.log ( fattureList )

    return (
        <Container fluid>
            <Row className="d-flex flex-column justify-content-between">

                {
                    fattureList.map ( (fattura , index) => {
                    return (
                        <Col className="d-flex justify-content-center" key={ index }>
                            <CardFatturaComponent fattura={ fattura } index={ index } arrLen={ fattureList.length }/>
                        </Col>
                    )
                } )
                }
            </Row>
        </Container>
    );
};

export default FattureComponent;
import React , { useState } from 'react';
import { Button , Card , Col , ListGroup } from "react-bootstrap";

const CardClienteComponent = (props) => {

    const [ infoFlag , setInfoFlag ] = useState ( false );

    return (
        <>
            <Card
                className={ props.index === 0 || props.index === props.arrLen - 1 ? "text-center cardBorderStyle w-100" : "text-center w-100" }
                border="primary"
                style={ {
                    borderRadius : 0
                } }>

                <Card.Header className={ "text-start" }>CLIENTE
                    N.{ props.cliente.clienteId + " " + props.cliente.nomeContatto + " " + props.cliente.cognomeContatto }</Card.Header>

                <Card.Body>

                    <ListGroup className="list-group-flush d-flex flex-row justify-content-evenly flex-wrap">

                        <ListGroup.Item className="borderBottomInfo w-25">
                            <b>Fatturato</b> <br/>
                            { props.cliente.fatturatoAnnuo }
                        </ListGroup.Item>
                        <ListGroup.Item className="borderBottomInfo w-25">
                            <b>Ragione sociale</b> <br/>
                            { props.cliente.ragioneSociale }
                        </ListGroup.Item>
                        <ListGroup.Item className="borderBottomInfo w-25">
                            <b>Partita IVA</b> <br/>
                            { props.cliente.partitaIva }
                        </ListGroup.Item>
                        <ListGroup.Item className="borderBottomInfo"><b>Seguito da</b> <br/>
                            { props.cliente.user.username }
                        </ListGroup.Item>
                        <ListGroup.Item className="borderBottomInfo">
                            <b>Data ultimocontatto</b> <br/>
                            { props.cliente.dataUltimoContatto }

                        </ListGroup.Item>
                    </ListGroup>

                    <div
                        onClick={ () => setInfoFlag ( !infoFlag ) }
                        className={ infoFlag ? "openInfoTrue" : "openInfo" }>

                    </div>
                    {
                        infoFlag && (
                            <ListGroup className="list-group-flush d-flex flex-row justify-content-evenly flex-wrap">

                                <ListGroup.Item className="borderBottomInfo">
                                    <b>Telefono</b> <br/>
                                    { props.cliente.telefonoContatto }
                                </ListGroup.Item>
                                <ListGroup.Item className="borderBottomInfo">
                                    <b>Email</b> <br/>
                                    { props.cliente.email }
                                </ListGroup.Item>
                                <ListGroup.Item className="borderBottomInfo">
                                    <b>Email contatto</b> <br/>
                                    { props.cliente.emailContatto }
                                </ListGroup.Item>
                                <ListGroup.Item className="borderBottomInfo">
                                    <b>PEC</b> <br/> { props.cliente.pec }
                                </ListGroup.Item>
                                <ListGroup.Item
                                    className="borderBottomInfo"
                                ><b>Data di registrazione </b> <br/>
                                    { props.cliente.dataInserimento }
                                </ListGroup.Item>

                            </ListGroup>
                        )
                    }
                </Card.Body>
            </Card>
        </>
    );
};

export default CardClienteComponent;
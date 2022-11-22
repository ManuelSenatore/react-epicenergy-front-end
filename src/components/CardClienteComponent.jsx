import React , { useState } from 'react';
import { Button , Card , Col , ListGroup } from "react-bootstrap";

const CardClienteComponent = (props) => {

    const [ infoFlag , setInfoFlag ] = useState ( false );

    return (
        <>

            <Card className="text-center mb-auto" border="primary" style={ {width : '18rem'} }>
                <Card.Header>CLIENTE N.{ props.cliente.clienteId }</Card.Header>
                <Card.Body>
                    <Card.Title>{ props.cliente.nomeContatto + " " + props.cliente.cognomeContatto }</Card.Title>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item><b>Fatturato</b> <br/> { props.cliente.fatturatoAnnuo }</ListGroup.Item>
                        <ListGroup.Item><b>Ragione sociale</b> <br/> { props.cliente.ragioneSociale }</ListGroup.Item>
                        <ListGroup.Item><b>Partita IVA</b> <br/> { props.cliente.partitaIva }</ListGroup.Item>
                        <ListGroup.Item><b>Seguito da</b> <br/> { props.cliente.user.username }</ListGroup.Item>
                        <ListGroup.Item><b>Data ultimo</b> <br/>
                            contatto { props.cliente.dataUltimoContatto }</ListGroup.Item>
                    </ListGroup>

                    <Button className={infoFlag ? "d-block mx-auto mt-2 text-danger" : "d-block mx-auto mt-2 text-primary infoButtonCliente"}
                            variant={ infoFlag ? "primary" : "danger" }
                            onClick={ () => {
                                setInfoFlag ( !infoFlag )
                            } }
                            style={{
                                borderLeft: "none",
                                borderRight: "none",
                                borderBottom: "none",
                                backgroundColor: "white",
                            }}
                    >Informazioni
                        di contatto
                    </Button>
                    {
                        infoFlag && (
                            <ListGroup className="list-group-flush listGroupCardCliente">
                                <ListGroup.Item><b>Telefono</b> <br/> { props.cliente.email }</ListGroup.Item>
                                <ListGroup.Item><b>Email</b> <br/> { props.cliente.email }</ListGroup.Item>
                                <ListGroup.Item><b>Email contatto</b> <br/> { props.cliente.emailContatto }</ListGroup.Item>
                                <ListGroup.Item><b>PEC</b> <br/> { props.cliente.pec }</ListGroup.Item>
                                <ListGroup.Item><b>Data di
                                    registrazione </b> <br/> { props.cliente.dataInserimento }</ListGroup.Item>
                            </ListGroup>
                        )
                    }


                </Card.Body>
            </Card>

        </>
    );
};

export default CardClienteComponent;
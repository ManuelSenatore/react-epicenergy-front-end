import React , { useState } from 'react';
import { Card , ListGroup } from "react-bootstrap";

const CardFatturaComponent = (props) => {
    const [ infoFlag , setInfoFlag ] = useState ( false );
    console.log(props.fattura)
    return (
        <>
            {
                props.fattura && (
                    <>
                        <Card
                            className={ props.index === 0 || props.index === props.arrLen - 1 ? "text-center cardBorderStyle w-100" : "text-center w-100" }
                            border="primary"
                            style={ {
                                borderRadius : 0
                            } }>

                            <Card.Header className={ "text-start" }>FATTURA
                                N.{ props.fattura.numero} DEL CLIENTE {props.fattura.cliente.nomeContatto + " " + props.fattura.cliente.cognomeContatto }</Card.Header>

                            <Card.Body>

                                <ListGroup className="list-group-flush d-flex flex-row justify-content-evenly flex-wrap">

                                    <ListGroup.Item className="borderBottomInfo w-25">
                                        <b>Anno</b> <br/>
                                        { props.fattura.anno }
                                    </ListGroup.Item>
                                    <ListGroup.Item className="borderBottomInfo w-25">
                                        <b>Importo</b> <br/>
                                        { props.fattura.importo }
                                    </ListGroup.Item>
                                    <ListGroup.Item className="borderBottomInfo w-25">
                                        <b>STATO</b> <br/>
                                        { props.fattura.statoFattura}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </>
                )
            }

        </>
    );
};

export default CardFatturaComponent;
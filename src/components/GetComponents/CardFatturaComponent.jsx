import React , { useState } from 'react';
import { Card , ListGroup } from "react-bootstrap";
import { RiDeleteBin5Line } from "react-icons/ri";
import ModalDeleteComponent from "../DeleteComponents/ModalDeleteComponent";
import { useDispatch , useSelector } from "react-redux";
import { getClientList , getFattureList } from "../../redux/actions/actions";
import { useNavigate } from "react-router-dom";

const CardFatturaComponent = (props) => {
    const token = useSelector ( (state) => state.user.user.token );
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteFattura = async() => {
        const baseEndpoint = `http://localhost:8080/api/fatture/delete/${props.fattura.numero}`;

        const header = {
            Authorization : `Bearer ${ token }` ,
        };
        try {
            const response = await fetch ( baseEndpoint , {
                method : "DELETE" ,
                headers : header ,
            } );
            if ( response.ok ) {
                dispatch(getFattureList(token))
                navigate("/fatture")
            } else {
                console.log ( "Error fetching results" );
            }
        } catch ( error ) {
            console.log ( error );
        }
    }



    console.log ( props.fattura )
    return (
        <>
            {
                props.fattura && (
                    <>
                        <Card
                            className={ props.index === 0 || props.index === props.arrLen - 1 ?
                                "text-center cardBorderStyle w-100" : "text-center w-100" }
                            border="primary"
                            style={ {
                                borderRadius : 0 ,
                            } }>
                            <div className={ "d-flex" }>
                                <Card.Header
                                    style={{
                                        fontWeight: 'bolder',
                                        color: 'royalblue'
                                    }}
                                    className={ "text-start w-50" }>FATTURA
                                    N.{ props.fattura.numero } DEL CLIENTE { props.fattura.cliente.nomeContatto + " " +
                                        props.fattura.cliente.cognomeContatto }
                                </Card.Header>
                                <div className="d-flex justify-content-end align-items-center text-danger"
                                     style={ {
                                         backgroundColor : "#f8f9fa" ,
                                         width : "50%" ,
                                         border : "1px solid #ced4da" ,
                                         borderLeft : "none" ,
                                         borderRight : "none" ,
                                     } }>
                                    <RiDeleteBin5Line
                                        onClick={handleShow}
                                        style={ {
                                            fontSize : "1.5em" ,
                                            marginRight: "5px",
                                            cursor: "pointer"
                                        } }
                                    />
                                </div>
                            </div>

                            <ModalDeleteComponent
                                show={show}
                                handleClose={handleClose}
                                handleShow={handleShow}
                                deleteFattura={deleteFattura}
                            />

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
                                        { props.fattura.statoFattura }
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
import React , { useState } from 'react';
import { Card , ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";
import { getClientList , getFattureList } from "../../redux/actions/actions";
import { RiDeleteBin5Line } from "react-icons/ri";
import ModalDeleteComponent from "../DeleteComponents/ModalDeleteComponent";

const CardClienteComponent = (props) => {
    const [ infoFlag , setInfoFlag ] = useState ( false );

    const token = useSelector ( (state) => state.user.user.token );
    const navigate = useNavigate ();
    const dispatch = useDispatch ();

    const [ show , setShow ] = useState ( false );

    const handleClose = () => setShow ( false );
    const handleShow = () => setShow ( true );

    const deleteCliente = async () => {
        const baseEndpoint = `http://localhost:8080/api/clienti/delete/${ props.cliente.clienteId }`;

        const header = {
            Authorization : `Bearer ${ token }` ,
        };
        try {
            const response = await fetch ( baseEndpoint , {
                method : "DELETE" ,
                headers : header ,
            } );
            if ( response.ok ) {
                dispatch ( getClientList ( token ) )
                navigate ( "/clienti" )
            } else {
                console.log ( "Error fetching results" );
            }
        } catch ( error ) {
            console.log ( error );
        }
    }

    return (
        <>
            <Card
                className={ props.index === 0 || props.index === props.arrLen - 1 ?
                    "text-center cardBorderStyle w-100" : "text-center w-100" }
                border="primary"
                style={ {
                    borderRadius : 0
                } }>

                <div className={ "d-flex" }>
                    <Card.Header
                        style={ {
                            fontWeight : 'bolder' ,
                            color : 'royalblue'
                        } }
                        className={ "text-start w-50" }>CLIENTE
                        N.{ props.cliente.clienteId + " " + props.cliente.nomeContatto + " " +
                            props.cliente.cognomeContatto }
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
                            onClick={ handleShow }
                            style={ {
                                fontSize : "1.5em" ,
                                marginRight : "5px" ,
                                cursor : "pointer"
                            } }
                        />
                    </div>
                </div>

                <ModalDeleteComponent
                    show={show}
                    handleClose={handleClose}
                    handleShow={handleShow}
                    deleteFattura={deleteCliente}
                />

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
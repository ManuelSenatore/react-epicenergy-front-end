import React , { useState } from "react";
import { Button , Card , Col , ListGroup } from "react-bootstrap";
import { useDispatch , useSelector } from "react-redux";
import { getClientList , getClientListFromUser , getFattureList , getUserList } from "../../redux/actions/actions";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import ModalDeleteComponent from "../DeleteComponents/ModalDeleteComponent";

const CardUserComponent = (props) => {
    const [ infoFlag , setInfoFlag ] = useState ( false );
    const token = useSelector ( (state) => state.user.user.token );
    const [ clientList , setClientList ] = useState ( [] );

    const [ show , setShow ] = useState ( false );

    const handleClose = () => setShow ( false );
    const handleShow = () => setShow ( true );

    const navigate = useNavigate ();
    const dispatch = useDispatch ();

    const orgRoleType = (arr) => {
        const arr1 = [];
        arr.forEach ( (el) => {
            arr1.push ( el.roleType.substring ( 5 , el.roleType.length ) );
        } );
        return arr1.join ( ", " );
    };

    const getClientListFromUser = async (id) => {
        const baseEndpoint = `http://localhost:8080/api/clienti/user/${ id }`;
        console.log ( "eseguo get client list" );
        const header = {
            Authorization : `Bearer ${ token }` ,
        };
        try {
            const response = await fetch ( baseEndpoint , {
                method : "GET" ,
                headers : header ,
            } );
            if ( response.ok ) {
                const data = await response.json ();
                setClientList ( data )
            } else {
                console.log ( "Error fetching results" );
            }
        } catch ( error ) {
        }
    };

    const deleteUser = async () => {
        const baseEndpoint = `http://localhost:8080/api/users/delete/${ props.user.id }`;

        const header = {
            Authorization : `Bearer ${ token }` ,
        };
        try {
            const response = await fetch ( baseEndpoint , {
                method : "DELETE" ,
                headers : header ,
            } );
            if ( response.ok ) {
                dispatch ( getUserList ( token ) )
                navigate ( "/utenti" )
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
                className={
                    props.index === 0 || props.index === props.arrLen - 1
                        ? "text-center w-100 "
                        : "text-center w-100 "
                }
                border="primary"
                style={ {
                    borderRadius : 0 ,
                    backgroundColor : "aliceblue" ,
                } }>
                <div className={ "d-flex" }>
                    <Card.Header
                        style={ {
                            fontWeight : "bolder" ,
                            color : "royalblue"
                        } }
                        className={ "text-start w-50" }>
                        Utente N.{ props.user.id + " " + props.user.nomeCompleto }
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
                    show={ show }
                    handleClose={ handleClose }
                    handleShow={ handleShow }
                    deleteFattura={ deleteUser }
                />

                <Card.Body>

                    <ListGroup className="list-group-flush d-flex flex-row justify-content-evenly flex-wrap">
                        <ListGroup.Item className="borderBottomInfo w-25">
                            <b>Email</b> <br/>
                            { props.user.email }
                        </ListGroup.Item>
                        <ListGroup.Item className="borderBottomInfo w-25">
                            <b>Username</b> <br/>
                            { props.user?.username }
                        </ListGroup.Item>
                        <ListGroup.Item className="borderBottomInfo w-25">
                            <b>Ruolo</b> <br/>
                            { orgRoleType ( props.user.roles ) }
                        </ListGroup.Item>
                    </ListGroup>

                    <div
                        onClick={ () => {
                            setInfoFlag ( !infoFlag );
                            getClientListFromUser ( props.user.id )
                        } }
                        className={ infoFlag ? "openInfoTrue my-4" : "openInfo my-2" }
                    ></div>
                    { infoFlag && (
                        <ListGroup className="list-group-flush d-flex flex-row justify-content-evenly flex-wrap">
                            { clientList?.map ( (client , index) => {
                                return (
                                    <ListGroup.Item key={ index } className="borderBottomInfo w-100">
                                        CLIENTE N.
                                        { client.clienteId +
                                            " " +
                                            client.nomeContatto +
                                            " " +
                                            client.cognomeContatto }
                                    </ListGroup.Item>
                                );
                            } ) }
                        </ListGroup>
                    ) }
                </Card.Body>
            </Card>
        </>
    );
};

export default CardUserComponent;

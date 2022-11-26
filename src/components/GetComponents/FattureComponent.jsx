import React , { useEffect , useState } from 'react';
import { Button , Col , Container , Form , Row } from "react-bootstrap";
import CardClienteComponent from "./CardClienteComponent";
import CardFatturaComponent from "./CardFatturaComponent";
import { useDispatch , useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getClientList , getFattureList , setFattureList , setUserList } from "../../redux/actions/actions";
import MyDatalistInput from "./MyDatalistInput";

const FattureComponent = () => {
    const user = useSelector ( state => state.user.user )

    const fattureList = useSelector ( state => state.client.fattureList )

    const clientList = useSelector ( state => state.client.clientList )
    const dispatch = useDispatch ()
    const navigate = useNavigate ()

    const [ formObj , setFormObj ] = useState ( {
        // oggetto per la compilazione del form
        scelta : "tutti" ,
        value : 0 ,
        stato : "" ,
    } );

    const maker = () => {
        let arr = []

        clientList.forEach ( (e) => {
            let obj = {
                id : e.clienteId ,
                value : e.nomeContatto + ", " + e.cognomeContatto + ", " + e.ragioneSociale
            }
            arr.push ( obj );
        } )
        return arr
    }

    const handleForm = (key , value) => {
        // setta l'oggetto del form
        setFormObj ( (form) => {
            return {
                ...form ,
                [key] : value ,
            };
        } );
    };

    useEffect ( () => {
        if ( user.token === undefined ) {
            navigate ( "/login" )
        } else {
            dispatch ( getFattureList ( user.token ) )
            dispatch ( getClientList ( user.token ) )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [ user.token ] );

    useEffect(() => {
        if (formObj.value !== 0) {
            getFattureByClienteId()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formObj.value] );

    useEffect(() => {
        if (formObj.scelta === "tutti") {
            dispatch(getFattureList(user.token))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formObj.scelta] );

    const getFattureByClienteId = async () => {
        const baseEndpoint = `http://localhost:8080/api/fatture/cliente/${ formObj.value }`;
        const header = {
            Authorization : `Bearer ${ user.token }` ,
        };
        try {
            const response = await fetch ( baseEndpoint , {
                method : "GET" ,
                headers : header ,
            } );
            if ( response.ok ) {
                const data = await response.json ();
                dispatch ( setFattureList ( data.content ) );
                console.log ( data );
            } else {
                console.log ( "Error fetching results" );
            }
        } catch ( error ) {
            console.log ( error );
        }
    };

    return (
        <Container fluid>
            <Row className="d-flex flex-column justify-content-between">
                <Col className=" w-100 d-flex">
                    <Form
                        className="w-100"
                        onSubmit={ (e) => {
                            e.preventDefault ();

                        } }
                    >
                        <Form.Group className="mb-3">
                            <Form.Select
                                onChange={ (e) => handleForm ( "scelta" , e.target.value ) }
                            >
                                <option value={ "tutti" }>Cerca per: Tutte le fatture</option>
                                <option value={ "nome-cliente" }>Cerca per: nome cliente</option>
                            </Form.Select>
                        </Form.Group>
                        { formObj.scelta === "nome-cliente" && (
                            <div className="my-3">
                                <MyDatalistInput
                                    handleForm={ handleForm }
                                    handleFormName={ "value" }
                                    triggerFetch={ () => {
                                    } }
                                    arrayComuniList={ maker ( clientList ) }
                                    placeDataList={ "Seleziona" }
                                    labelDataList={ "Seleziona il cliente o ricercalo" }
                                    choice={ "id" }
                                />
                            </div>
                        ) }
                    </Form>
                </Col>
                {
                    fattureList.map ( (fattura , index) => {
                        return (
                            <Col className="d-flex justify-content-center" key={ index }>
                                <CardFatturaComponent fattura={ fattura } index={ index }
                                                      arrLen={ fattureList.length }/>
                            </Col>
                        )
                    } )
                }
            </Row>
        </Container>
    );
};

export default FattureComponent;
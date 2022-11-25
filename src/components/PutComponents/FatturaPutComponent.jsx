import React , { useEffect , useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";
import { getClientList , getFattureList } from "../../redux/actions/actions";
import MyDatalistInput from "../GetComponents/MyDatalistInput";
import { Button , Form , Row } from "react-bootstrap";

const FatturaPutComponent = () => {
    const navigate = useNavigate()
    const clienti = useSelector ( (state) => state.client.clientList );
    const fatture = useSelector(state => state.client.fattureList)

    const token = useSelector(state => state.user.user.token)
    const dispatch = useDispatch()

    useEffect ( () => {
        if ( token === undefined) {
            navigate("/login")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[token] );



    const [ formObj , setFormObj ] = useState ( {
        numero: 0,
        anno : 0 ,
        importo : 0 ,
        statoFattura : "" ,
        clienteId : 0 ,
    } )

    useEffect(() => {
        if (formObj.numero !== 0){
            setFormObj( {
                numero: createFormObj(formObj).numero,
                anno : createFormObj(formObj).anno ,
                importo : createFormObj(formObj).importo ,
                statoFattura : createFormObj(formObj).statoFattura,
                clienteId : createFormObj(formObj).cliente.clienteId ,
            })
        }
    }, [formObj.numero])

    const dispatchClientList = () => {
        dispatch(getClientList(token))
    }

    const dispatchFattureList = () => {
        dispatch(getFattureList(token))
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

    const createFormObj = (obj) => {
        if (obj.numero !== 0) {
            return fatture.find(el => el.numero === obj.numero)
        }
    }

    const maker = () => {
        let arr = []

        fatture.forEach( (e) => {
            let obj = {
                id : e.numero,
                value : e.cliente.nomeContatto+ " " + e.cliente.cognomeContatto + ", Importo: " + e.importo + ", Anno: " + e.anno + ", Stato: " + e.statoFattura
            }
            arr.push( obj );
        } )
        return arr
    }

    const maker2 = () => {
        let arr = []

        clienti.forEach( (e) => {
            let obj = {
                id : e.clienteId,
                value : e.nomeContatto + ", " + e.cognomeContatto + ", " + e.ragioneSociale
            }
            arr.push( obj );
        } )
        return arr
    }

    const putFattura = async () => {
        const baseEndpoint = `http://localhost:8080/api/fatture/${formObj.numero}`;
        const header = {
            Authorization : `Bearer ${ token }` ,
            "Content-Type" : "application/json" ,
        };

        try {
            const response = await fetch ( baseEndpoint , {
                method : "PUT" ,
                headers : header ,
                body : JSON.stringify ( formObj ) ,
            } );
            if ( response.ok ) {
                navigate ( "/fatture" )
            } else {
                console.log ( "Error fetching results" );
            }
        } catch ( error ) {
            console.log ( error );
        }
    };

console.log(formObj)

    return (
        <div style={
    {
        color : "royalblue" ,
            borderRadius : "5px" ,
        padding : "20px" ,
    }
}>
            <Row>
                <div className="my-3">
                    <MyDatalistInput
                        handleForm={ handleForm }
                        handleFormName={ "numero" }
                        triggerFetch={ dispatchFattureList }
                        arrayComuniList={ maker ( fatture ) }
                        placeDataList={ "Ricerca Fatture" }
                        labelDataList={ "Seleziona o inserisci i dati della fattura" }
                        choice={ "id" }
                    />
                </div>
            </Row>
            {
                formObj.numero > 0 && (
                    <Form onSubmit={(e) => {
                        e.preventDefault()
                        putFattura()
                    }}>
                        <Form.Group className="mb-3">
                            <Form.Label>Anno</Form.Label>
                            <Form.Control
                                value={ formObj.anno }
                                onChange={ (e) => handleForm ( "anno" , e.target.value ) }
                                type="number"
                                placeholder="Inserisci l'anno di emissione"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Importo</Form.Label>
                            <Form.Control
                                value={ formObj.importo }
                                onChange={ (e) => handleForm ( "importo" , e.target.value ) }
                                type="number"
                                placeholder="Inserisci l'importo da pagare"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Stato fattura</Form.Label>
                            <Form.Select
                                value={formObj.statoFattura}
                                onChange={ (e) => handleForm ( "statoFattura" , e.target.value ) }
                                placeholder="Selezione lo stato della fattura"
                            >
                                <option value={ "NON_PAGATA" }>NON PAGATA</option>
                                <option value={ "PAGATA" }>PAGATA</option>
                            </Form.Select>
                        </Form.Group>

                        <MyDatalistInput
                            handleForm={ handleForm }
                            handleFormName={ "clienteId" }
                            triggerFetch={ () => {
                            } }
                            arrayComuniList={ maker2 ( clienti ) }
                            placeDataList={ formObj.clienteId }
                            labelDataList={ "Seleziona il cliente" }
                            choice={ "id" }
                        />
                        <Button
                            className={"w-25 mt-3 d-block mx-auto"}
                            variant="primary"
                            type="submit">
                            Conferma modifiche
                        </Button>
                    </Form>
                )
            }


        </div>
    );
};

export default FatturaPutComponent;
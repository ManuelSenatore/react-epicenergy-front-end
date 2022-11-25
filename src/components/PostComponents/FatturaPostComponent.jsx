import React , { useEffect , useState } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button , Form } from "react-bootstrap";
import MyDatalistInput from "../GetComponents/MyDatalistInput";

const FatturaPostComponent = (props) => {
    const clienti = useSelector ( state => state.client.clientList )
    const token = useSelector ( (state) => state.user.user.token );
    const navigate = useNavigate ()

    useEffect ( () => {
        if ( token === undefined ) {
            navigate ( "/login" )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [ token ] );

    const maker = () => {
        let arr = []

        clienti.forEach ( (e) => {
            let obj = {
                id : e.clienteId ,
                value : e.nomeContatto + ", " + e.cognomeContatto + ", " + e.ragioneSociale
            }
            arr.push ( obj );
        } )
        return arr
    }

    const [ formObj , setFormObj ] = useState ( {
        // oggetto per la compilazione del form

        anno : "" ,
        importo : "" ,
        statoFattura : "NON_PAGATA" ,
        clienteId : "" ,
    } );

    const handleForm = (key , value) => {
        // setta l'oggetto del form
        setFormObj ( (form) => {
            return {
                ...form ,
                [key] : value ,
            };
        } );
    };


    const createNewFattura = async () => {
        const baseEndpoint = "http://localhost:8080/api/fatture/new-raw";
        const header = {
            Authorization : `Bearer ${ token }` ,
            "Content-Type" : "application/json" ,
        };

        try {
            const response = await fetch ( baseEndpoint , {
                method : "POST" ,
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

    console.log ( formObj )

    return (
        <div style={
            {
                color : "royalblue" ,
                borderRadius : "5px" ,
                padding : "20px" ,
            }
        }>
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
                arrayComuniList={ maker ( clienti ) }
                placeDataList={ "Cliente" }
                labelDataList={ "Seleziona il cliente" }
                choice={ "id" }
            />

            <Button className={ "w-25 d-block mx-auto my-2" } onClick={ () => {
                createNewFattura ()
            } } variant="primary" type="button">
                Aggiungi fattura
            </Button>
        </div>
    );
};

export default FatturaPostComponent;
import React , { useEffect , useState } from 'react';
import { Button , Form , Row } from "react-bootstrap";
import MyDatalistInput from "../GetComponents/MyDatalistInput";
import { useDispatch , useSelector } from "react-redux";
import { getClientList , getUserList } from "../../redux/actions/actions";
import AddressPostComponent from "../PostComponents/AddressPostComponent";
import { useNavigate } from "react-router-dom";

const PutCliente = () => {
    const navigate = useNavigate()
    const userList = useSelector ( (state) => state.user.userList );
    const clienti = useSelector(state => state.client.clientList)
    const [ indirizzi , setIndirizzi ] = useState ( [] );
    const [ addressFlag , setAddressFlag ] = useState ( false );
    const token = useSelector(state => state.user.user.token)
    const dispatch = useDispatch()

    useEffect ( () => {
        if ( token === undefined) {
            navigate("/login")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[token] );

    const dispatchClientList = () => {
        dispatch(getClientList(token))
    }

    const dispatchUserList = () => {
        dispatch(getUserList(token))
    }

    const [ formObj , setFormObj ] = useState ( {
        userId : "" ,
        partitaIva : "" ,
        indirizzoLegaleId : "" ,
        indirizzoOperativoId : "" ,
        email : "" ,
        pec : "" ,
        emailContatto : "" ,
        nomeContatto : "" ,
        cognomeContatto : "" ,
        telefonoContatto : "" ,
        ragioneSociale : "" ,
        fatturatoAnnuo : "" ,
    } )

    const maker = () => {
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

    const maker2 = () => {
        let arr = []

        userList?.map( (e) => {
            let obj = {
                id : e.id,
                value : "Username: " + e.username + " | Email: " + e.email
            }
            console.log( "eseguo push")
            return arr.push( obj );
        } )
        return arr
    }

    const maker3 = () => {
        let arr = []

        indirizzi.forEach( (e) => {
            let obj = {
                id : e.indirizzoId,
                value : e.via + ", " + e.civico + ", " + e.cap + ", " + e.comune.nome + ", " + e.comune.provincia.nome
            }
            arr.push( obj );
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

    const handleFormObj = (name, id) => {
        let findObj = clienti.find((e) => e.clienteId === id)
        setFormObj({
            clienteId: findObj.clienteId,
            userId : findObj.user.id,
            partitaIva : findObj.partitaIva ,
            indirizzoLegaleId : findObj.indirizzoLegale.indirizzoId ,
            indirizzoOperativoId : findObj.indirizzoOperativo.indirizzoId ,
            email : findObj.email ,
            pec : findObj.pec ,
            emailContatto : findObj.emailContatto ,
            nomeContatto : findObj.nomeContatto ,
            cognomeContatto : findObj.cognomeContatto ,
            telefonoContatto : findObj.telefonoContatto ,
            ragioneSociale : findObj.ragioneSociale ,
            fatturatoAnnuo : findObj.fatturatoAnnuo ,
        })
    }

    const putClient = async (obj) => {
        const baseEndpoint = `http://localhost:8080/api/clienti/${obj.clienteId}`;

        const header = {
            "Content-type": "application/json",
            "Authorization": `Bearer ${ token }`
        };

        try {
            const response = await fetch(baseEndpoint, {
                method: "PUT",
                headers: header,
                body: JSON.stringify(obj),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                navigate("/clienti")
            } else {
                console.log("Error fetching results");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getIndirizziList = async () => {
        const baseEndpoint = "http://localhost:8080/api/indirizzi";
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
                setIndirizzi ( data );
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
                        handleForm={ handleFormObj }
                        handleFormName={ "" }
                        triggerFetch={ dispatchClientList }
                        arrayComuniList={ maker ( clienti ) }
                        placeDataList={ "Ricerca Cliente" }
                        labelDataList={ "Seleziona o inserisci i dati del cliente" }
                        choice={ "id" }
                    />
                </div>
            </Row>

            <Row>
                <Form
                    onSubmit={ (e) => {
                        e.preventDefault ();
                        putClient(formObj);
                    } }
                >
                    <div className="my-3">
                        <MyDatalistInput
                            handleForm={ handleForm }
                            handleFormName={ "userId" }
                            triggerFetch={ dispatchUserList }
                            arrayComuniList={ maker2 ( userList ) }
                            placeDataList={ formObj.userId }
                            labelDataList={ "Seleziona l'utente da modificare o ignora questo campo" }
                            choice={"id"}
                        />
                    </div>

                    <Form.Group className="mb-3">
                        <Form.Label>VAT Number</Form.Label>
                        <Form.Control
                            value={ formObj.partitaIva }
                            onChange={ (e) => handleForm ( "partitaIva" , e.target.value ) }
                            type="number"
                            placeholder="Partita IVA"
                        />
                    </Form.Group>

                    <div className="my-3">
                        <MyDatalistInput
                            handleForm={ handleForm }
                            handleFormName={ "indirizzoLegaleId" }
                            triggerFetch={ getIndirizziList }
                            arrayComuniList={ maker3 ( indirizzi ) }
                            placeDataList={ formObj.indirizzoLegaleId }
                            labelDataList={ "Seleziona l'indirizzo legale o ignora questo campo" }
                            choice={"id"}
                        />
                    </div>

                    <div className="my-3">
                        <MyDatalistInput
                            handleForm={ handleForm }
                            handleFormName={ "indirizzoOperativoId" }
                            triggerFetch={ getIndirizziList }
                            arrayComuniList={ maker3 ( indirizzi ) }
                            placeDataList={ formObj.indirizzoOperativoId }
                            labelDataList={ "Seleziona l'indirizzo operativo o ignora questo campo" }
                            choice={"id"}
                        />
                    </div>

                    <Button className={addressFlag ? "d-block mx-auto" : "d-block infoButtonCliente mx-auto"}
                            variant={ addressFlag ? "danger" : "primary" }
                            onClick={ () => setAddressFlag ( !addressFlag ) }
                            style={{
                                borderLeft: "none",
                                borderRight: "none",
                                borderBottom: "1px solid white",
                                backgroundColor: "white",
                                color: "royalblue"
                            }}
                    >
                        Aggiungi nuovo indirizzo
                    </Button>

                    {
                        addressFlag && (
                            <AddressPostComponent setAddressFlag={ setAddressFlag }/>
                        )
                    }

                    <Form.Group className="mb-3 mt-2">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            value={ formObj.email }
                            onChange={ (e) => handleForm ( "email" , e.target.value ) }
                            type="email"
                            placeholder="Email"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Pec</Form.Label>
                        <Form.Control
                            value={ formObj.pec }
                            onChange={ (e) => handleForm ( "pec" , e.target.value ) }
                            type="email"
                            placeholder="Pec"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email di contatto</Form.Label>
                        <Form.Control
                            value={ formObj.emailContatto }
                            onChange={ (e) => handleForm ( "emailContatto" , e.target.value ) }
                            type="email"
                            placeholder="Email di contatto"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            value={ formObj.nomeContatto }
                            onChange={ (e) => handleForm ( "nomeContatto" , e.target.value ) }
                            type="text"
                            placeholder="Name"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Cognome</Form.Label>
                        <Form.Control
                            value={ formObj.cognomeContatto }
                            onChange={ (e) => handleForm ( "cognomeContatto" , e.target.value ) }
                            type="text"
                            placeholder="Surname"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Cellulare</Form.Label>
                        <Form.Control
                            value={ formObj.telefonoContatto }
                            onChange={ (e) => handleForm ( "telefonoContatto" , e.target.value ) }
                            type="number"
                            placeholder="Cellulare"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Ragione sociale</Form.Label>
                        <Form.Select
                            onChange={ (e) => handleForm ( "ragioneSociale" , e.target.value ) }
                        >
                            <option value={ "PA" }>PA</option>
                            <option value={ "SAS" }>SAS</option>
                            <option value={ "SPA" }>SPA</option>
                            <option value={ "SRL" }>SRL</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Fatturato annuale</Form.Label>
                        <Form.Control
                            value={ formObj.fatturatoAnnuo }
                            onChange={ (e) => handleForm ( "fatturatoAnnuo" , e.target.value ) }
                            type="number"
                            placeholder="Fatturato annuale"
                        />
                    </Form.Group>

                    <Button
                        className={"w-25 d-block mx-auto"}
                        variant="primary"
                        type="submit">
                        Submit
                    </Button>
                </Form>
            </Row>

        </div>
    );
};

export default PutCliente;
import React , { useEffect , useState } from "react";
import { Button , Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import AddressPostComponent from "./AddressPostComponent";
import MyDatalistInput from "../GetComponents/MyDatalistInput";
import { useNavigate } from "react-router-dom";
import { getUserList, setUserList } from "../../redux/actions/actions";

function ClientPostComponent() {
    const token = useSelector ( (state) => state.user.user.token );
    const userList = useSelector ( (state) => state.user.userList );
    const dispatch = useDispatch();
    const [ indirizzi , setIndirizzi ] = useState ( [] );
    const [ addressFlag , setAddressFlag ] = useState ( false );
    const navigate = useNavigate();

    useEffect ( () => {
        if ( token === undefined) {
            navigate("/login")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[token] );

    const maker = () => {
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


    const [ formObj , setFormObj ] = useState ( {
        // oggetto per la compilazione del form

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


    const postUpClient = async (obj) => {
        const baseEndpoint = "http://localhost:8080/api/clienti/new-raw";

        const header = {
            "Content-type": "application/json",
            "Authorization": `Bearer ${ token }`
        };

        try {
            const response = await fetch(baseEndpoint, {
                method: "POST",
                headers: header,
                body: JSON.stringify(obj),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                navigate("/clienti")
            } else {
                alert("Error fetching results");
            }
        } catch (error) {
            console.log(error);
        }
    };

    console.log(formObj)
    console.log("qui maker 2")
    console.log("nel cu " + userList)
    

    const dispatchUserList = () => {
        dispatch(getUserList(token))
    }


    return (
        <div style={
            {
                color: "royalblue",
                borderRadius: "5px",
                padding: "20px",
            }
        }>
            <Form
                onSubmit={ (e) => {
                    e.preventDefault ();
                    postUpClient(formObj);
                } }
            >
                <div className="my-3">
                    <MyDatalistInput
                        handleForm={ handleForm }
                        handleFormName={ "userId" }
                        triggerFetch={ dispatchUserList }
                        arrayComuniList={ maker2 ( userList ) }
                        placeDataList={ "Seleziona da quale dipendente sarà seguito" }
                        labelDataList={ "Inserisci il dipendente di riferimento" }
                        choice={"id"}
                    />
                </div>

                <Form.Group className="mb-3">
                    <Form.Label>Partita IVA</Form.Label>
                    <Form.Control
                        value={ formObj.partitaIva }
                        onChange={ (e) => handleForm ( "partitaIva" , e.target.value ) }
                        type="number"
                        placeholder="Inserisci il numero di partita IVA"
                    />
                </Form.Group>

                <div className="my-3">
                    <MyDatalistInput
                        handleForm={ handleForm }
                        handleFormName={ "indirizzoLegaleId" }
                        triggerFetch={ getIndirizziList }
                        arrayComuniList={ maker ( indirizzi ) }
                        placeDataList={ "Indirizzo legale" }
                        labelDataList={ "Seleziona l'indirizzo legale o creane uno nuovo" }
                        choice={"id"}
                    />
                </div>

                <div className="my-3">
                    <MyDatalistInput
                        handleForm={ handleForm }
                        handleFormName={ "indirizzoOperativoId" }
                        triggerFetch={ getIndirizziList }
                        arrayComuniList={ maker ( indirizzi ) }
                        placeDataList={ "Indirizzo della sede operativa" }
                        labelDataList={ "Seleziona l'indirizzo operativo o creane uno nuovo" }
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
                        placeholder="Pec(Posta elettronica certificata)"
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
                    <Form.Label>Nome del cliente</Form.Label>
                    <Form.Control
                        value={ formObj.nomeContatto }
                        onChange={ (e) => handleForm ( "nomeContatto" , e.target.value ) }
                        type="text"
                        placeholder="Inserisci nome"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Cognome del cliente</Form.Label>
                    <Form.Control
                        value={ formObj.cognomeContatto }
                        onChange={ (e) => handleForm ( "cognomeContatto" , e.target.value ) }
                        type="text"
                        placeholder="Inserisci cognome"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Telefono cliente</Form.Label>
                    <Form.Control
                        value={ formObj.telefonoContatto }
                        onChange={ (e) => handleForm ( "telefonoContatto" , e.target.value ) }
                        type="number"
                        placeholder="Inserisci il numero di telefono"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Ragione Sociale</Form.Label>
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
                    <Form.Label>Fatturato</Form.Label>
                    <Form.Control
                        value={ formObj.fatturatoAnnuo }
                        onChange={ (e) => handleForm ( "fatturatoAnnuo" , e.target.value ) }
                        type="number"
                        placeholder="Inserisci fatturato annuale"
                    />
                </Form.Group>

                <Button
                    className={"w-25 d-block mx-auto"}
                    variant="primary"
                    type="submit">
                    Registra nuovo cliente
                </Button>
            </Form>
        </div>
    );
}

export default ClientPostComponent;

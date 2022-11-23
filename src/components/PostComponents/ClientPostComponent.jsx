import React , { useState } from "react";
import { Button , Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import AddressPostComponent from "./AddressPostComponent";
import MyDatalistInput from "../GetComponents/MyDatalistInput";
import { useNavigate } from "react-router-dom";

function ClientPostComponent() {
    const token = useSelector ( (state) => state.user.user.token );
    const [ indirizzi , setIndirizzi ] = useState ( [] );
    const [ userList , setUserList ] = useState ([]);
    const [ addressFlag , setAddressFlag ] = useState ( false );
    const navigate = useNavigate();

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

        userList.map( (e) => {
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
                console.log( "qui indirizzi data")
                console.log ( data );
            } else {
                alert ( "Error fetching results" );
            }
        } catch ( error ) {
            console.log ( error );
        }
    };

    const getUserList = async () => {
        const baseEndpoint = "http://localhost:8080/api/users";
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
                setUserList ( data );
                console.log ( "qui user data" );
                console.log ( data );
            } else {
                alert ( "Error fetching results" );
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
                navigate("/")
            } else {
                alert("Error fetching results");
            }
        } catch (error) {
            console.log(error);
        }
    };

    console.log(formObj)
    console.log("qui maker 2")
    console.log(maker2(userList))

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
                        triggerFetch={ getUserList }
                        arrayComuniList={ maker2 ( userList ) }
                        placeDataList={ "User ID" }
                        labelDataList={ "Select your user" }
                        choice={"id"}
                    />
                </div>

                <Form.Group className="mb-3">
                    <Form.Label>VAT Number</Form.Label>
                    <Form.Control
                        value={ formObj.partitaIva }
                        onChange={ (e) => handleForm ( "partitaIva" , e.target.value ) }
                        type="number"
                        placeholder="Enter VAT Number"
                    />
                </Form.Group>

                <div className="my-3">
                    <MyDatalistInput
                        handleForm={ handleForm }
                        handleFormName={ "indirizzoLegaleId" }
                        triggerFetch={ getIndirizziList }
                        arrayComuniList={ maker ( indirizzi ) }
                        placeDataList={ "Legal Address" }
                        labelDataList={ "Select your legal address" }
                        choice={"id"}
                    />
                </div>

                <div className="my-3">
                    <MyDatalistInput
                        handleForm={ handleForm }
                        handleFormName={ "indirizzoOperativoId" }
                        triggerFetch={ getIndirizziList }
                        arrayComuniList={ maker ( indirizzi ) }
                        placeDataList={ "Operative Address" }
                        labelDataList={ "Select your operative address" }
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
                    <Form.Label>Contact Email</Form.Label>
                    <Form.Control
                        value={ formObj.emailContatto }
                        onChange={ (e) => handleForm ( "emailContatto" , e.target.value ) }
                        type="email"
                        placeholder="Contact Email"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        value={ formObj.nomeContatto }
                        onChange={ (e) => handleForm ( "nomeContatto" , e.target.value ) }
                        type="text"
                        placeholder="Name"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control
                        value={ formObj.cognomeContatto }
                        onChange={ (e) => handleForm ( "cognomeContatto" , e.target.value ) }
                        type="text"
                        placeholder="Surname"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Telephone</Form.Label>
                    <Form.Control
                        value={ formObj.telefonoContatto }
                        onChange={ (e) => handleForm ( "telefonoContatto" , e.target.value ) }
                        type="number"
                        placeholder="Telephone"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Business Name</Form.Label>
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
                    <Form.Label>Annual Revenue</Form.Label>
                    <Form.Control
                        value={ formObj.password }
                        onChange={ (e) => handleForm ( "fatturatoAnnuo" , e.target.value ) }
                        type="number"
                        placeholder="Annual Revenue"
                    />
                </Form.Group>

                <Button
                    className={"w-25 d-block mx-auto"}
                    variant="primary"
                    type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default ClientPostComponent;

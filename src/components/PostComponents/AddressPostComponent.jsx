import React , { useEffect , useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import MyDatalistInput from "../GetComponents/MyDatalistInput";
import { useNavigate } from "react-router-dom";

function AddressPostComponent(props) {
  const [ comuni , setComuni ] = useState ( [] );
  const token = useSelector((state) => state.user.user.token);
  const navigate = useNavigate()

  useEffect ( () => {
    if ( token === undefined) {
      navigate("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[token] );

  const maker = () => {
    let arr = []

    comuni.map ( (e , i) => {
      let obj = {
        id : e.nome + i ,
        value : e.nome
      }
      return arr.push ( obj )
    } )
    return arr
  }

  const [formObj, setFormObj] = useState({
    // oggetto per la compilazione del form

    via: "",
    civico: "",
    cap: "",
    nomeComune: "",
  });

  const handleForm = (key, value) => {
    // setta l'oggetto del form
    setFormObj((form) => {
      return {
        ...form,
        [key]: value,
      };
    });
  };

  const getComuniList = async () => {
    const baseEndpoint = "http://localhost:8080/api/comuni";
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
        setComuni ( data );
        console.log ( data );
      } else {
        alert ( "Error fetching results" );
      }
    } catch ( error ) {
      console.log ( error );
    }
  };

  const createNewIndirizzo = async () => {
    const baseEndpoint = "http://localhost:8080/api/indirizzi/new-raw";
    const header = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(baseEndpoint, {
        method: "POST",
        headers: header,
        body: JSON.stringify(formObj),
      });
      if (response.ok) {
        props.setAddressFlag(false)
      } else {
        console.log("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={
      {
        color: "royalblue",
        borderRadius: "5px",
        padding: "20px",
      }
    }>
        <Form.Group className="mb-3">
          <Form.Label>Via</Form.Label>
          <Form.Control
            value={formObj.via}
            onChange={(e) => handleForm("via", e.target.value)}
            type="text"
            placeholder="Inserisci via"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Numero civico</Form.Label>
          <Form.Control
            value={formObj.civico}
            onChange={(e) => handleForm("civico", e.target.value)}
            type="number"
            placeholder="Inserisci numero civico"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Cap</Form.Label>
          <Form.Control
            value={formObj.cap}
            onChange={(e) => handleForm("cap", e.target.value)}
            type="number"
            placeholder="Inserisci il Cap"
          />
        </Form.Group>

              <MyDatalistInput
                  handleForm={handleForm}
                  handleFormName={"nomeComune"}
                  triggerFetch={getComuniList}
                  arrayComuniList={maker(comuni)}
                  placeDataList={"Municipality"}
                  labelDataList={"Select your municipality"}
                  choice={""}
              />

        <Button  className={"w-25 d-block mx-auto my-2"} onClick={() => {
          createNewIndirizzo()
        }} variant="primary" type="button">
          Aggiungi indirizzo
        </Button>
    </div>
  );
}

export default AddressPostComponent;

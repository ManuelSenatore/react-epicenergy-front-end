import React , { useEffect , useState } from "react";
import { Form , Button , Container , Col , Row , Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"
import { useDispatch , useSelector } from "react-redux";
import { logIn } from "../../redux/actions/actions";


function LoginComponent() {

    const user = useSelector(state => state.user.user)

    const dispatch = useDispatch()// REDUX

    const navigate = useNavigate()


    useEffect ( () => {
        if ( user.token !== undefined) {
            navigate("/")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[user.token] );





    const [formObj, setFormObj] = useState({ // oggetto per la compilazione del form
        username: '',
        password: ''
    })

    const handleForm = (key, value) => {// setta l'oggetto del form
        setFormObj(form => {
            return {
                ...form,
                [key]: value
            }

        })
    }




    return (
        <Container  fluid style={
            {
                color: "royalblue",
                borderRadius: "5px",
                padding: "20px",
                backgroundColor: "aliceblue",
                fontSize: "1.5em",
                height: '100%'
            }
        }>
            <Card className={'w-50 m-auto'}>
                <Row className={'d-flex m-auto justify-content-center align-items-center'}>
                    <Col>
                        <Form onSubmit={(e) => {
                            e.preventDefault()
                            dispatch(logIn(formObj))
                        }}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Nome utente</Form.Label>
                                <Form.Control
                                    value={formObj.username}
                                    onChange={(e) => handleForm("username", e.target.value)}
                                    type="text"
                                    autoComplete="current-password"
                                    placeholder="Inserisci il nome utente scelto in fase di registrazione" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    value={formObj.password}
                                    onChange={(e) => handleForm("password",e.target.value)}
                                    type="password"
                                    autoComplete="current-password"
                                    placeholder="Inserisci la tua password" />
                            </Form.Group>
                            <Button className={"w-25 d-block mx-auto my-2"} variant="primary" type="submit">
                                ACCEDI
                            </Button>
                        </Form>

                        <Link to = "/signup">
                            <p className={"w-25 d-block w-100 text-center mx-auto my-2"}>Se non sei registrato clicca a qui.</p>
                        </Link>
                    </Col>
                </Row>
            </Card>



        </Container>
    );
}

export default LoginComponent;
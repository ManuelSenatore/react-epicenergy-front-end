import React , { useEffect , useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"
import { useDispatch , useSelector } from "react-redux";
import { logIn } from "../redux/actions/actions";


function LoginComponent() {

    const user = useSelector(state => state.user.user)

    const dispatch = useDispatch()// REDUX

    const navigate = useNavigate()

    useEffect ( () => {
        if ( user.token !== undefined) {
            navigate("/")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[] );

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
        <div>
            <Form onSubmit={(e) => {
                e.preventDefault()
                dispatch(logIn(formObj))
                console.log(user)
                // navigate('/home')
            }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        value={formObj.username}
                        onChange={(e) => handleForm("username", e.target.value)}
                        type="text"
                        placeholder="Enter username" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        value={formObj.password}
                        onChange={(e) => handleForm("password",e.target.value)}
                        type="password"
                        placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

            <Link to = "/signup">
            <p>Se non sei registrato clicca a qui.</p>
            </Link>

        </div>
    );
}

export default LoginComponent;
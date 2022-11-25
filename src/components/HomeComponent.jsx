import React , { useEffect } from "react";
import { useDispatch , useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { Container } from "react-bootstrap";


function HomeComponent() {

    const user = useSelector ( state => state.user.user )

    const navigate = useNavigate ()

    useEffect ( () => {
        if ( user.token === undefined ) {
            navigate ( "/login" )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [ user.token ] );


    return (
        <Container fluid className={""}>

        </Container>
    )
}

export default HomeComponent
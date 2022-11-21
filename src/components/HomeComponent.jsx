import React , { useEffect , useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { Button} from "react-bootstrap";
import { getClientList } from "../redux/actions/actions";

function HomeComponent() {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const clientList = useSelector(state => state.client.clientList)
    const token = useSelector(state => state.user.user.token)

    const navigate = useNavigate()

    useEffect ( () => {
        if ( user.token === undefined) {
            navigate("/login")
        }else {
            dispatch(getClientList(token))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[user.token] );



    return (
        <div>

        </div>
    )
}

export default HomeComponent
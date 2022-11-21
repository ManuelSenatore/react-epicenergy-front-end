import React , { useEffect , useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/actions/actions'
import { useNavigate } from "react-router-dom"

function HomeComponent() {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)

    const navigate = useNavigate()

    useEffect ( () => {
        if ( user.token === undefined) {
            navigate("/login")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[] );

    useEffect ( () => {
        if ( user.token === undefined) {
            navigate("/login")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[user.token] );


    return (
        <div>
            <h1>WELCOME</h1> <button onClick={() => dispatch(logout())}>Logout</button>
        </div>
    )
}

export default HomeComponent
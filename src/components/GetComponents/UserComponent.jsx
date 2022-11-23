import React, {useState} from 'react'
import { Button , Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const UserComponent = () => {

    const token = useSelector ( (state) => state.user.user.token );
    const navigate = useNavigate();


  return (
    <div>
      
    </div>
  )
}

export default UserComponent

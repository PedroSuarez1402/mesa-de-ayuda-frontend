/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';

const Request = () => {
    const [requests, setRequests] = useState([]);

    const navigate = useNavigate();


    return (
        <div>
            Request
            <p>Aqui se encuentran las solicitudes</p>
        </div>

    )
}

export default Request
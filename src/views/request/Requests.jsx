/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCardText, CCardTitle, CCol, CRow, CSpinner } from '@coreui/react';
import { AuthContext } from '../../context/AuthContext';

const Requests = () => {
    const [requests, setRequests] = useState([]);
    const {user} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchRequest = async() => {
            if(!user){
                navigate('/login');
                return;
            }
            try {
                const token = localStorage.getItem('token');
                if(!token){
                    navigate('/login');
                    return;
                }
                
                const response = await clienteAxios.get(`/solicitudes/${user.userId}/${user.rolId}`);
                setRequests(response.data.solicitudes);
            } catch (error) {
                setError('Error al cargar las solicitudes')
            }
        };
        fetchRequest();
    },[user, navigate])
    return (
        <CRow className='g-3'>
            <CCol xs={12}>
                <CCard>
                    <CCardHeader>
                        <strong>Solicitudes</strong>
                    </CCardHeader>
                    <CCardBody>
                    {loading ? (
                        <CSpinner color='primary' />
                    ) : error ? (
                        <p className='text-danger'>{error}</p>
                    ) : requests.length === 0 ? (
                        <p>No hay solicitudes disponibles</p>
                    ) : (
                        <CRow className='g-3'>
                        {requests.map((request) => (
                            <CCol xs={12} sm={6} md={4} lg={3} key={request.id}>
                                <CCard className='h-100'>
                                <CCardHeader>
                                    <h6 className='mb-2'>Solicitud #{request.id}</h6>
                                </CCardHeader>
                                <CCardBody>
                                    <CCardTitle>{request.name}</CCardTitle>
                                    <CCardText>
                                        {request.description} <br/>
                                        
                                    </CCardText>
                                </CCardBody>
                                <CCardFooter>
                                    <CButton color='primary' variant='outline' className='w-100'>
                                        Ver
                                    </CButton>
                                </CCardFooter>
                                </CCard>
                            </CCol>
                        ))}
                            
                        </CRow>
                    )}
                        
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>

    )
}

export default Requests
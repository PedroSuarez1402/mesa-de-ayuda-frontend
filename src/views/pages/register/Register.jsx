/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilPhone, cilUser } from '@coreui/icons';
import imagenLogin from '/laragon/www/mesa-de-ayuda/mesa-de-ayuda-frontend/src/assets/images/imagenLogin3.jpg';

const Register = () => {
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate('/');
    }
    return (
        <div 
            className="min-vh-100 d-flex flex-row align-items-center"
            style={{ backgroundColor: '#c7c8cb' }} // Fondo gris oscuro
        >
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={10}>
                        <CCardGroup>
                            <CCard className="p-1">
                                <CCardBody>
                                    <CForm className="p-5">
                                        <h1>Registrar</h1>
                                        <p className="text-body-secondary">Ingresa tu cuenta</p>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput
                                                placeholder="Username"
                                                autoComplete="username"
                                                type="text"
                                            />
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilPhone} />
                                            </CInputGroupText>
                                            <CFormInput
                                                placeholder="Telefono"
                                                autoComplete="telefono"
                                                type="text"
                                            />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <CIcon icon={cilLockLocked} />
                                            </CInputGroupText>
                                            <CFormInput
                                                type="password"
                                                placeholder="Password"
                                                autoComplete="current-password"
                                            />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <CIcon icon={cilLockLocked} />
                                            </CInputGroupText>
                                            <CFormInput
                                                type="password"
                                                placeholder="Repetir Password"
                                                autoComplete="current-password"
                                            />
                                        </CInputGroup>
                                        <CRow>
                                            <CCol xs={6}>
                                                <CButton type="submit" color="primary" className="px-4">
                                                    Registrar
                                                </CButton>
                                            </CCol>
                                            <CCol xs={6} className="text-right">
                                                <CButton color="link" className="px-0" onClick={handleRegisterClick} >
                                                    ¿Ya tienes cuenta? Inicia sesion!
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                            <CCard className="text-white bg-primary py-5"
                                style={{
                                    width: '44%',
                                    backgroundImage: `url(${imagenLogin})`,  // Imagen como fondo
                                    backgroundSize: 'cover',                  // Ajusta la imagen para cubrir todo el espacio
                                    backgroundPosition: 'center'              // Centra la imagen
                                }}
                            >
                                {/* Aquí puedes agregar más contenido si es necesario */}
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Register;

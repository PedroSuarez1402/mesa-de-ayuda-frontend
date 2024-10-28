/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilPhone, cilUser } from '@coreui/icons';
import imagenLogin from '/images/imagenLogin2.jpg';
import clienteAxios from "../../../config/axios";
import Swal from 'sweetalert2';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        password_confirmation: '',
        name: '',
        phone: '',
    })
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar campos vacíos
        const { username, password, password_confirmation, name, phone } = formData;
        if (!username || !password || !password_confirmation || !name || !phone) {
            return Swal.fire({
                icon: "warning",
                title: "Campos vacíos",
                text: "Todos los campos son obligatorios.",
            });
        }
        //validacion de contraseña
        if (formData.password.length < 8) {
            return Swal.fire({
                icon: 'warning',
                title: 'Contraseña debil',
                text: 'La contraseña debe tener al menos 8 caracteres.'
            })
        }
        if (formData.password !== formData.password_confirmation) {
            return Swal.fire({
                icon: 'error',
                title: 'Contraseñas no coinciden',
                text: 'Por favor, asegurate de que ambas contraseñas coincidan'
            })
        }
        try {
            const response = await clienteAxios.post('/register', formData);
            if (response.data.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Registro exitoso',
                    text: 'Por favor, espere 24 horas a que su usario sea activado para iniciar sesion'
                }).then(() =>
                    navigate('/'));
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error en registro',
                    text: response.data.message,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al registrarse',
                text: 'Ocurrió un error. Intenta de nuevo.',
            });
        }
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
                                    <CForm className="p-5" onSubmit={handleSubmit}>
                                        <h1>Registrar</h1>
                                        <p className="text-body-secondary">Ingresa tu cuenta</p>
                                        {error && <p className="text-danger">{error}</p>}
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput
                                                name="username"
                                                placeholder="Username"
                                                autoComplete="username"
                                                type="text"
                                                value={formData.username}
                                                onChange={handleChange}
                                            />
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput
                                                name="name"
                                                placeholder="Nombre completo"
                                                type="text"
                                                value={formData.name}
                                                onChange={handleChange}
                                            />
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilPhone} />
                                            </CInputGroupText>
                                            <CFormInput
                                                name="phone"
                                                placeholder="Telefono"
                                                type="text"
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <CIcon icon={cilLockLocked} />
                                            </CInputGroupText>
                                            <CFormInput
                                                name="password"
                                                type="password"
                                                placeholder="Password"
                                                value={formData.password}
                                                onChange={handleChange}
                                            />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <CIcon icon={cilLockLocked} />
                                            </CInputGroupText>
                                            <CFormInput
                                                name="password_confirmation"
                                                type="password"
                                                placeholder="Repetir Password"
                                                value={formData.password_confirmation}
                                                onChange={handleChange}
                                            />
                                        </CInputGroup>
                                        <CRow>
                                            <CCol xs={6}>
                                                <CButton type="submit" color="primary" className="px-4">
                                                    Registrar
                                                </CButton>
                                            </CCol>
                                            <CCol xs={6} className="text-right">
                                                <CButton color="link" className="px-0" onClick={() => navigate('/')} >
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

/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow, CSpinner } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import imagenLogin from '/images/imagenLogin3.jpg';
import clienteAxios from "../../../config/axios";
import Swal from "sweetalert2";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Validación de campos vacíos
        if (username.trim() === "") {
            return Swal.fire({
                icon: "warning",
                title: "Usuario vacío",
                text: "El username no puede estar vacío",
            });
        }
        
        if (password.trim() === "") {
            return Swal.fire({
                icon: "warning",
                title: "Contraseña vacía",
                text: "La contraseña no puede estar vacía",
            });
        }

        try {
            const response = await clienteAxios.post('/login', { username, password });

            // Verificar si el login fue exitoso y se recibió un token
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                Swal.fire({
                    icon: "success",
                    title: "Inicio de sesión exitoso",
                    text: "Bienvenido",
                });
                navigate('/dashboard');
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error de autenticación",
                    text: response.data.message || "Usuario o contraseña incorrectos",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error de inicio de sesión",
                text: "Verifica tus credenciales e intenta nuevamente.",
            });
            console.error("Error de inicio de sesión:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };
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
                                    <CForm className="p-5" onSubmit={handleLogin}>
                                        <h1>Inicia Sesión</h1>
                                        <p className="text-body-secondary">Ingresa tu cuenta</p>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput
                                                placeholder="Username"
                                                autoComplete="username"
                                                type="text"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
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
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </CInputGroup>
                                        <CRow>
                                            <CCol xs={6}>
                                                <CButton type="submit" color="primary" className="px-4" disabled={loading} >
                                                {loading ? (
                                                    <CSpinner size="sm" className="me-2"/>
                                                ):(
                                                    <CIcon icon={cilLockLocked} className="me-2"/>
                                                )}
                                                    Iniciar Sesión
                                                </CButton>
                                            </CCol>
                                            <CCol xs={6} className="text-right">
                                                <CButton color="link" className="px-0" onClick={handleRegisterClick}>
                                                
                                                    ¿No tienes cuenta? ¡Regístrate!
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

export default Login;

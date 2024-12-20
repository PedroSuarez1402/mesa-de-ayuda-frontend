/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow, CSpinner } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import imagenLogin from '/images/imagenLogin3.jpg';
import clienteAxios from "../../../config/axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../../context/AuthContext";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const showAlert = (icon, title, text) => {
        Swal.fire({ icon, title, text });
    };

    const validateFields = () => {
        if (!username.trim()) {
            showAlert("warning", "Usuario vacío", "El username no puede estar vacío");
            return false;
        }
        if (!password.trim()) {
            showAlert("warning", "Contraseña vacía", "La contraseña no puede estar vacía");
            return false;
        }
        return true;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateFields()) return;

        setLoading(true);
        try {
            const { data } = await clienteAxios.post('/login', { username, password });
            if (data.token) {
                const userData = { userId: data.user.id, rolId: data.user.rol, username: data.user.username };
                login(userData);
                localStorage.setItem('token', data.token);
                showAlert("success", "Inicio de sesión exitoso", "Bienvenido");
                navigate('/dashboard');
            } else {
                showAlert("error", "Error de autenticación", data.message || "Usuario o contraseña incorrectos");
            }
        } catch (error) {
            showAlert("error", "Error de inicio de sesión", "Verifica tus credenciales e intenta nuevamente.");
            console.error("Error de inicio de sesión:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div 
            className="min-vh-100 d-flex flex-row align-items-center"
            style={{ backgroundColor: '#c7c8cb' }}
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
                                                <CButton type="submit" color="primary" className="px-4" disabled={loading}>
                                                    {loading ? <CSpinner size="sm" className="me-2"/> : <CIcon icon={cilLockLocked} className="me-2"/>}
                                                    Iniciar Sesión
                                                </CButton>
                                            </CCol>
                                            <CCol xs={6} className="text-right">
                                                <CButton color="link" className="px-0" onClick={() => navigate('/register')}>
                                                    ¿No tienes cuenta? ¡Regístrate!
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                            <CCard 
                                className="text-white bg-primary py-5"
                                style={{
                                    width: '44%',
                                    backgroundImage: `url(${imagenLogin})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            />
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    );
};

export default Login;

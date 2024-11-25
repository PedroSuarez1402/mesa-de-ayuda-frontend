/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../../config/axios";
import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCardText, CCardTitle, CCol, CRow, CSpinner,
} from "@coreui/react";
//import { AuthContext } from "../../context/AuthContext";
import FormRequests from "./FormRequests";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  //const { user, loading } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);

  const [assigning, SetAssigning] = useState(false);
  const [tecnico, setTecnico] = useState([]);
  const [selectRequest, setSelectRequest] = useState(null);
  const [selectTecnico, setSelectTecnico] = useState("");

  const navigate = useNavigate();

  const fetchRequest = async () => {
    setLoading(true)
    try {
        const userResponse = await clienteAxios.get("/session-data");
        const userData = userResponse.data.user;

        if(!userData){
            throw new Error("No hay sesion activa");
        }
        setUser(userData);

        const response = await clienteAxios.get(`/solicitudes/${userData.id}/${userData.rol}`)
        setRequests(response.data.solicitudes)
    } catch (error) {
        console.error("Error al obtener la sesión o solicitudes:", error);
        setError("Error al cargar datos. Por favor, inicia sesión nuevamente.");
        navigate("/login"); // Redirige si no hay sesión activa
    } finally {
        setLoading(false);
    }
  };

  const fetchTecnicos = async() => {
    try {
        const response = await clienteAxios.get("/usuarios")
        setTecnico(response.data.users)
    } catch (error) {
        console.error("Error al cargar los técnicos:", error);
        setError("No se pudieron cargar los técnicos.");
    }
  }

  const handleAssign = (requestId) => {
    setSelectRequest(requestId)
    SetAssigning(true)
    fetchTecnicos();
  }

  const handleAssignSubmit = async() => {
    try {
        const response = await clienteAxios.post("/asignar-solicitud")
    } catch (error) {
        
    }
  }

  useEffect(() => {
    
    fetchRequest(); 
  }, []);

  const handleOpenModal = () => setIsCreating(true);
  const handleCloseModal = () => setIsCreating(false);
  return loading ? (
    <CSpinner color="primary" />
  ) : (
    <CRow className="g-3">
      <CCol xs={12}>
        <CCard>
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>Solicitudes</strong>
            {user?.rol === 1 && (
                <CButton color="primary" onClick={handleOpenModal}>
                Crear Solicitud
              </CButton>
            )}
            
          </CCardHeader>
          <CCardBody>
            {loading ? (
              <CSpinner color="primary" />
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : requests.length === 0 ? (
              <p>No hay solicitudes disponibles</p>
            ) : (
              <CRow className="g-3">
                {requests.map((request) => (
                  <CCol xs={12} sm={6} md={4} lg={3} key={request.id}>
                    <CCard className="h-100">
                      <CCardHeader>
                        <h6 className="mb-2">Solicitud #{request.id}</h6>
                      </CCardHeader>
                      <CCardBody>
                        <CCardTitle>{request.name}</CCardTitle>
                        <CCardText>
                          {request.description} <br />
                        </CCardText>
                      </CCardBody>
                      <CCardFooter>
                        <CButton
                          color="primary"
                          variant="outline"
                          className="w-100"
                        >
                          Asignar
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
      {isCreating && (
        <FormRequests visible={isCreating} onClose={handleCloseModal} />
      )}
    </CRow>
  );
};

export default Requests;

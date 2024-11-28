/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../../config/axios";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCardText,
  CCardTitle,
  CCol,
  CRow,
  CSpinner,
} from "@coreui/react";
import FormRequests from "./FormRequests";
import FormAssign from "./FormAssign";
import RequestAssign from "./RequestAssign";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);

  const [assigning, setAssigning] = useState(false);
  const [selectRequest, setSelectRequest] = useState(null);
  const [viewingRequest, setViewingRequest] = useState(null);
  const [tecnicos, setTecnicos] = useState([]);

  const navigate = useNavigate();

  const fetchRequest = async () => {
    setLoading(true);
    try {
      const userResponse = await clienteAxios.get("/session-data");
      const userData = userResponse.data.user;

      if (!userData) {
        throw new Error("No hay sesion activa");
      }
      setUser(userData);

      const response = await clienteAxios.get(
        `/solicitudes/${userData.id}/${userData.rol}`
      );
      setRequests(response.data.solicitudes);

      if (response.data.tecnicos) {
        setTecnicos(response.data.tecnicos);
      }
    } catch (error) {
      console.error("Error al obtener la sesión o solicitudes:", error);
      setError("Error al cargar datos. Por favor, inicia sesión nuevamente.");
      navigate("/"); // Redirige si no hay sesión activa
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = (requestId) => {
    console.log("Solicitud seleccionada para asignar:", requestId);
    setSelectRequest(requestId);
    setAssigning(true);
  };

  const handleViewRequest = (request) => {
    setViewingRequest(request);
  };

  const handleCloseViewRequest = () => setViewingRequest(null);

  const handleOpenModal = () => setIsCreating(true);
  const handleCloseModal = () => setIsCreating(false);

  useEffect(() => {
    fetchRequest();
  }, []);

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
                {requests.map((request) => {
                  const isAssigned = request.status_request_id === 2; // Checar estado
                  return (
                    <CCol xs={12} sm={6} md={4} lg={3} key={request.id}>
                      <CCard className="h-100">
                        <CCardHeader className="d-flex justify-content-between align-items-center">
                          <h6 className="mb-2">Solicitud #{request.id}</h6>
                          <span
                            className={`badge ${
                              isAssigned ? "bg-success" : "bg-warning"
                            }`}
                          >
                            {isAssigned ? "Asignada" : "Pendiente"}
                          </span>
                        </CCardHeader>
                        <CCardBody>
                          <CCardTitle>{request.name}</CCardTitle>
                          <CCardText>{request.description}</CCardText>
                        </CCardBody>
                        <CCardFooter>
                          {isAssigned ? (
                            // Mostrar botón "Ver" para todos los usuarios si la solicitud está asignada
                            <CButton
                              color="info"
                              variant="outline"
                              className="w-100"
                              onClick={() => handleViewRequest(request)}
                            >
                              Ver
                            </CButton>
                          ) : (
                            // Mostrar botón "Asignar" solo para usuarios de rol 2 si la solicitud no está asignada
                            user?.rol === 2 && (
                              <CButton
                                color="primary"
                                variant="outline"
                                className="w-100"
                                onClick={() => handleAssign(request.id)}
                              >
                                Asignar
                              </CButton>
                            )
                          )}
                        </CCardFooter>
                      </CCard>
                    </CCol>
                  );
                })}
              </CRow>
            )}
          </CCardBody>
        </CCard>
      </CCol>
      {isCreating && (
        <FormRequests visible={isCreating} onClose={handleCloseModal} />
      )}
      {assigning && (
        <FormAssign
          requestId={selectRequest}
          visible={assigning}
          onClose={() => setAssigning(false)}
          onSuccess={fetchRequest}
          tecnicos={tecnicos}
        />
      )}
      {viewingRequest && (
        <RequestAssign
          visible={!!viewingRequest}
          onClose={handleCloseViewRequest}
          request={viewingRequest}
          tecnicos={tecnicos}
        />
      )}
    </CRow>
  );
};

export default Requests;

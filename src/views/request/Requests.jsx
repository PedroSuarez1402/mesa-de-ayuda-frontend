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
                  const isCreating = request.status_request_id === 1;
                  const isAssigned = request.status_request_id === 2; // Checar estado
                  const isInProcess = request.status_request_id === 3;
                  const isInFinalize = request.status_request_id === 4;
                  const badgeClass = isAssigned
                    ? "bg-success"
                    : isInProcess
                    ? "bg-primary"
                    : isInFinalize
                    ? "bg-info"
                    : "bg-danger";
                  const badgeText = isAssigned
                    ? "Asignada"
                    : isInProcess
                    ? "En Proceso"
                    : isInFinalize
                    ? "Finalizada"
                    : "Creada";
                  return (
                    <CCol xs={12} sm={6} md={4} lg={3} key={request.id}>
                      <CCard className="h-100">
                        <CCardHeader className="d-flex justify-content-between align-items-center">
                          <h6 className="mb-2">Solicitud #{request.id}</h6>
                          <span className={`badge ${badgeClass}`}>
                            {badgeText}
                          </span>
                        </CCardHeader>
                        <CCardBody>
                          <CCardTitle>{request.name}</CCardTitle>
                          <CCardText>{request.description}</CCardText>
                        </CCardBody>
                        <CCardFooter>
                          {request.technical_description ? (
                            <p className="mb-2">
                              <strong>Descripción Técnica:</strong>{" "}
                              {request.technical_description}
                            </p>
                          ) : (
                            <>
                              {/* Botón "Ver" para solicitudes asignadas o en proceso */}
                              {(isAssigned || isInProcess || isCreating || isInFinalize) && (
                                <CButton
                                  color="info"
                                  variant="outline"
                                  className="w-100"
                                  onClick={() => handleViewRequest(request)}
                                >
                                  Ver
                                </CButton>
                              )}
                              {/* Botón "Asignar" para solicitudes no asignadas (solo rol 2) */}
                              {!isAssigned &&
                                !isInProcess &&
                                user?.rol === 2 && (
                                  <CButton
                                    color="primary"
                                    variant="outline"
                                    className="w-100 mt-2"
                                    onClick={() => handleAssign(request.id)}
                                  >
                                    Asignar
                                  </CButton>
                                )}
                            </>
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
        <FormRequests visible={isCreating} onClose={handleCloseModal} onSuccess={fetchRequest}/>
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
          onRequestProcessed={fetchRequest}
          user={user}
        />
      )}
    </CRow>
  );
};

export default Requests;

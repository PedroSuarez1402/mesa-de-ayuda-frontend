/* eslint-disable react/prop-types */
import { CButton, CFormTextarea, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react"
import { useState } from "react"
import clienteAxios from "../../config/axios";

const RequestAssign = ({visible, onClose, request, onRequestProcessed, user}) => {
    const [tecnicalDescription, setTecnicalDescription] = useState("");

    if(!request) return null;
    

    const handleProcessRequest = async () => {
        try {
            await clienteAxios.post("/procesar-solicitud", {
                request_id: request.id,
            });
            alert("Solicitud procesada exitosamente");
            onRequestProcessed();
            onClose();
            } catch (error) {
                console.error("Error al procesar la solicitud:", error);
                alert("Error al procesar la solicitud.");
            }
    }

    const handleFinalizeRequest = async () => {
        try {
            await clienteAxios.post("/finalizar-solicitud", {
                request_id: request.id,
                tecnical_description: tecnicalDescription
            });
            alert("Solicitud finalizada exitosamente");
            onRequestProcessed();
            onClose();
            } catch (error) {
                console.error("Error al finalizar la solicitud:", error);
                alert("Error al finalizar la solicitud.");
            }
    }

    
    
    return (
        <CModal visible={visible} onClose={onClose}>
            <CModalHeader>
                <CModalTitle>Detalles de la solicitud #{request.id}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                
                <p><strong>Descripción:</strong> {request.description}</p>
                <p><strong>Técnico Asignado:</strong> {request?.tecnico || "No asignado"}</p>
                <p><strong>Teléfono del Técnico:</strong> {request?.telefono_tecnico || "No disponible"}</p>

                {request.status_request_id === 3 && user?.rol === 3 && (
                    <>
                    <CFormTextarea
                        placeholder="Descripcion del Técnico"
                        value={tecnicalDescription}
                        onChange={(e) => setTecnicalDescription(e.target.value)}
                        rows={4}
                    />
                    </>
                )}
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={onClose}>Cerrar</CButton>
                {request.status_request_id === 2 && user?.rol === 3 && (
                <CButton color="primary" onClick={handleProcessRequest}>
                    Procesar
                </CButton>
                )}

                {request.status_request_id === 3 && user?.rol === 3 && (
                <CButton color="success" onClick={handleFinalizeRequest} disabled={!tecnicalDescription.trim()}>
                    Finalizar
                </CButton>
                )}
            </CModalFooter>
        </CModal>
    )
}

export default RequestAssign;
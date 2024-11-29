/* eslint-disable react/prop-types */
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react"
import clienteAxios from "../../config/axios";

const RequestAssign = ({visible, onClose, request, tecnicos, onRequestProcessed, user}) => {
    if(!request) return null;
    console.log("Detalles de la solicitud",request);

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

    const tecnicoAsignado = tecnicos.find(tecnico => tecnico.id === request.id_tecnico);
    console.log("tecnicoAsignado", tecnicoAsignado);

    console.log("tecnicos", tecnicos);

    
    return (
        <CModal visible={visible} onClose={onClose}>
            <CModalHeader>
                <CModalTitle>Detalles de la solicitud #{request.id}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                
                <p><strong>Descripción:</strong> {request.description}</p>
                <p><strong>Técnico Asignado:</strong> {tecnicoAsignado?.name || "No asignado"}</p>
                <p><strong>Teléfono del Técnico:</strong> {tecnicoAsignado?.phone || "No disponible"}</p>

            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={onClose}>Cerrar</CButton>
                {request.status_request_id === 2 && user?.rol === 3 && (
                <CButton color="primary" onClick={handleProcessRequest}>
                    Procesar
                </CButton>
                )}
            </CModalFooter>
        </CModal>
    )
}

export default RequestAssign;
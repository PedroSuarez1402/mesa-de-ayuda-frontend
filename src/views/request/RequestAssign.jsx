/* eslint-disable react/prop-types */
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react"

const RequestAssign = ({visible, onClose, request, tecnicos}) => {
    if(!request) return null;
    console.log("Detalles de la solicitud",request);
    const tecnicoAsignado = tecnicos.find(tecnico => tecnico.id === request.user_id);
    console.log("tecnicoAsignado", tecnicoAsignado);

    console.log("tecnicos", tecnicos);

    
    return (
        <CModal visible={visible} onClose={onClose}>
            <CModalHeader>
                <CModalTitle>Detalles de la solicitud #{request.id}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                
                <p><strong>Descripción:</strong> {request.description}</p>
                <p><strong>Técnico Asignado:</strong> {tecnicos?.name || "No asignado"}</p>
                <p><strong>Teléfono del Técnico:</strong> {tecnicos?.phone || "No disponible"}</p>

            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={onClose}>Cerrar</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default RequestAssign;
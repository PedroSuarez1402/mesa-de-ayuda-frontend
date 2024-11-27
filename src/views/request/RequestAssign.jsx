/* eslint-disable react/prop-types */
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react"

const RequestAssign = ({visible, onClose, request}) => {
    if(!request) return null;
    return (
        <CModal visible={visible} onClose={onClose}>
            <CModalHeader>
                <CModalTitle>Detalles de la solicitud #{request.id}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                
                <p><strong>Descripción:</strong> {request.description}</p>
                <p><strong>Técnico Asignado:</strong> {request.tecnico?.name || "No asignado"}</p>
                <p><strong>Teléfono del Técnico:</strong> {request.tecnico?.phone || "No disponible"}</p>

            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={onClose}>Cerrar</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default RequestAssign;
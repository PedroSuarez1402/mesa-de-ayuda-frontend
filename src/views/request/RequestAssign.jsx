/* eslint-disable react/prop-types */
import { CButton, CFormTextarea, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react"
import { useState } from "react"
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

const RequestAssign = ({ visible, onClose, request, onRequestProcessed, user }) => {
    const [tecnicalDescription, setTecnicalDescription] = useState("");

    if (!request) return null;


    const handleProcessRequest = async () => {
        const result = await Swal.fire({
            title: '¿Estas seguro de procesar la solicitud?',
            text: '¿Quieres procesar esta solicitud?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, procesar',
            cancelButtonText: 'No, cancelar',
        })
        if (result.isConfirmed) {
            try {
                await clienteAxios.post("/procesar-solicitud", {
                    request_id: request.id,
                });
                Swal.fire({
                    title: 'Procesada exitosamente',
                    text: 'La solicitud ha sido procesada exitosamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                })
                onRequestProcessed();
                onClose();
            } catch (error) {
                console.error("Error al procesar la solicitud:", error);
                Swal.fire({
                    title: 'Error',
                    text: 'Ocurrio un error al procesar la solicitud',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                })
            }
        }

    }

    const handleFinalizeRequest = async () => {
        const result = await Swal.fire({
            title: '¿Estas seguro de finalizar la solicitud?',
            text: '¿Quieres finalizar esta solicitud?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, finalizar',
            cancelButtonText: 'No, cancelar',
        })
        if (result.isConfirmed) {
            try {
                await clienteAxios.post("/finalizar-solicitud", {
                    request_id: request.id,
                    technical_description: tecnicalDescription
                });
                Swal.fire({
                    title: 'Finalizada exitosamente',
                    text: 'La solicitud ha sido finalizada exitosamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                })
                onRequestProcessed();
                onClose();
            } catch (error) {
                console.error("Error al finalizar la solicitud:", error);
                Swal.fire({
                    title: 'Error',
                    text: 'Ocurrio un error al finalizar la solicitud',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                })
            }
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
                {request.descripcion_tecnico && (
                    <p>
                        <strong>Descripción Técnica:</strong> {request.descripcion_tecnico}
                    </p>
                )}

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
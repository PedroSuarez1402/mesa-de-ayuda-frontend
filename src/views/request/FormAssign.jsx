/* eslint-disable react/prop-types */
import { useState } from 'react'
import clienteAxios from '../../config/axios';
import { CButton, CFormSelect, CModal, CModalBody, CModalFooter, CModalHeader } from '@coreui/react';
import Swal from 'sweetalert2';

function FormAssign({requestId, visible, onClose, onSuccess, tecnicos}) {
  const [selectTecnico, setSelectTecnico] = useState("");
  


  const handleAssignSubmit = async () => {
    if (!selectTecnico) {
        Swal.fire({
            title: 'Error',
            text: 'Debe seleccionar un tecnico',
            icon: 'error',
            confirmButtonText: 'Aceptar',
        })
        return
    }
    try {
        const response = await clienteAxios.post("/asignar-solicitud", {
            request_id: requestId,
            technical_id: selectTecnico,
        });
        Swal.fire({
            title: 'Asignada exitosamente',
            text: response.data.message || 'La solicitud ha sido asignada exitosamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
        })
        onSuccess();
        onClose();
    } catch (error) {
        console.error("Error al asignar la solicitud:", error);
        Swal.fire({
            title: 'Error',
            text: error.response.data.message || 'Ocurrio un error al asignar la solicitud',
            icon: 'error',
            confirmButtonText: 'Aceptar',
        })
    }
  }
  
  return (
    <CModal visible={visible} onClose={onClose}>
        <CModalHeader>Asignar Técnico</CModalHeader>
        <CModalBody>
            
            <CFormSelect 
              value={selectTecnico}
              onChange={(e) => setSelectTecnico(e.target.value)}
            >
                <option>Seleccione un tecnico</option>
                {tecnicos.map((tech) => (
                    <option key={tech.id} value={tech.id}>
                        {tech.name} - {tech.phone}
                    </option>
                ))}
            </CFormSelect>
        </CModalBody>
        <CModalFooter>
            <CButton color='secondary' onClick={onClose}>Cancelar</CButton>
            <CButton color='primary' onClick={handleAssignSubmit} disabled={!selectTecnico}>Asignar</CButton>
        </CModalFooter>
    </CModal>
  )
}

export default FormAssign
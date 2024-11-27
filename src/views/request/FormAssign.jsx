/* eslint-disable react/prop-types */
import { useState } from 'react'
import clienteAxios from '../../config/axios';
import { CButton, CFormSelect, CModal, CModalBody, CModalFooter, CModalHeader } from '@coreui/react';

function FormAssign({requestId, visible, onClose, onSuccess, tecnicos}) {
  const [selectTecnico, setSelectTecnico] = useState("");
  const [error, setError] = useState(null)


  const handleAssignSubmit = async () => {
    try {
        const response = await clienteAxios.post("/asignar-solicitud", {
            request_id: requestId,
            technical_id: selectTecnico,
        });
        alert(response.data.message);
        onSuccess();
        onClose();
    } catch (error) {
        console.error("Error al asignar la solicitud:", error);
        setError("No se pudo asignar la solicitud.");
    }
  }
  
  return (
    <CModal visible={visible} onClose={onClose}>
        <CModalHeader>Asignar Técnico</CModalHeader>
        <CModalBody>
            {error && <p className='text-danger'>{error}</p>}
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
import { useEffect, useState } from 'react'
import clienteAxios from '../../config/axios';
import { CButton, CFormSelect, CModal, CModalBody, CModalFooter, CModalHeader } from '@coreui/react';

function FormAssign({requestId, visible, onClose, onSuccess}) {
  const [tecnico, setTecnico] = useState([]);
  const [selectTecnico, setSelectTecnico] = useState("");
  const [error, setError] = useState(null)

  const fetchTecnicos = async () => {
    try {
        const response = await clienteAxios.get("/usuarios");
        const tecnicosFiltrados = response.data.users.filter(
            (user) => user.rol_id === 3
        );
        setTecnico(tecnicosFiltrados)
    } catch (error) {
        console.error("Error al cargar los tecnicos:", error)
        setError("No se pudieron cargar los tecnicos");
    }
  }

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
  useEffect(() => {
    fetchTecnicos();
  }, [])
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
                {tecnico.map((tech) => (
                    <option key={tech.id} value={tech.id}>
                        {tech.name}
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
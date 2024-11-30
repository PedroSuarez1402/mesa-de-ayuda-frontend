/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react'
import clienteAxios from '../../config/axios'
import { AuthContext } from '../../context/AuthContext';
import { CButton, CForm, CFormLabel, CFormSelect, CFormTextarea, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import Swal from 'sweetalert2';
const FormRequests = ({ visible , onClose, onSuccess }) => {
    const [description, setDescription] = useState("");
    const [helpDeskId, setHelpDeskId] = useState("");
    const [error, setError] = useState(null);
    const [helpDesks, setHelpDesk] = useState([]);
    const {user} = useContext(AuthContext)

    useEffect(() => {
        const fetchHelpDesks = async () => {
            try {
                const response = await clienteAxios.get(`/solicitudes/${user.userId}/${user.rolId}`);
                if(response.data.status === 200){
                    setHelpDesk(response.data.dataHelpDesk);
                }
            } catch (error) {
                console.error("Error al obtener las mesas de ayuda", error);
            }
        };
        fetchHelpDesks();
    }, [user.userId, user.rolId])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user){
            setError('El usuario debe estar autenticado')
            return;
        }
        try {
            const response = await clienteAxios.post("/crear-solicitud",{
                description,
                user_id: user.userId,
                help_desk_id: helpDeskId,
            });
            if ( response.data.status === 200){
                Swal.fire({
                    title: 'Creada exitosamente',
                    text: 'La solicitud ha sido creada exitosamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                })
                onClose();
                onSuccess();

            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Ocurrio un error al crear la solicitud',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            })
            setError("error al crear la solicitud");
            console.error("error al crear la solicitud", error)
        }
    }
  return (
    <CModal visible={visible} onClose={onClose} >
        <CModalHeader>
            <CModalTitle>Crear Nueva Solicitud</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CForm>
                <div>
                    <CFormLabel>Descripción</CFormLabel>
                    <CFormTextarea id='description' value={description} onChange={(e) => setDescription(e.target.value)} required/>
                </div>
                <div>
                    <CFormLabel>Mesa de Ayuda</CFormLabel>
                    <CFormSelect
                        id="helpDeskId"
                        value={helpDeskId}
                        onChange={(e) => setHelpDeskId(e.target.value)}
                        required >
                        <option value="" >Selecciona una mesa de ayuda</option>
                        {helpDesks.map((desk) => (
                            <option key={desk.id} value={desk.id}>
                                {desk.name}
                            </option>
                        ))}
                    </CFormSelect>
                </div>
            </CForm>
        </CModalBody>
        <CModalFooter>
            <CButton color='primary' onClick={handleSubmit}>Crear Solicitud</CButton>
            <CButton color='secondary' onClick={onClose}>Cerrar</CButton>
            
        </CModalFooter>
    </CModal>
  )
}
    


export default FormRequests
/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import { CButton, CForm, CFormInput, CFormSelect, CModal, CModalHeader, CModalBody, CModalFooter } from "@coreui/react";
import clienteAxios from "../../config/axios";

const UserEdit = ({ visible, onClose, user, onUserUpdated }) => {

  const initialFormData = {
    id_user: user?.id || "", //  id_user para identificar al usuario
    is_active: user?.is_active || 0,
    name: user?.name || "",
    phone: user?.phone || "",
    rol_id: user?.rol_id || "1",
    help_desk_id: user?.help_desk_id || "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const mesasAyuda = [
    { id: 1, nombre: "Mesa Ayuda Sistemas" },
    { id: 2, nombre: "Mesa Ayuda Infraestructura" },
    { id: 3, nombre: "Mesa Ayuda Contabilidad" },
    { id: 4, nombre: "Mesa Ayuda Talento Humano" },
  ];

  useEffect(() => {
    if (user) {
      setFormData({
        id_user: user.id,
        estado: user.is_active,
        name: user.name,
        phone: user.phone,
        rol_id: user.rol_id,
        help_desk_id: user.help_desk_id || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await clienteAxios.post("/actualizar-usuario", formData)
      
      alert("Usuario actualizado exitosamente");
      onUserUpdated(); // Refresca la lista de usuarios
      onClose(); // Cierra el modal
    } catch (error) {
      console.error("Error actualizando usuario:", error);
      alert("Error al actualizar el usuario");
      
    }
  };

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>Editar Usuario</CModalHeader>
      <CModalBody>
        <CForm>
        
        
          <CFormInput
            label="Nombre"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <CFormInput
            label="Teléfono"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <CFormSelect
            label="Estado"
            name="estado"
            value={formData.is_active}
            onChange={handleChange}
          >
            <option value={1}>Activo</option>
            <option value={0}>Inactivo</option>
          </CFormSelect>
          <CFormSelect
            label="Rol"
            name="rol_id"
            value={formData.rol_id}
            onChange={handleChange}
          >
            <option value="1">Usuario</option>
            <option value="2">Administrador de Área</option>
            <option value="3">Técnico</option>
            <option value="4">Superadministrador</option>
          </CFormSelect>
          {formData.rol_id === "3" && (
            <CFormSelect
              label="Mesa de Ayuda"
              name="help_desk_id"
              value={formData.help_desk_id}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una Mesa de Ayuda</option>
              {mesasAyuda.map((mesa) => (
                <option key={mesa.id} value={mesa.id}>
                  {mesa.nombre}
                </option>
              ))}
            </CFormSelect>
          )}
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cerrar
        </CButton>
        <CButton type="submit" color="primary" onClick={handleSubmit}>
          Guardar Cambios
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default UserEdit;

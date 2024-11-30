/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import {
  CButton,
  CForm,
  CFormInput,
  CFormSelect,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

const UserEdit = ({ visible, onClose, user, onUserUpdated }) => {
  const initialFormData = {
    id_user: user?.id || "",
    estado: user?.is_active ?? 0,
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

  const validateForm = () => {
    const { name, phone, rol_id, help_desk_id } = formData;

    if (!name.trim() || /[^a-zA-Z\s]/.test(name)) {
      Swal.fire({
        title: "Error",
        text: "El nombre solo puede contener letras y no puede estar vacío.",
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
      return false;
    }

    if (!phone.trim() || !/^\d+$/.test(phone)) {
      Swal.fire({
        title: "Error",
        text: "El teléfono solo puede contener números y no puede estar vacío.",
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
      return false;
    }

    if (rol_id === "3" && !help_desk_id.trim()) {
      Swal.fire({
        title: "Error",
        text: "Debe seleccionar una Mesa de Ayuda para el técnico.",
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await clienteAxios.post("/actualizar-usuario", formData);

      Swal.fire({
        title: "¡Éxito!",
        text: response.data.message || "Usuario actualizado exitosamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });

      onUserUpdated();
      onClose();
    } catch (error) {
      console.error("Error actualizando usuario:", error);

      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Error al actualizar el usuario.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
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
            value={formData.estado}
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

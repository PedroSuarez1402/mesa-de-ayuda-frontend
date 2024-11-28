/* eslint-disable react/prop-types */
import { useState } from "react";
import { CButton, CForm, CFormInput, CFormSelect, CModal, CModalHeader, CModalBody, CModalFooter,
} from "@coreui/react";
import clienteAxios from "../../config/axios";

const UserForm = ({ visible, onClose, onUserCreated }) => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    password: "",
    phone: "",
    rol_id: "1",
    help_desk_id: "",
  });

  const mesasAyuda = [
    { id: 1, nombre: "Mesa Ayuda Sistemas" },
    { id: 2, nombre: "Mesa Ayuda Infraestructura" },
    { id: 3, nombre: "Mesa Ayuda Contabilidad" },
    { id: 4, nombre: "Mesa Ayuda Talento Humano" },
  ];

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
      await clienteAxios.post("/crear-usuario", formData);
      alert("Usuario creado exitosamente");
      onUserCreated(); // Actualiza la lista de usuarios
      onClose(); // Cierra el modal
    } catch (error) {
      console.error("Error creando usuario:", error);
      alert("Error al crear el usuario");
    }
  };

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>Crear Usuario</CModalHeader>
      <CModalBody>
        <CForm>
          <CFormInput
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <CFormInput
            label="Nombre"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <CFormInput
            type="password"
            label="Contraseña"
            name="password"
            value={formData.password}
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
            Crear
          </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default UserForm;

import { useEffect, useState } from 'react';
import { 
  CButton, CCard, CCardBody, CCardHeader, CCol, CRow, 
  CTable, CTableBody, CTableDataCell, CTableHead, 
  CTableHeaderCell, CTableRow, CSpinner 
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import clienteAxios from '../../config/axios';
import SearchAndPagination from '../../components/SearchAndPagination'; // Componente de búsqueda y paginación
import { cilPencil } from '@coreui/icons';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // Usuarios filtrados
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  // Función para obtener el nombre del rol
  const getRoleName = (roleId) => {
    const roles = {
      1: "Usuario",
      2: "Administrador de Área",
      3: "Técnico",
      4: "Superadministrador",
    };
    return roles[roleId] || "Desconocido";
  };

  // Función para obtener el estado
  const getStatusName = (status) => {
    return status === 1 ? "Activo" : "Inactivo";
  };

  const fetchUsers = async () => {
    try {
      const response = await clienteAxios.get('/usuarios');
      setUsers(response.data.users);
      setFilteredUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('No se pudo cargar la lista de usuarios.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>Usuarios</strong>
            <CButton color="primary">
              Crear Usuario
            </CButton>
          </CCardHeader>
          <CCardBody>
            {loading ? (
              <CSpinner color="primary" />
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : users.length === 0 ? (
              <p>No hay usuarios registrados.</p>
            ) : (
              <>
                <SearchAndPagination
                  data={users}
                  itemsPerPage={5}
                  onFilter={(filteredData) => setFilteredUsers(filteredData)}
                />
                <CTable align="middle" className="mb-0 border" hover responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Username</CTableHeaderCell>
                      <CTableHeaderCell>Nombre</CTableHeaderCell>
                      <CTableHeaderCell>Teléfono</CTableHeaderCell>
                      <CTableHeaderCell>Rol</CTableHeaderCell>
                      <CTableHeaderCell>Estado</CTableHeaderCell>
                      <CTableHeaderCell>Acciones</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {filteredUsers.map((user, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell>{user.username}</CTableDataCell>
                        <CTableDataCell>{user.name}</CTableDataCell>
                        <CTableDataCell>{user.phone}</CTableDataCell>
                        <CTableDataCell>{getRoleName(user.rol_id)}</CTableDataCell>
                        <CTableDataCell>{getStatusName(user.is_active)}</CTableDataCell>
                        <CTableDataCell>
                          <CButton color="warning" size="sm">
                            <CIcon icon={cilPencil} size="sm" />
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Users;

import { CCol, CRow, CSpinner } from '@coreui/react';
import { useEffect, useState } from 'react';
import Users from '../users/Users';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';

const Dashboard = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        localStorage.removeItem('token'); // Eliminar token si no existe
        navigate('/'); // Redirigir a "/"
        return;
      }
      try {
        const response = await clienteAxios.get("/session-data");
        setRole(response.data.user);
      } catch (error) {
        console.error("Error en la consulta de rol de usuario:", error);
        localStorage.removeItem('token'); // Eliminar token en caso de error
        navigate('/'); // Redirigir a "/"
      } finally {
        setLoading(false);
      }
    };
    fetchUserRole();
  }, [navigate]);

  if (loading) {
    return <CSpinner color="primary" />;
  }

  return (
    <CRow>
      <CCol xs>
        {role?.rol === 4 ? (
          <Users />
        ) : (
          <p>No tienes permiso para acceder a esta sección.</p>
        )}
      </CCol>
    </CRow>
  );
};

export default Dashboard;

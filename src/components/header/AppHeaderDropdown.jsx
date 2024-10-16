/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { CAvatar, CDropdown, CDropdownDivider, CDropdownHeader, CDropdownItem, CDropdownMenu, CDropdownToggle, CSpinner } from '@coreui/react';
import { cilLockLocked, cilSettings, cilUser } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { useNavigate } from 'react-router-dom';
import clienteAxios from "../../config/axios";

const AppHeaderDropdown = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Estado de carga
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Estado del dropdown

  const handleLogout = async () => {
    setLoading(true); // Mostrar spinner de carga
    setIsDropdownOpen(true); // Mantener dropdown abierto
    try {
      await clienteAxios.post('/logout');
      localStorage.removeItem('token');
      navigate('/');
    } catch (error) {
      console.error("Error durante el cierre de sesión", error);
    } finally {
      setLoading(false); // Ocultar spinner de carga
      setIsDropdownOpen(false); // Cerrar dropdown al finalizar
    }
  };

  return (
    <CDropdown
      variant="nav-item"
      visible={isDropdownOpen} // Controla la visibilidad del dropdown
    >
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <CAvatar color="" size="md" className="me-2">
          <CIcon icon={cilUser} size="xl" />
        </CAvatar>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold my-2">Settings</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem onClick={handleLogout} disabled={loading}>
          {loading ? (
            <CSpinner size="sm" className="me-2" /> // Spinner de carga
          ) : (
            <CIcon icon={cilLockLocked} className="me-2" />
          )}
          Log Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;

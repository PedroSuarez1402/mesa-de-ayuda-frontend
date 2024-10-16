/* eslint-disable no-unused-vars */

import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilApplications, cilBell, cilSpeedometer, cilUser, cilHome, cilClipboard } from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const generateNav = () => {
    const navItems = [
        {
            component: CNavItem,
            name: 'Dashboard',
            to: '/dashboard',
            icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
            badge: {
                color: 'info',
            },
            
        },
        {
            component: CNavItem,
            name: 'Request',
            to: '/request',
            icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />
        }

    ]

    // Filtrar elementos no válidos (como el ítem 'Users' si no es admin)
    return navItems.filter(Boolean)
}

export default generateNav
import React from 'react'
import { CFooter, CLink } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
    
      <div>
      <CLink href='https://github.com/PedroSuarez1402/mesa-de-ayuda-frontend.git'>Repositorio Frontend</CLink>  
        <span className="ms-1">& </span> 
        <CLink href='https://github.com/jsaponte31/mesa-ayuda-backend.git'> Repositorio Backend </CLink>
        <span>Pedro Suarez, Valentina Caballero, Jhojan Aponte</span>
      </div>
      
      
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">
          CoreUI React Admin &amp; Dashboard Template
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)

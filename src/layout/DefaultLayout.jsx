/* eslint-disable no-unused-vars */
import React from 'react'
import {AppSidebar, AppHeader, AppContent, AppFooter} from '../components/index'

const DefaultLayout = () => {
  return (
    <div>
        <AppSidebar/>
        <div className='wrapper d-flex flex-column min-vh-100'>
            <AppHeader />
            <div className='body flex-grow-1'>
                <AppContent />
            </div>
            <AppFooter />
        </div>
    </div>
  )
}

export default DefaultLayout
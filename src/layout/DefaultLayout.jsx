import React from 'react'
import {AppSidebar, AppHeader, AppContent, AppFooter} from '../components/index'

const DefaultLayout = () => {
  return (
    <div>
        <AppSidebar/>
        <div>
            <AppHeader />
            <div>
                <AppContent />
            </div>
            <AppFooter />
        </div>
    </div>
  )
}

export default DefaultLayout
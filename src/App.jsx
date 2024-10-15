/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { Suspense, useEffect, useState } from 'react'
import {HashRouter, Route, Routes} from 'react-router-dom'
import { useSelector } from 'react-redux'

import { CSpinner, useColorModes } from '@coreui/react';
import './scss/style.scss'
import PrivateRoute from './components/PrivateRoute'

//contenedors
const DefaultLayout = React.lazy(()=>import('./layout/DefaultLayout'))
//paginas
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(()=> {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()){
      return
    }

    setColorMode(storedTheme)
  }, [])

  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className='pt-3 text-center'>
            <CSpinner color='primary' variant='grow'/>
          </div>
        }
      >
        <Routes>
          <Route exact path='/' name="Login" element={<Login/>}/>
          <Route exact path='/register' name="Register" element={<Register/>} />
          <Route path="*" name="home" element={
            <PrivateRoute>
              <DefaultLayout/>
            </PrivateRoute>}
          />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App

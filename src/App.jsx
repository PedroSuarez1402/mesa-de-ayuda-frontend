/* eslint-disable no-unused-vars */
import React, { Suspense, useState } from 'react'
import {HashRouter, Route, Routes} from 'react-router-dom'

import './scss/style.scss'
import PrivateRoute from './components/PrivateRoute'

//contenedors
const DefaultLayout = React.lazy(()=>import('./layout/DefaultLayout'))
//paginas
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))

const App = () => {
  
  return (
    <HashRouter>
      <Suspense>
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

/* eslint-disable no-unused-vars */
import React, { Suspense, useState } from 'react'
import {HashRouter, Route, Routes} from 'react-router-dom'

import './scss/style.scss'


const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))

function App() {
  
  return (
    <HashRouter>
      <Suspense>
        <Routes>
          <Route exact path='/' name="Login" element={<Login/>}/>
          <Route exact path='/register' name="Register" element={<Register/>} />
          <Route/>
          <Route/>
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App

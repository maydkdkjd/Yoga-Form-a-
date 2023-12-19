import React from 'react'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Homepage from './Pages/Homepage'
import {Route, Routes} from 'react-router-dom'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' exact Component={Login} />
        <Route path='/Signup' exact Component={Signup} />
        <Route path='/homepage' exact Component={Homepage} />
      </Routes>
    </>
  )
}

export default App
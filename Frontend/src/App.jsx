import React from 'react'
import Singup from './Components/Singup'
import Signin from './Components/Signin'
import Mainfile from './Components/Mainfile'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoutes from './Components/ProtectedRoutes'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <div>
      <ToastContainer position='top-center' autoClose={2000} />
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Singup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/' element={<ProtectedRoutes><Mainfile /></ProtectedRoutes>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
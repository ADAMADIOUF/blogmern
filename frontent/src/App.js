import React from 'react'
import{BrowserRouter,Routes,Route} from "react-router-dom"
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ForgotPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'
import PrivateRoute from './components/PrivateRoute'
import DashBoard from './pages/DashBoard'
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/resetpassword/:token' element={<ResetPassword />} />
        <Route path='' element={<PrivateRoute />}>
          <Route path='/dashboard' element={<DashBoard />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App

import { Routes, Route, NavLink } from "react-router-dom"
import './App.css'
import Navbar from "./components/navbar/NavBar"
import Home from "./pages/home/Home"
import Games from "./pages/games/Games"
import Profile from "./pages/profile/Profile"
import { Detail } from "./pages/detail/Detail"
import { Delete } from "./pages/delete/Delete"
import { Register } from "./pages/register/Register"
import { Login } from "./pages/login/Login"
import { Update } from "./pages/update/Update"
import { UpdateObservation } from "./pages/updateObservation/UpdateObservation"
import { DeleteObservation } from "./pages/deleteObservation/DeleteObservation"
import { UploadObservation } from "./pages/uploadObservation/UploadObservation"
import Footer from "./components/footer/Footer"
import ProtectedRoutes from './utils/ProtectedRoutes'

function App() {

  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route element={<ProtectedRoutes/>}>
          <Route path='/' element={<Home/>} />
          <Route path='/proyectos' element={<Games/>} />
          <Route path='/detalle/:id' element={<Detail/>} />
          <Route path='/actualizar/:id' element={<Update/>} />
          <Route path='/elimiar/:id' element={<Delete/>} />
          <Route path='/actualizarObservacion/:id' element={<UpdateObservation/>} />
          <Route path='/elimiarObservacion/:id' element={<DeleteObservation/>} />
          <Route path='/generarObservacion/:id' element={<UploadObservation/>} />
          <Route path='/perfil' element={<Profile/>} />
        </Route>
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='*' element={<h1>Not found</h1>} />
      </Routes>
      <Footer></Footer>
    </>
  )
}

export default App

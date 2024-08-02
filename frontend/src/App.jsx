import { Routes, Route, NavLink } from "react-router-dom"
import Navbar from "./components/navbar/NavBar"
import Footer from "./components/footer/Footer"
import { Register } from "./pages/register/Register"
import { Login } from "./pages/login/Login"
import Home from "./pages/home/Home"
import AvailableProjects from "./pages/projects/AvailableProjects"
import Profile from "./pages/profile/Profile"

import { DetailProject } from "./pages/projects/DetailProject"
import { DeleteProject } from "./pages/projects/DeleteProject"
import { UpdateProject } from "./pages/projects/UpdateProject"
import { UploadProject } from "./pages/projects/UploadProject"

import { UpdateObservation } from "./pages/observations/UpdateObservation"
import { DeleteObservation } from "./pages/observations/DeleteObservation"
import { UploadObservation } from "./pages/observations/UploadObservation"

import { ProjectsTable } from "./pages/admin/projects/ProjectsTable"
import { DeleteProjectAdmin } from "./pages/admin/projects/DeleteProjectAdmin"
import { UploadProjectAdmin } from "./pages/admin/projects/UploadProjectAdmin"
import { DetailProjectAdmin } from "./pages/admin/projects/DetailProjectAdmin"
import { UpdateProjectAdmin } from "./pages/admin/projects/UpdateProjectAdmin"
import { UsersTable } from "./pages/admin/users/UsersTable"
import { DeleteUser } from "./pages/admin/users/DeleteUser"
import { User } from "./pages/admin/users/User"
import { UploadUser } from "./pages/admin/users/UploadUser"
import { UpdateUser } from "./pages/admin/users/UpdateUser"

import ProtectedRoutes from './utils/ProtectedRoutes'

function App() {

  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route element={<ProtectedRoutes/>}>
          <Route path='/' element={<Home/>} />
          <Route path='/proyectos' element={<AvailableProjects/>} />
          <Route path='/detalle/:id' element={<DetailProject/>} />
          <Route path='/actualizarProyecto/:id' element={<UpdateProject/>} />
          <Route path='/elimiar/:id' element={<DeleteProject/>} />
          <Route path='/actualizarObservacion/:id' element={<UpdateObservation/>} />
          <Route path='/elimiarObservacion/:id' element={<DeleteObservation/>} />
          <Route path='/generarObservacion/:id' element={<UploadObservation/>} />
          <Route path='/generarProyecto' element={<UploadProject/>} />
          <Route path='/perfil' element={<Profile/>} />

          <Route path='/administracionProyectos' element={<ProjectsTable/>} />
          <Route path='/administracionUsuarios' element={<UsersTable/>} />
          <Route path='/elimiarUsuario/:id' element={<DeleteUser/>} />
          <Route path='/detalleUsuario/:id' element={<User/>} />
          <Route path='/editarUsuario/:id' element={<UpdateUser/>} />
          <Route path='/generarUsuario' element={<UploadUser/>} />
          <Route path='/elimiarAdministracion/:id' element={<DeleteProjectAdmin/>} />
          <Route path='/generarProyectoAdministracion' element={<UploadProjectAdmin/>} />
          <Route path='/detalleAdministracion/:id' element={<DetailProjectAdmin/>} />
          <Route path='/actualizarProyectoAdministracion/:id' element={<UpdateProjectAdmin/>} />

        </Route>
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='*' element={<h1>Página no encontrada</h1>} />
      </Routes>
      <Footer></Footer>
    </>
  )
}

export default App

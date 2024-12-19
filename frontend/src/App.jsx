import { Routes, Route, NavLink } from "react-router-dom"
import Navbar from "./components/navbar/NavBar"
import Footer from "./components/footer/Footer"
import { Register } from "./pages/register/Register"
import { RegisterAdmin } from "./pages/register/RegisterAdmin"
import { Login } from "./pages/login/Login"
import Home from "./pages/home/Home"
import AvailableProjects from "./pages/projects/AvailableProjects"
import Profile from "./pages/profile/Profile"
import SolicitudAmistadRecibida from "./pages/profile/SolicitudAmistadRecibida"
import SolicitudAmistadEnviada from "./pages/profile/SolicitudAmistadEnviada"
import SolicitudColaboracionRecibida from "./pages/profile/SolicitudColaboracionRecibida"
import SolicitudColaboracionEnviada from "./pages/profile/SolicitudColaboracionEnviada"

import { DetailProject } from "./pages/projects/DetailProject"
import { DeleteProject } from "./pages/projects/DeleteProject"
import { UpdateProject } from "./pages/projects/UpdateProject"
import { UploadProject } from "./pages/projects/UploadProject"

import { DetailProjectCerrado } from "./pages/projects/DetailProjectCerrado"
import { DetailProjectRemunerado } from "./pages/admin/projects/DetailProjectRemunerado"
import { ListTesters } from "./pages/admin/projects/ListTesters"
import { DetalleSolicitudTesteo } from "./pages/admin/projects/DetalleSolicitudTesteo.jsx"

import { UpdateObservation } from "./pages/observations/UpdateObservation"
import { DeleteObservation } from "./pages/observations/DeleteObservation"
import { UploadObservation } from "./pages/observations/UploadObservation"

import { ProjectsTable } from "./pages/admin/projects/ProjectsTable"
import { DeleteProjectAdmin } from "./pages/admin/projects/DeleteProjectAdmin"
import { UploadProjectAdmin } from "./pages/admin/projects/UploadProjectAdmin"
import { DetailProjectAdmin } from "./pages/admin/projects/DetailProjectAdmin"
import { UpdateProjectAdmin } from "./pages/admin/projects/UpdateProjectAdmin"
import { Remunerados } from "./pages/admin/projects/Remunerados"
import { UsersTable } from "./pages/admin/users/UsersTable"
import { DeleteUser } from "./pages/admin/users/DeleteUser"
import { User } from "./pages/admin/users/User"
import { AddUser } from "./pages/admin/users/AddUser"

import { UploadUser } from "./pages/admin/users/UploadUser"
import { UpdateUser } from "./pages/admin/users/UpdateUser"
import { UpdateUserProfile } from "./pages/profile/UpdateUserProfile"

import { SolicitudProyectoCerrado } from "./pages/projects/SolicitudProyectoCerrado"
import { AsignacionTesteo } from "./pages/admin/projects/AsignacionTesteo"

import { DetailProjectRemuneradoUser } from "./pages/projects/DetailProjectRemuneradoUser.jsx"

import ProtectedRoutes from './utils/ProtectedRoutes'

function App() {

  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route element={<ProtectedRoutes/>}>
          <Route path='/'                                       element={<Home/>} />
          <Route path='/proyectos'                              element={<AvailableProjects/>} />
          <Route path='/detalle/:id'                            element={<DetailProject/>} />
          <Route path='/cerradoDetalle/:id'                     element={<DetailProjectCerrado/>} />
          <Route path='/proyectoRemuneradoDetalle/:id'          element={<DetailProjectRemuneradoUser/>} />
          <Route path='/agregarCerrado/:id/:proyecto'           element={<SolicitudProyectoCerrado/>} />

          <Route path='/actualizarProyecto/:id'                 element={<UpdateProject/>} />
          <Route path='/elimiar/:id'                            element={<DeleteProject/>} />
          <Route path='/actualizarObservacion/:id'              element={<UpdateObservation/>} />
          <Route path='/elimiarObservacion/:id'                 element={<DeleteObservation/>} />
          <Route path='/generarObservacion/:id'                 element={<UploadObservation/>} />
          <Route path='/generarProyecto'                        element={<UploadProject/>} />
          <Route path='/perfil'                                 element={<Profile/>} />
          <Route path='/usuarioPerfilEditar/:id'                element={<UpdateUserProfile/>} />

          <Route path='/proyectosRemunerados'                   element={<Remunerados/>} />
          <Route path='/detalleRemunerado/:id'                  element={<DetailProjectRemunerado/>} />
          <Route path='/testersDisponibles/:id'                 element={<ListTesters/>} />
          <Route path='/asignarTesteo/:id/:proyecto'            element={<AsignacionTesteo/>} />
          <Route path='/detalleSolicitudTesteo/:id'            element={<DetalleSolicitudTesteo/>} />

          <Route path='/administracionProyectos'                element={<ProjectsTable/>} />
          <Route path='/administracionUsuarios'                 element={<UsersTable/>} />
          <Route path='/elimiarUsuario/:id'                     element={<DeleteUser/>} />
          <Route path='/detalleUsuario/:id'                     element={<User/>} />
          <Route path='/generarSolicitudAmistad/:id'            element={<AddUser/>} />
          <Route path='/solicitudAmistadRecibida/:id'           element={<SolicitudAmistadRecibida/>} />
          <Route path='/SolicitudAmistadEnviada/:id'            element={<SolicitudAmistadEnviada/>} />
          <Route path='/solicitudAmistadRecibida/:id'           element={<SolicitudAmistadRecibida/>} />
          <Route path='/SolicitudAmistadEnviada/:id'            element={<SolicitudAmistadEnviada/>} />
          <Route path='/SolicitudColaboracionRecibida/:id'      element={<SolicitudColaboracionRecibida/>} />
          <Route path='/SolicitudColaboracionEnviada/:id'       element={<SolicitudColaboracionEnviada/>} />

          <Route path='/editarUsuario/:id'                      element={<UpdateUser/>} />
          <Route path='/generarUsuario'                         element={<UploadUser/>} />
          <Route path='/elimiarAdministracion/:id'              element={<DeleteProjectAdmin/>} />
          <Route path='/generarProyectoAdministracion'          element={<UploadProjectAdmin/>} />
          <Route path='/detalleAdministracion/:id'              element={<DetailProjectAdmin/>} />
          <Route path='/actualizarProyectoAdministracion/:id'   element={<UpdateProjectAdmin/>} />

        </Route>
        <Route path='/register'       element={<Register/>} />
        <Route path='/registerAdmin'  element={<RegisterAdmin/>} />
        <Route path='/login'          element={<Login/>} />
        <Route path='*'               element={<h1 className="container">Página no encontrada</h1>} />
      </Routes>
      <Footer></Footer>
    </>
  )
}

export default App

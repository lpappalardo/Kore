import React, { useContext, useState } from 'react'
import { ApiContext } from '../../context/ApiContext'
import { PersonalProyects } from "../../components/proyects/PersonalProyects"
import { Observations } from "../../components/observations/Oservations"
import { Solicitudes } from "../../components/solicitudes/Solicitudes"
import { Friends } from "../../components/friends/Friends"

import axios from "axios"
import {useNavigate} from "react-router-dom"
import { AuthContext } from '../../context/AuthContext/'
import { Link } from 'react-router-dom'
import { updateTabTitle } from '../../utils/updateTabTitle'
import { useProjects } from '../../hooks/useProjects'
import { useObservations } from '../../hooks/useObservations'
import { useSolicitudes } from '../../hooks/useSolicitudes'
import { useUsers } from '../../hooks/useUsers'

export const Profile = () => {

  updateTabTitle('Perfil')

  const {mappedPublicados, setProjects} = useProjects()
  const {mappedOservaciones, setObservations} = useObservations()
  const {mappedSolicitudes, setSolicitudes} = useSolicitudes()

  const {user} = useContext(AuthContext)

  const {usuariosCargados} = useUsers()
  // console.log(usuariosCargados)

  const publicadosUsuario = mappedPublicados.filter((publicado) => publicado.userId == user._id)

  const observacionesUsuario = mappedOservaciones.filter((observacion) => observacion.userId == user._id)

  const solicitudesUsuario = mappedSolicitudes.filter((solicitud) => solicitud.userGenerator == user._id || solicitud.userReceptor == user._id)

  const solicitudesAceptadas = solicitudesUsuario.filter((solicitud) => solicitud.estado == "aceptada")
  console.log(solicitudesAceptadas)
  const receptoresAceptados = solicitudesAceptadas.map((aceptada) => aceptada.userReceptor)
  const generadoresAceptados = solicitudesAceptadas.map((aceptada) => aceptada.userGenerator)

  const amigosUsuario = usuariosCargados.filter((usuario) => receptoresAceptados.includes(usuario.id) || generadoresAceptados.includes(usuario.id))
  const amigosSinUsuario = amigosUsuario.filter((usuario) => usuario.id != user._id)

  return (
    <>
    {
      <main>
        <section className='perfil container'>
          <h1>Mi Perfil</h1>
          <div className='perfil-personal'> 

            <div class='perfil-personal-imagen'>
              <img src="../../../src/assets/img/logoGrande.png" alt="Imagen Perfil" />
            </div>
        
              <div class='perfil-personal-datos'>

                <div className='elementoPerfil'>
                  <h2>Nombre de usuario</h2>
                  <p className='perfil-personal-datos-contenido'>{user.username}</p>
                </div>

                <div className='elementoPerfil'>
                  <h2>Correo de usuario</h2>
                  <p className='perfil-personal-datos-contenido'>{user.email}</p>
                </div>

                <Link className='botonPrincipal' to={`/usuarioPerfilEditar`}>Editar Perfil</Link>

              </div>

            </div>
        </section>

        <section className='publicaciones container interraccionPerfil'>
          <h2>Mis notificaciones</h2>
          <Solicitudes solicitudes={solicitudesUsuario} />
        </section>

        <section className='publicaciones container interraccionPerfil'>
                <h2>Proyectos Subidos</h2>
                <Link className='botonPrincipal' to={`/generarProyecto`}>Generar Proyecto</Link>
                <PersonalProyects proyects={publicadosUsuario} />
        </section>

        <section className='publicaciones container interraccionPerfil'>
          <h2>Proyectos invitados</h2>
	          <div>
              <p>
                En este momento no te invitaron a ningun proyecto
              </p>
	          </div>
        </section>

        <section className='publicaciones container interraccionPerfil'>
                <h2>Observaciones Realizadas</h2>
                <Observations observations={observacionesUsuario} />
        </section>

        <section className='publicaciones container interraccionPerfil'>
          <h2>Mis amigos</h2>
          <Friends friends={amigosSinUsuario}/>
        </section>

      </main>
    }
    </>
  )
}

export default Profile
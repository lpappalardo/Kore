import React from 'react'
import { useParams } from 'react-router-dom'
import { updateTabTitle } from '../../../utils/updateTabTitle'
import { useUser } from '../../../hooks/useUser'
import { Link } from 'react-router-dom'

import { useProjects } from '../../../hooks/useProjects'
import { useObservations } from '../../../hooks/useObservations'
import { useSolicitudes } from '../../../hooks/useSolicitudes'

import { PersonalProyects } from "../../../components/proyects/PersonalProyects"
import { Observations } from "../../../components/observations/Oservations"

import { useUsers } from '../../../hooks/useUsers'
import { Friends } from "../../../components/friends/Friends"


const User = () => {

  updateTabTitle('Eliminar Usuario')

  const params = useParams()
  const usuarioId = params.id

  const {usuarioCargado} = useUser(usuarioId)

  const {mappedPublicados, setProjects} = useProjects()
  const {mappedOservaciones, setObservations} = useObservations()
  const {mappedSolicitudes, setSolicitudes} = useSolicitudes()

  const {usuariosCargados} = useUsers()

  // console.log(usuarioCargado)

  const publicadosUsuario = mappedPublicados.filter((publicado) => publicado.userId == usuarioCargado.id)

  const observacionesUsuario = mappedOservaciones.filter((observacion) => observacion.userId == usuarioCargado.id)
  // console.log(observacionesUsuario)

  // usuarioCargado && (console.log(usuarioCargado.id))

  const solicitudesUsuario = mappedSolicitudes.filter((solicitud) => solicitud.userGenerator == usuarioId || solicitud.userReceptor == usuarioId)

  const solicitudesAceptadas = solicitudesUsuario.filter((solicitud) => solicitud.estado == "aceptada")
  console.log(solicitudesAceptadas)
  const receptoresAceptados = solicitudesAceptadas.map((aceptada) => aceptada.userReceptor)
  const generadoresAceptados = solicitudesAceptadas.map((aceptada) => aceptada.userGenerator)

  const amigosUsuario = usuariosCargados.filter((usuario) => receptoresAceptados.includes(usuario.id) || generadoresAceptados.includes(usuario.id))
  const amigosSinUsuario = amigosUsuario.filter((usuario) => usuario.id != usuarioId)

  return (
    <>
    {usuarioCargado && (
    <main>

        <section className='perfil container'>
          <h1>Perfil de {usuarioCargado.username}</h1>
          <div className='perfil-personal'> 

            <div class='perfil-personal-imagen'>
              <img src="../../../src/assets/img/logoGrande.png" alt={usuarioCargado.username}  />
            </div>
        
              <div class='perfil-personal-datos'>

                <div className='elementoPerfil'>
                  <h2>Nombre de usuario</h2>
                  <p className='perfil-personal-datos-contenido'>{usuarioCargado.username}</p>
                </div>

                <div className='elementoPerfil'>
                  <h2>Correo de usuario</h2>
                  <p className='perfil-personal-datos-contenido'>{usuarioCargado.email}</p>
                </div>

                <Link className='botonPrincipal margenInferior' to={`/generarSolicitudAmistad/${usuarioCargado.id}`}>Enviar solicitud de amistad</Link>

                {/* <Link className='botonPrincipal' to={`/usuarioPerfilEditar`}>Editar Perfil</Link> */}

              </div>

            </div>
      </section>

      <section className='publicaciones container interraccionPerfil'>
        <h2>Proyectos Subidos por {usuarioCargado.username}</h2>
        <PersonalProyects proyects={publicadosUsuario} />
      </section>

      <section className='publicaciones container interraccionPerfil'>
        <h2>Observaciones Realizadas por {usuarioCargado.username}</h2>
        <Observations observations={observacionesUsuario} />
      </section>

      <section className='publicaciones container interraccionPerfil'>
          <h2>Amigos de {usuarioCargado.username}</h2>
	        <Friends friends={amigosSinUsuario}/>
      </section>

    </main>
    )}
    </>
  )
}

export {User}

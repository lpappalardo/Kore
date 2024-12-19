import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ApiContext } from '../../context/ApiContext'
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { AuthContext } from '../../context/AuthContext/'
import { Link } from 'react-router-dom'
import { updateTabTitle } from '../../utils/updateTabTitle'
import { useProjects } from '../../hooks/useProjects'
import { useObservations } from '../../hooks/useObservations'
import { OnservationProject } from './ObservationProject'
import { useSolicitudes } from '../../hooks/useSolicitudes'
import { Friends } from "../../components/friends/Friends"
import { PosiblesParticipantes } from "../../components/friends/PosiblesParticipantes"

// import { useUser } from '../../hooks/useUser'

import { useUsers } from '../../hooks/useUsers'

const DetailProjectRemuneradoUser = () => {

  updateTabTitle('Proyecto')

  const params = useParams()
  const detalleId = params.id

  const {user} = useContext(AuthContext)

  const {mappedPublicados} = useProjects()
  const {mappedOservaciones} = useObservations()
  const {usuariosCargados} = useUsers()
  const {mappedSolicitudes, setSolicitudes} = useSolicitudes()

  let usuarioId = user._id

  let detallePublicado = mappedPublicados.filter(project => (project.id == detalleId))[0]

//   let idPublicado = detallePublicado.id

  let detalleOservaciones = mappedOservaciones.filter(observacion => (observacion.idProject == detalleId))

  let hasObservations = detalleOservaciones?.length > 0

  let observacionUsuario = mappedOservaciones.filter(observacion => (observacion.userId == usuarioId && observacion.idProject == detalleId))
  
  let realizoObservacion = observacionUsuario?.length > 0

  let sortedOservaciones = detalleOservaciones.slice().sort((a,b)=>Number(a.userId != user._id)-Number(b.userId != user._id))

  let detallePublicadoUsuario = usuariosCargados.filter(user => (user.id == detallePublicado.userId))[0]


  const solicitudesRemunerado = mappedSolicitudes.filter((solicitud) => solicitud.categoria == "Remunerado")
  const remuneradasAceptadas = solicitudesRemunerado.filter((solicitud) => solicitud.estado == "aceptada")
  const remuneradasAceptadasProyecto = remuneradasAceptadas.filter((solicitud) => solicitud.idProyecto == detalleId)

  const receptoresRemuneradoAceptados = remuneradasAceptadasProyecto.map((aceptada) => aceptada.userReceptor)
  const colaboradoresUsuario = usuariosCargados.filter((usuario) => receptoresRemuneradoAceptados.includes(usuario.id))




  // const solicitudesAmistad = mappedSolicitudes.filter((solicitud) => solicitud.categoria == "Amistad")

  // const solicitudesUsuario = solicitudesAmistad.filter((solicitud) => solicitud.userGenerator == user._id || solicitud.userReceptor == user._id)

  // const solicitudesAceptadas = solicitudesUsuario.filter((solicitud) => solicitud.estado == "aceptada")

  // const receptoresAceptados = solicitudesAceptadas.map((aceptada) => aceptada.userReceptor)
  // const generadoresAceptados = solicitudesAceptadas.map((aceptada) => aceptada.userGenerator)

  // const amigosUsuario = usuariosCargados.filter((usuario) => receptoresAceptados.includes(usuario.id) || generadoresAceptados.includes(usuario.id))

  // const solamenteAmigos = amigosUsuario.filter((usuario) => usuario.id != user._id)

  // const amigosSinUsuario = solamenteAmigos.filter((usuario) => !(colaboradoresUsuario.includes(usuario.id)))

  const navigate = useNavigate()
    
    const [error, setError] = useState("")

const handleAcept = (e, id) => {
    e.preventDefault()
    axios.put(`http://localhost:3000/proyectos/aceptarRemunerado/${detalleId}`)
    .then((res) => {
      console.log(res)
      navigate('/proyectosRemunerados')
      toast.success('Se ha aceptado el proyecto con éxito!');
    })
    .catch((error) => {
      setError(error.respose.data.message)
      console.log(error)
      toast.error('Error al aceptar la solicitud');
    })
  }

  const handleReject = (e, id) => {
    e.preventDefault()
    axios.put(`http://localhost:3000/proyectos/rechazarRemunerado/${detalleId}`)
    .then((res) => {
      console.log(res)
      navigate('/proyectosRemunerados')
      toast.success('Se ha rechazado el proyecto con éxito!');
    })
    .catch((error) => {
      setError(error.respose.data.message)
      console.log(error)
      toast.error('Error al rechazar la solicitud');
    })
  }

  return (
    <>
    {
      <main>
        {(detallePublicado && detallePublicadoUsuario) && (

            <div>
            <section className='detalle container'>
            <img src="../../../src/assets/img/logoGrande.png" alt={detallePublicado.title} />
            <div className='contenido'>
             <h1>{detallePublicado.title}</h1>

            <p>Publicación: {detallePublicado.fecha}</p>
            <p>{detallePublicado.description}</p>

        <h2>Géneros</h2>
        <ul className='listaGeneros'>
        {detallePublicado.categorias.map(categoria => 
            <li className='genero'>{categoria}</li>
          )}
  </ul>
  <h2>Tecnologías</h2>
  <ul className='listaGeneros'>
  {detallePublicado.tecnologias.map(tecnolgia => 
      <li className='genero'>{tecnolgia}</li>
    )}
  </ul>

  <h2>Publicado por:</h2>
  {
    (detallePublicadoUsuario.id == user._id ) ?
      <Link to={`/perfil/`}>{detallePublicadoUsuario.username}</Link>
      : <Link to={`/detalleUsuario/${detallePublicadoUsuario.id}`}>{detallePublicadoUsuario.username}</Link>
  }

  <h2>Enlace de descarga</h2>
  <p className='enlaceDescarga'>{detallePublicado.enlace}</p>
</div>
</section>    

            {
            (detallePublicado.estado == "inactivo" || detallePublicado.estado == "rechazado") ? 
              <>
                <p>El proyecto en este momento se encuentra inhabilitado una vez que lo habilite un administrador podrá asignarle el proyecto a los tester correspondientes</p>
              </>
              : 
              <>
                        <section className='publicaciones container interraccionPerfil'>
                            <h2>Participantes del proyecto</h2>
                            <Friends friends={colaboradoresUsuario}/>
                        </section>
                
                        {detalleOservaciones && detallePublicado && (
                        <section className='generar-observacion container'>
                          <h2>Observaciones Realizadas</h2>
                        {/* {
                          (detallePublicado.userId != usuarioId && !realizoObservacion) ?
                          <Link className='botonPrincipal' to={`/generarObservacion/${detalleId}`}>Generar Observación</Link>
                          : <></>
                        } */}
                
                
                
                          {    
                            hasObservations
                               ? <ul className="observations">
                               {
                                   sortedOservaciones.map(observation => (
                                        <OnservationProject observationProject={observation}/>
                                   ))
                               }
                           </ul>
                               : <p className='comment'>En este momento no hay observaciones realizadas en este proyecto.</p>
                          }
                        </section>
                        )}

              </>
            }

        </div>
      )}
      </main>
    }
    </>
  )
}

export {DetailProjectRemuneradoUser}
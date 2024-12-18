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

// import { useUser } from '../../hooks/useUser'

import { useUsers } from '../../hooks/useUsers'

const DetailProject = () => {

  updateTabTitle('Proyecto')

  const params = useParams()
  const detalleId = params.id

  const {user} = useContext(AuthContext)

  const {mappedPublicados} = useProjects()
  const {mappedOservaciones} = useObservations()
  const {usuariosCargados} = useUsers()

  let usuarioId = user._id

  let detallePublicado = mappedPublicados.filter(project => (project.id == detalleId))[0]

  console.log(detallePublicado)
  let detalleOservaciones = mappedOservaciones.filter(observacion => (observacion.idProject == detalleId))

  let hasObservations = detalleOservaciones?.length > 0

  let observacionUsuario = mappedOservaciones.filter(observacion => (observacion.userId == usuarioId && observacion.idProject == detalleId))
  
  let realizoObservacion = observacionUsuario?.length > 0

  let sortedOservaciones = detalleOservaciones.slice().sort((a,b)=>Number(a.userId != user._id)-Number(b.userId != user._id))

  let detallePublicadoUsuario = usuariosCargados.filter(user => (user.id == detallePublicado.userId))[0]

  return (
    <>
    {
      <main>
        {(detallePublicado && detallePublicadoUsuario) && (
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
        )}

        {detalleOservaciones && detallePublicado && (
        <section className='generar-observacion container'>
          <h2>Observaciones Realizadas</h2>
        {
          (detallePublicado.userId != usuarioId && !realizoObservacion) ?
          <Link className='botonPrincipal' to={`/generarObservacion/${detalleId}`}>Generar Observación</Link>
          : <></>
        }



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
      </main>
    }
    </>
  )
}

export {DetailProject}
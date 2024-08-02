import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ApiContext } from '../../context/ApiContext'
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { AuthContext } from '../../context/AuthContext/'
import { Link } from 'react-router-dom'
import { TabTitle } from '../../utils/TabTitle'
import { useProjects } from '../../hooks/useProjects'
import { useObservations } from '../../hooks/useObservations'

const DetailProject = () => {

  TabTitle('Proyecto')

  const params = useParams()
  const detalleId = params.id

  const {user} = useContext(AuthContext)

  const {mappedPublicados} = useProjects()
  const {mappedOservaciones} = useObservations()

  let usuarioId = user._id

  let detallePublicado = mappedPublicados.filter(project => (project.id == detalleId))[0]
  let detalleOservaciones = mappedOservaciones.filter(observacion => (observacion.idProject == detalleId))

  let hasObservations = detalleOservaciones?.length > 0

  let observacionUsuario = mappedOservaciones.filter(observacion => (observacion.userId == usuarioId && observacion.idProject == detalleId))
  
  let realizoObservacion = observacionUsuario?.length > 0


  return (
    <>
    {
      <main>
        {detallePublicado && (
        <section className='detalle container'>
          <img src="../../../src/assets/img/logoGrande.png" alt={detallePublicado.title} />
          <div className='contenido'>
            <h1>{detallePublicado.title}</h1>
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
            <button className='botonPrincipal'>Descargar</button>
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
                   detalleOservaciones.map(observation => (
                       <li className="observation-card" key={observation.id}>
                        <div className='observation-user'>
                          <img src="../src/assets/img/logoGrande.png" alt="Usuario" />
                          <p className='observation-user-name'>{observation.name}</p>
                        </div>
                        <div className='observation-content'>
                        {
                             observation.arte && 
                             <div>
                               <p className='titleObservation'>Arte</p>
                               <p className='contentObservation'>{observation.arte}</p>
                             </div>
                           }
                           {
                             observation.tecnico && 
                             <div>
                               <p className='titleObservation'>Técnico</p>
                               <p className='contentObservation'>{observation.tecnico}</p>
                             </div>
                           }
                           {
                             observation.disenio &&
                             <div>
                               <p className='titleObservation'>Diseñio</p>
                               <p className='contentObservation'>{observation.disenio}</p>
                             </div>
                           }
                           <div>
                               <p className='titleObservation'>Generales</p>
                               <p className='contentObservation'>{observation.generales}</p>
                           </div>
                           {
                            observation.userId == usuarioId ?
                              <div className="contenedor-links-horizontal">
                              <Link className='botonPrincipal' to={`/actualizarObservacion/${observation.id}`}>Editar</Link>
                              <Link className='botonDanger' to={`/elimiarObservacion/${observation.id}`}>Eliminar</Link>
                            </div>
                            : <></>
                           }
                           
                        </div>
                       </li>
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
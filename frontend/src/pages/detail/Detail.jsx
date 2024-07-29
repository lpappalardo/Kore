import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ApiContext } from '../../context/ApiContext'
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { AuthContext } from '../../context/AuthContext/'
import { Link } from 'react-router-dom'

export const Detail = () => {
  const params = useParams()
  const detalleId = params.id

  const {user} = useContext(AuthContext)
  console.log(user)
  console.log(user.id)


  const {mappedPublicados, mappedOservaciones} = useContext(ApiContext)

  const detallePublicado = mappedPublicados.filter(project => (project.id == detalleId))[0]
  const detalleOservaciones = mappedOservaciones.filter(observacion => (observacion.idProject == detalleId))

  const usuarioId = user.id
  console.log(usuarioId)

  const oservacionesUsuario = mappedOservaciones.filter(observacion => (observacion.userId == usuarioId))[0]
  

  const hasObservations = detalleOservaciones?.length > 0
  const realizoObservacion = oservacionesUsuario?.length > 0

  return (
    <>
    {
      <div>
        <section className='detalle container'>
          <img src="../../../src/assets/img/logoGrande.png" alt={detallePublicado.title} />
          <div className='contenido'>
            <h2>{detallePublicado.title}</h2>
            <p>{detallePublicado.description}</p>

            <h3>Géneros</h3>
            <ul className='listaGeneros'>
            {detallePublicado.categorias.map(categoria => 
                <li className='genero'>{categoria}</li>
              )}
            </ul>
            <h3>Tecnologías</h3>
            <ul className='listaGeneros'>
            {detallePublicado.tecnologias.map(tecnolgia => 
                <li className='genero'>{tecnolgia}</li>
              )}
            </ul>
            <button className='botonPrincipal'>Descargar</button>
          </div>
        </section>

        <section className='generar-observacion container'>
          <h3>Observaciones Realizadas</h3>
        {
          detallePublicado.userId != usuarioId ?
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
                          <h3>{observation.name}</h3>
                        </div>
                        <div className='observation-content'>
                        {
                             observation.arte && 
                             <div>
                               <h4>Arte</h4>
                               <p>{observation.arte}</p>
                             </div>
                           }
                           {
                             observation.tecnico && 
                             <div>
                               <h4>Técnico</h4>
                               <p>{observation.tecnico}</p>
                             </div>
                           }
                           {
                             observation.disenio &&
                             <div>
                               <h4>Diseñio</h4>
                               <p>{observation.disenio}</p>
                             </div>
                           }
                           <div>
                               <h4>Generales</h4>
                               <p>{observation.generales}</p>
                           </div>
                           {
                            observation.userId == usuarioId ?
                              <div className="contenedor-links-horizontal">
                              <Link className='botonPrincipal' to={`/actualizarObservacion/${observation.id}`}>Editar</Link>
                              <Link className='botonPrincipal' to={`/elimiarObservacion/${observation.id}`}>Eliminar</Link>
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
      </div>
    }
    </>
  )
}
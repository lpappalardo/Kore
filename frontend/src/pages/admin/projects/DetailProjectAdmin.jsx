import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { AuthContext } from '../../../context/AuthContext/'
import { Link } from 'react-router-dom'
import { updateTabTitle } from '../../../utils/updateTabTitle'
import { useProjects } from '../../../hooks/useProjects'
import { useObservations } from '../../../hooks/useObservations'

const DetailProjectAdmin = () => {

  updateTabTitle('Proyecto')

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
      </main>
    }
    </>
  )
}

export {DetailProjectAdmin}
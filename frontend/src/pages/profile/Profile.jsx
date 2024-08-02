import React, { useContext, useState } from 'react'
import { ApiContext } from '../../context/ApiContext'
import { PersonalProyects } from "../../components/proyects/PersonalProyects"
import { Observations } from "../../components/observations/Oservations"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { AuthContext } from '../../context/AuthContext/'
import { Link } from 'react-router-dom'
import { TabTitle } from '../../utils/TabTitle'
import { useProjects } from '../../hooks/useProjects'
import { useObservations } from '../../hooks/useObservations'

export const Profile = () => {

  TabTitle('Perfil')

  const {mappedPublicados, setProjects} = useProjects()
  const {mappedOservaciones, setObservations} = useObservations()
  // const {mappedPublicados, mappedOservaciones} = useContext(ApiContext)

  const {user} = useContext(AuthContext)

  const publicadosUsuario = mappedPublicados.filter((publicado) => publicado.userId == user._id)

  const observacionesUsuario = mappedOservaciones.filter((observacion) => observacion.userId == user._id)

  console.log(user)

  return (
    <>
    {
      <main>
        <section className='perfil container'>
          <h1>Perfil</h1>
          <div className='contenidoPerfil'>
            <img src="../../../src/assets/img/logoGrande.png" alt="Imagen Perfil" />
            <div className='elementoPerfil'>
              <h2>Nombre de Usuario</h2>
              <p>{user.username}</p>
            </div>
          </div>
        </section>
        <section className="publicaciones container">
                <h2>Proyectos Subidos</h2>
                <Link className='botonPrincipal' to={`/generarProyecto`}>Generar Proyecto</Link>
                <PersonalProyects proyects={publicadosUsuario} />
        </section>
        <section className="publicaciones container">
                <h2>Observaciones Realizadas</h2>
                <Observations observations={observacionesUsuario} />
        </section>
      </main>
    }
    </>
  )
}

export default Profile
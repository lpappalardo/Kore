import React, { useContext, useState } from 'react'
import { ApiContext } from '../../context/ApiContext'
import { PersonalProyects } from "../../components/proyects/PersonalProyects"
import { Observations } from "../../components/observations/Oservations"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { AuthContext } from '../../context/AuthContext/'
import { Link } from 'react-router-dom'
import { updateTabTitle } from '../../utils/updateTabTitle'
import { useProjects } from '../../hooks/useProjects'
import { useObservations } from '../../hooks/useObservations'

export const Profile = () => {

  updateTabTitle('Perfil')

  const {mappedPublicados, setProjects} = useProjects()
  const {mappedOservaciones, setObservations} = useObservations()

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
            <div>
            <div className='elementoPerfil'>
              <h2>Nombre de usuario</h2>
              <p>{user.username}</p>
            </div>
            <div className='elementoPerfil'>
              <h2>Correo de usuario</h2>
              <p>{user.email}</p>
            </div>
            {/* <Link className='botonPrincipal' to={`/usuarioPerfilEditar`}>Editar Perfil</Link> */}
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
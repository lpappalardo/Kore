import React, { useContext, useState } from 'react'
import { ApiContext } from '../../context/ApiContext'
import { PersonalProyects } from "../../components/proyects/PersonalProyects"
import { Observations } from "../../components/observations/Oservations"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { AuthContext } from '../../context/AuthContext/'
import { Link } from 'react-router-dom'

export const Profile = () => {

  const {mappedPublicados, mappedOservaciones} = useContext(ApiContext)

  const {user} = useContext(AuthContext)

  const publicadosUsuario = mappedPublicados.filter((publicado) => publicado.userId == user.id)

  const observacionesUsuario = mappedOservaciones.filter((observacion) => observacion.userId == user.id)

  console.log(user)

  return (
    <>
    {
      <div>
        <section className='perfil container'>
          <h2>Perfil</h2>
          <div className='contenidoPerfil'>
            <img src="../../../src/assets/img/logoGrande.png" alt="Imagen Perfil" />
            <div className='elementoPerfil'>
              <h3>Nombre de Usuario</h3>
              <p>{user.name}</p>
            </div>
          </div>
        </section>
        <section className="publicaciones container">
                <h3>Proyectos Subidos</h3>
                <Link className='botonPrincipal' to={`/generarProyecto`}>Generar Proyecto</Link>
                <PersonalProyects proyects={publicadosUsuario} />
        </section>
        <section className="publicaciones container">
                <h3>Observaciones Realizadas</h3>
                <Observations observations={observacionesUsuario} />
        </section>
      </div>
    }
    </>
  )
}

export default Profile
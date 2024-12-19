import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ApiContext } from '../../context/ApiContext'
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { AuthContext } from '../../context/AuthContext/'
import { updateTabTitle } from '../../utils/updateTabTitle'
import {toast} from "sonner";
import { useSolicitudes } from '../../hooks/useSolicitudes'

import { useUsers } from '../../hooks/useUsers'

export const SolicitudColaboracionEnviada = () => {

  updateTabTitle('Solicitud Colaboración Enviada')

  const params = useParams()
  const detalleId = params.id

  const {mappedSolicitudes, setSolicitudes} = useSolicitudes()

  let detalleSolicitud = mappedSolicitudes.filter(solicitud => (solicitud.id == detalleId))[0]
  console.log(detalleSolicitud)

  const {user} = useContext(AuthContext)

  const {usuariosCargados} = useUsers()

  let usuarioCargado = usuariosCargados.filter(user => (user.id == detalleSolicitud.userReceptor))[0]
//   console.log(usuariosCargados)

  return (
    <>
    
      {usuarioCargado && (
      <main className='seccion container'>
   
        <section className='perfil container'>
            <h1>Solicitud de colaboración enviada a {usuarioCargado.username}</h1>

            <p>Enviada en: {detalleSolicitud.fecha}</p>
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
        
            </div>
        
            </div>

        </section>

            
      </main>
    )}
    </>
  )
}

export default SolicitudColaboracionEnviada
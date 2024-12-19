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

export const SolicitudColaboracionRecibida = () => {

  updateTabTitle('Solicitud Colaboración Recibida')

  const params = useParams()
  const detalleId = params.id

  const {mappedSolicitudes, setSolicitudes} = useSolicitudes()

  let detalleSolicitud = mappedSolicitudes.filter(solicitud => (solicitud.id == detalleId))[0]
  console.log(detalleSolicitud)

  const {user} = useContext(AuthContext)

  const {usuariosCargados} = useUsers()

  let usuarioCargado = usuariosCargados.filter(user => (user.id == detalleSolicitud.userGenerator))[0]
//   console.log(usuariosCargados)

    const navigate = useNavigate()
    
    const [error, setError] = useState("")

const handleAcept = (e, id) => {
    e.preventDefault()
    axios.put(`http://localhost:3000/solicitudes/aceptarSolicitud/${detalleId}`)
    .then((res) => {
      console.log(res)
      navigate('/proyectos')
      toast.success('Se ha aceptado la solicitud con éxito!');
    })
    .catch((error) => {
      setError(error.respose.data.message)
      console.log(error)
      toast.error('Error al aceptar la solicitud');
    })
  }

  const handleReject = (e, id) => {
    e.preventDefault()
    axios.put(`http://localhost:3000/solicitudes/rechazarSolicitud/${detalleId}`)
    .then((res) => {
      console.log(res)
      navigate('/proyectos')
      toast.success('Se ha rechazado la solicitud con éxito!');
    })
    .catch((error) => {
      setError(error.respose.data.message)
      console.log(error)
      toast.error('Error al rechazar la solicitud');
    })
  }


  return (
    <>
    
      {usuarioCargado && (
      <main className='seccion container'>
   
        <section className='perfil container'>
            <h1>¿Desea aceptar la solicitud de colaboración enviada por {usuarioCargado.username}?</h1>

            <p>Recibido en: {detalleSolicitud.fecha}</p>            
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

                {/* <Link className='botonPrincipal margenInferior' onClick={(e) => handleAcept(e)}>Aceptar solicitud de amistad</Link> */}
        
            </div>
        
            </div>

            <button
            onClick={(e) => handleAcept(e, detalleId)}
            className='botonPrincipal'
            >
                Aceptar solicitud de colaboración
            </button>

            <button
            onClick={(e) => handleReject(e, detalleId)}
            className='botonDanger'
            >
                Rechazar solicitud de colaboración
            </button>

        </section>

            
      </main>
    )}
    </>
  )
}

export default SolicitudColaboracionRecibida
// export {SolicitudAmistadRecibida}
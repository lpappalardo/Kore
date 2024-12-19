import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { AuthContext } from '../../../context/AuthContext/'
import { updateTabTitle } from '../../../utils/updateTabTitle'
import {toast} from "sonner";
import { useSolicitudes } from '../../../hooks/useSolicitudes'

import { useUsers } from '../../../hooks/useUsers'

export const AsignacionTesteo = () => {

  updateTabTitle('Asignación Testeo')

  const {mappedSolicitudes, setSolicitudes} = useSolicitudes()
  const {user} = useContext(AuthContext)

  const {usuariosCargados} = useUsers()

    const params = useParams()
    const usuarioDestino = params.id
    const proyecto = params.proyecto 
    
    let usuarioGenerador = user._id
  
    const [time, setTime] = useState(new Date);
        
    let anio = time.getFullYear();
    let mes = time.getMonth() + 1;
    let dia = time.getDate();
        
    let fecha = dia + "/" + mes + "/" + anio;
    let fechaAbsoluta = anio * 10000 + mes * 100 + dia;

//   let detalleSolicitud = mappedSolicitudes.filter(solicitud => (solicitud.id == proyecto))[0]
//   console.log(detalleSolicitud)


  let usuarioCargado = usuariosCargados.filter(user => (user.id == usuarioDestino))[0]


    const [testeoData, setTesteoData] = useState({
      userGenerator: usuarioGenerador,
      userReceptor: usuarioDestino,
      fecha: fecha,
      fechaAbsoluta: fechaAbsoluta,
      categoria: "Remunerado",
      idProyecto: proyecto,
      estado: "aceptada",
    })

const [error, setError] = useState("")

const navigate = useNavigate()


const handleAsign = (e) => {
  e.preventDefault()

  axios.post("http://localhost:3000/solicitudes/", testeoData)
        .then((res) => {
        console.log(res)
        navigate('/proyectosRemunerados')
        toast.success('El usuario ha sido asignado!');
  })
  .catch((error) => {
      setError(error.respose.data.message)
      console.log(error)
  }) 
}


  return (
    <>
    
      {usuarioCargado && (
      <main className='seccion container'>
   
        <section className='perfil container'>
            <h1>¿Desea asignar al usuario {usuarioCargado.username} al testeo?</h1>
          
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

            <button
            onClick={(e) => handleAsign(e)}
            className='botonPrincipal'
            >
                Confirmar asignación de testeo
            </button>


        </section>

            
      </main>
    )}
    </>
  )
}

export default AsignacionTesteo
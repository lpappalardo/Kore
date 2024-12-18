import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { updateTabTitle } from '../../../utils/updateTabTitle'
import { useUser } from '../../../hooks/useUser'
import {useNavigate} from "react-router-dom"
import { useUsers } from '../../../hooks/useUsers'

import axios from "axios"

import { AuthContext } from '../../../context/AuthContext/'

const AddUser = () => {

  updateTabTitle('Eliminar Usuario')

  const params = useParams()
  const usuarioDestino = params.id

  const {usuarioCargado} = useUser(usuarioDestino)

  const {user} = useContext(AuthContext)  
  
  let usuarioGenerador = user._id

  const [time, setTime] = useState(new Date);
      
  let anio = time.getFullYear();
  let mes = time.getMonth() + 1;
  let dia = time.getDate();
      
  let fecha = dia + "/" + mes + "/" + anio;
  let fechaAbsoluta = anio * 10000 + mes * 100 + dia;

  const [requestData, setRequestData] = useState({
    userGenerator: usuarioGenerador,
    userReceptor: usuarioDestino,
    fecha: fecha,
    fechaAbsoluta: fechaAbsoluta,
    categoria: "Amistad",
  })

  console.log(requestData)

  const [error, setError] = useState("")

  const navigate = useNavigate()

  const generateRequest = (e) => {
    // usuarioReceptor = usuarioCargado.id
    // setRequestData({...requestData, userReceptor: usuarioCargado.id})

    handleAdd(e)
  }

  const handleAdd = (e) => {
    e.preventDefault()

    axios.post("http://localhost:3000/solicitudes/", requestData)
          .then((res) => {
          console.log(res)
          navigate('/proyectos')
          toast.success('La solicitud ha sido enviada!');
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
        <h1>¿Está seguro que desea enviar uns solicitud de amistad a {usuarioCargado.username}?</h1>
         <section className='perfil-personal'> 
        
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

        </section>

        <button
            onClick={(e) => generateRequest(e)}
            className='botonPrincipal'
        >
            Confirmar envío de solicitud de amistad
        </button>

        
      </main>
    )}
    </>
  )
}

export {AddUser}

import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { TabTitle } from '../../../utils/TabTitle'
import {toast} from "sonner";
import { useUsers } from '../../../hooks/useUsers'
import { ApiContext } from '../../../context/ApiContext'


const DeleteUser = () => {

  TabTitle('Eliminar Usuario')

  const params = useParams()
  const usuarioId = params.id

  // const {usuariosCargados} = useUsers()
  const {usuariosCargados} = useContext(ApiContext)


  console.log(usuariosCargados)


  const detalleUsuario = usuariosCargados.filter(usuario => (usuario.id == usuarioId))[0]
  console.log(detalleUsuario)

  const navigate = useNavigate()

  const handleDelete = (e, id) => {
    e.preventDefault()
    axios.delete(`http://localhost:3000/usuarios/eliminarUsuario/${id}`)
    .then((res) => {
      console.log(res)
      navigate('/administracionUsuarios')
      toast.success('Se ha eliminado el usuario con éxito!');
      window.location.reload(true)
    })
    .catch((error) => {
      setError(error.respose.data.message)
      console.log(error)
      toast.error('Error al eliminar el usuario');
    })
  }

  return (
    <>
    {
      <main className='seccion container'>
        <h1>¿Está seguro que desea eliminar este usuario?</h1>
        <section className='detalle'>
          <img src="../../../../src/assets/img/logoGrande.png" alt={detalleUsuario.username} />
          <div className='contenido'>
            <h2>Nombre usuario</h2>
            <p>{detalleUsuario.username}</p>
            <h2>Correo usuario</h2>
            <p>{detalleUsuario.email}</p>
          </div>
        </section>
        <button
         onClick={(e) => handleDelete(e, detalleUsuario.id)}
              className='botonPrincipal'
        >
            Eliminar
        </button>

        
      </main>
    }
    </>
  )
}

export {DeleteUser}
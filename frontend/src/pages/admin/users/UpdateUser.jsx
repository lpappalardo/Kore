import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { AuthContext } from '../../../context/AuthContext/'
import { TabTitle } from '../../../utils/TabTitle'
import {toast} from "sonner";
import { useProjects } from '../../../hooks/useProjects'

const UpdateUser = () => {

  TabTitle('CRUD Editar Usuario')

    const params = useParams()
    const userId = params.id

    const [errorsValidation, setErrorsValidation] = useState({})

    const [checkedValues, setCheckedValues] = useState([])
  
    const {user} = useContext(AuthContext)
  
    const navigate = useNavigate()
  
    // const publicadosUsuario = projects.filter((publicado) => publicado.id == publicadoId)[0]

    const [userData, setUserData] = useState({
      username: "",
      email: "",
    })

    // console.log("1")
    // console.log(projectData)
    // console.log("2")

    // console.log(publicadosUsuario)
  
    const [error, setError] = useState("")
  
    const handleUpdate = (e, id) => {

      const validationErrors = {}

      if(!userData.name.trim()) {
        validationErrors.username = "El nombre del usuario es requerido"
      }

      if(!userData.email.trim()) {
        validationErrors.email = "El correo es requerido"
      } else if(!/\S+@\S+\.\S+/.test(userData.email)){
        validationErrors.email = "El correo ingresado no es válido"
      }

      setErrorsValidation(validationErrors)  
    
      if(Object.keys(validationErrors).length === 0) {
        update(e, id);
      } else {
        toast.error('Error al editar el proyecto');
      }
    }
  
    const update = (e, id) => {
      e.preventDefault()

      axios.put(`http://localhost:3000/usuarios/editarUsuario/${id}`, userData)
      .then((res) => {
        console.log(res)
        navigate('/administracionUsuarios')
        toast.success('Se ha editado el usuario con éxito!');
      })
      .catch((error) => {
        setError(error.respose.data.message)
        console.log(error)
        toast.error('Error al editar el usuario');
      })
    }

  return (
    <div>
      <h1>Editar Usuario</h1>
      <form>

        <div>
          <label>Nombre Usuario:</label>
          <input type="text" value={userData.username}
            onChange={(e) => setUserData({...userData, username: e.target.value})} />
          {errorsValidation.username && <p className='errorValidation'>{errorsValidation.username}</p>}  
        </div>

        <div>
          <label>Correo:</label>
          <input type="email" value={userData.email}
            onChange={(e) => setUserData({...userData, email: e.target.value})} />
          {errorsValidation.email && <p className='errorValidation'>{errorsValidation.email}</p>}  
        </div>

        <button className="botonPrincipal" onClick={(e) => handleUpdate(e, userId)}>Editar Usuario</button>
      </form>
    </div>
  )
}

export {UpdateUser}


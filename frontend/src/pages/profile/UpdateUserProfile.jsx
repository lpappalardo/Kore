import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { AuthContext } from '../../context/AuthContext/'
import { updateTabTitle } from '../../utils/updateTabTitle'
import {toast} from "sonner";
import { useProjects } from '../../hooks/useProjects'

const UpdateUserProfile = () => {

  updateTabTitle('Editar Usuario')

    const params = useParams()
    // const userId = params.id

    const [errorsValidation, setErrorsValidation] = useState({})

    const [checkedValues, setCheckedValues] = useState([])
  
    const {user} = useContext(AuthContext)

    const userId  = user._id
    console.log(userId)
  
    const navigate = useNavigate()

    const [userData, setUserData] = useState({
      username: "",
      // email: "",
    })
  
    const [error, setError] = useState("")
  
    const handleUpdate = (e, id) => {

      const validationErrors = {}

      if(!userData.name.trim()) {
        validationErrors.username = "El nombre del usuario es requerido"
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

      // axios.put(`http://localhost:3000/usuarios/editarUsuario/${id}`, userData)
      // .then((res) => {
      //   console.log(res)
      //   navigate('/perfil')
      //   toast.success('Se ha editado el usuario con éxito!');
      // })
      // .catch((error) => {
      //   setError(error.respose.data.message)
      //   console.log(error)
      //   toast.error('Error al editar el usuario');
      // })
    }

  return (
    <div >
      <form className='formulario'>
        <h1>Editar Usuario</h1>
        <div className='elemEditUser'>
          <label>Nombre Usuario:</label>
          <input type="text" value={userData.username}
            onChange={(e) => setUserData({...userData, username: e.target.value})} />
          {errorsValidation.username && <p>{errorsValidation.username}</p>}  
        </div>

        {/* <div className='elemEditUser'>
          <label>Imagen:</label>
          <input type="file"/>
        </div> */}

        <button className="botonPrincipal" onClick={(e) => handleUpdate(e, userId)}>Editar Usuario</button>
      </form>
    </div>
  )
}

export {UpdateUserProfile}




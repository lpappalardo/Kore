import React, { useState } from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { TabTitle } from '../../../utils/TabTitle'
import {toast} from "sonner";

const UploadUser = () => {

  const [errorsValidation, setErrorsValidation] = useState({})

  TabTitle('CRUD Cargar Usuario')

  const navigate = useNavigate()

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: ""
  })

  const [error, setError] = useState("")

  const handleRegister = (e) => {
    e.preventDefault()

    const validationErrors = {}

    if(!userData.username.trim()) {
      validationErrors.username = "El nombre de usuario es requerido"
    }

    if(!userData.email.trim()) {
        validationErrors.email = "El correo es requerido"
    } else if(!/\S+@\S+\.\S+/.test(userData.email)){
        validationErrors.email = "El correo ingresado no es válido"
    }

    if(!userData.password.trim()) {
        validationErrors.password = "La contraseña es requerida"
    } else if(userData.password.length < 6){
        validationErrors.password = "La contraseña debe tener al menos 6 caracteres"
    }

    setErrorsValidation(validationErrors)

    if(Object.keys(validationErrors).length === 0) {
      axios.post("http://localhost:3000/usuarios/register", userData)
      .then((res) => {
        console.log(res)
        navigate('/administracionUsuarios')
        toast.success('Usuario generado con éxito');
      })
      .catch((error) => {
        setError(error.respose.data.message)
        console.log(error)
      })
    } else {
      toast.error('Error al generar usuario');
    }
  }

  return (
    <div>
      <h1>Generar Usuario</h1>
      <form>

        <div>
          <label>Nombre Usuario:</label>
          <input type="text" value={userData.username}
            onChange={(e) => setUserData({...userData, username: e.target.value})} />
          {errorsValidation.username && <p>{errorsValidation.username}</p>}  
        </div>

        <div>
          <label>Correo:</label>
          <input type="email" value={userData.email}
            onChange={(e) => setUserData({...userData, email: e.target.value})} />
          {errorsValidation.email && <p>{errorsValidation.email}</p>}  
        </div>

        <div>
          <label>Contraseña:</label>
          <input 
            type="text"
            value={userData.password}
            onChange={(e) => setUserData({...userData, password: e.target.value})} />
            {errorsValidation.password && <p>{errorsValidation.password}</p>}  
        </div>

        <button className="botonPrincipal" onClick={handleRegister}>Generar Usuario</button>
      </form>
    </div>
  )
}

export {UploadUser}

import React, { useState } from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { TabTitle } from '../../utils/TabTitle'

const Register = () => {

  TabTitle('Registro')

  const navigate = useNavigate()

  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    password: ""
  })

  const [error, setError] = useState("")

  const handleRegister = (e) => {
    e.preventDefault()
    axios.post("http://localhost:3000/usuarios/register", userData)
    .then((res) => {
      console.log(res)
      navigate('/login')
    })
    .catch((error) => {
      setError(error.respose.data.message)
      console.log(error)
    })
  }

  return (
    <main className='container formInicio'>
      <picture className='logoEntrada'>
          <img src="../../../src/assets/img/logoNombre.png" alt="Kore" />
      </picture>
      

      <h1>Registrarse</h1>
      <form>
        <div>
          <label>Nombre:</label>
          <input type="text" value={userData.name}
            onChange={(e) => setUserData({...userData, name: e.target.value})} />
        </div>
        <div>
          <label>Usuario:</label>
          <input type="text" value={userData.username}
            onChange={(e) => setUserData({...userData, username: e.target.value})} />
        </div>
        <div>
          <label>Correo:</label>
          <input type="email" value={userData.email}
            onChange={(e) => setUserData({...userData, email: e.target.value})} />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" value={userData.password}
            onChange={(e) => setUserData({...userData, password: e.target.value})} />
        </div>
        <button className="botonPrincipal" onClick={handleRegister}>Registrarse</button>
        {
          error && <p>{error}</p>
        }
      </form>
    </main>
  )
}

export {Register}
import React, { useContext, useState } from 'react'
import axios from "axios"
import { AuthContext } from '../../context/AuthContext'
import Cookies from "js-cookie"
import {useNavigate} from "react-router-dom"
import { TabTitle } from '../../utils/TabTitle'

const Login = () => {
  
  TabTitle('Ingreso')

  const navigate = useNavigate()

  const [userData, setUserData] = useState({
    email: "",
    password: ""
  })

  const [error, setError] = useState("")

  const {setUser} = useContext(AuthContext)

  const handleLogin = (e) => {
    e.preventDefault()
    axios.post("http://localhost:3000/usuarios/login", userData)
    .then((res) => {
      console.log(res)
      setUser(res.data.usuario)
      Cookies.set('jwToken', res.data.jwToken, {expires: 3})
      navigate('/')
    })
    .catch((error) => {
      setError(error.respose.data.message)
      console.log(error)
    })
  }

  return (
    <div className='container formInicio'>
      <picture className='logoEntrada'>
          <img src="../../../src/assets/img/logoNombre.png" alt="Kore" />
      </picture>
      
      <h1>Ingresar</h1>
      <form>
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
        <button className="botonPrincipal" onClick={handleLogin}>Login</button>
        {
          error && <p>{error}</p>
        }
      </form>
    </div>
  )
}

export {Login}
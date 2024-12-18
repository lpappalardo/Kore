import React, { useContext, useState } from 'react'
import axios from "axios"
import { AuthContext } from '../../context/AuthContext'
import Cookies from "js-cookie"
import {useNavigate, NavLink} from "react-router-dom"
import { updateTabTitle } from '../../utils/updateTabTitle'
import {toast} from "sonner";

const Login = () => {
  const [errorsValidation, setErrorsValidation] = useState({})
  const [showPassword,setShowPassword] = useState(false)
  
  updateTabTitle('Ingreso')

  const navigate = useNavigate()

  const [userData, setUserData] = useState({
    email: "",
    password: ""
  })

  const [error, setError] = useState("")

  const {setUser} = useContext(AuthContext)

  const handleLogin = (e) => {
    e.preventDefault()

    const validationErrors = {}

    if(!userData.email.trim()) {
        validationErrors.email = "El correo es requerido"
    }

    if(!userData.password.trim()) {
        validationErrors.password = "La contraseña es requerida"
    }

    setErrorsValidation(validationErrors)

    if(Object.keys(validationErrors).length === 0) {
    axios.post("http://localhost:3000/usuarios/login", userData)
    .then((res) => {
      console.log(res)
      setUser(res.data.usuario)
      Cookies.set('jwToken', res.data.jwToken, {expires: 3})
      toast.success("Inicio de sesión exitoso")
      navigate('/')
    })
    .catch((error) => {
      setError(error.respose.data.message)
      console.log(error)
      toast.error("Error al iniciar sesión")
    })

    const credentialsErrors = {}
    credentialsErrors.credentials = "La credenciales ingresadas no son válidas"
    setErrorsValidation(credentialsErrors)
  } else {
    toast.error('Error al tratar de ingresar');
  }
}

  return (
    <main className='inicio'>
      <div className='container formInicio'>
        <div className='row espaciadoTitleForm'>
          <picture className='logoEntrada'>
            <img src="../../../src/assets/img/logoSolo.png" alt="Kore" />
          </picture>
      
          <h1>Ingresar</h1>
        </div>
  
      <form>
        <div>
          <label>Correo:</label>
          <input type="email" value={userData.email}
            onChange={(e) => setUserData({...userData, email: e.target.value})} 
            className='espaciadoIngreso bordePerfecto' 
            />
          {errorsValidation.email && <p className='errorValidation'>{errorsValidation.email}</p>}  
        </div>
        <div>
          <label>Contraseña:</label>
          <div className='row valorIngreso espaciadoIngreso'>
          <input type={showPassword ? "text" : "password"}  value={userData.password}
            onChange={(e) => setUserData({...userData, password: e.target.value})}
            className='bordeSemiPerfecto'/>
          <div className='showPassword'  onClick={()=>setShowPassword((preve)=>!preve)}>
                <span>
                    {
                        showPassword ? (
                          <img className='iconoInput' src="../src/assets/eye-slash.png" alt="Oculto"/>
                        )
                        :
                        (
                          <img className='iconoInput' src="../src/assets/eye.png" alt="Descubierto"/>
                        )
                    }
                </span>
            </div>
            </div>
          {errorsValidation.password && <p className='errorValidation'>{errorsValidation.password}</p>} 
          {errorsValidation.credentials && <p className='errorValidation'>{errorsValidation.credentials}</p>}  
          <NavLink className="navForm" to="/forgetPassword">Olvidé mi contraseña</NavLink>
        </div>
        <button className="botonPrincipal botonFull" onClick={handleLogin}>Ingresar</button>
        <div className='centrar'>
        ¿Todavía no tenes una cuenta? <NavLink className="navForm" to="/register">Registrarse</NavLink>
        </div>
      </form>
      </div>
    </main>
  )
}

export {Login}
import React, { useState } from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { TabTitle } from '../../utils/TabTitle'

const Register = () => {
  const [showPassword,setShowPassword] = useState(false)
  const [showConfirmPassword,setShowConfirmPassword] = useState(false)
  const [errorsValidation, setErrorsValidation] = useState({})

  TabTitle('Registro')

  const navigate = useNavigate()

  const [userData, setUserData] = useState({
    // name: "",
    username: "",
    email: "",
    password: ""
  })

  const [confirmData, setConfirmData] = useState({
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

    if(userData.password !== confirmData.password) {
        validationErrors.confirmPassword = "Las contraseñas no coinciden"
    }

    setErrorsValidation(validationErrors)

    if(Object.keys(validationErrors).length === 0) {
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
  }

  return (
    <main className='container formInicio'>
      <picture className='logoEntrada'>
          <img src="../../../src/assets/img/logoNombre.png" alt="Kore" />
      </picture>
      

      <h1>Registrarse</h1>
      <form>
        {/* <div>
          <label>Nombre:</label>
          <input type="text" value={userData.name}
            onChange={(e) => setUserData({...userData, name: e.target.value})} />
          {errorsValidation.name && <p>{errorsValidation.name}</p>}  
        </div> */}
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
            type={showPassword ? "text" : "password"} 
            value={userData.password}
            onChange={(e) => setUserData({...userData, password: e.target.value})} />
            <div  onClick={()=>setShowPassword((preve)=>!preve)}>
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
            {errorsValidation.password && <p>{errorsValidation.password}</p>}  
        </div>

        <div>
          <label>Confirmar Contraseña:</label>
          <input 
            type={showConfirmPassword ? "text" : "password"} 
            value={confirmData.password}
            onChange={(e) => setConfirmData({...confirmData, password: e.target.value})} />
            <div  onClick={()=>setShowConfirmPassword((preve)=>!preve)}>
                <span>
                    {
                        showConfirmPassword ? (
                          <img className='iconoInput' src="../src/assets/eye-slash.png" alt="Oculto"/>
                        )
                        :
                        (
                          <img className='iconoInput' src="../src/assets/eye.png" alt="Descubierto"/>
                        )
                    }
                </span>
            </div>
            {errorsValidation.confirmPassword && <p>{errorsValidation.confirmPassword}</p>}  
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
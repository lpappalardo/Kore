import React, { useState } from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { updateTabTitle } from '../../utils/updateTabTitle'
import {toast} from "sonner";

const Register = () => {
  const [showPassword,setShowPassword] = useState(false)
  const [showConfirmPassword,setShowConfirmPassword] = useState(false)
  const [errorsValidation, setErrorsValidation] = useState({})

  updateTabTitle('Registro')

  const navigate = useNavigate()

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
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
        toast.success('Registro exitoso');
      })
      .catch((error) => {
        setError(error.respose.data.message)
        console.log(error)
      })
    } else {
      toast.error('Error al registrarse');
    }
  }

  return (
    <main className='inicio'>
      <div className='container formInicio'>
        <div className='row espaciadoTitleForm'>
          <picture className='logoEntrada'>
            <img src="../../../src/assets/img/logoSolo.png" alt="Kore" />
          </picture>
      
          <h1>Registrarse</h1>
        </div>

      <form>
        <div>
          <label>Nombre Usuario:</label>
          <input type="text" value={userData.username}
            onChange={(e) => setUserData({...userData, username: e.target.value})} 
            className='espaciadoIngreso bordePerfecto' />
          {errorsValidation.username && <p className='errorValidation'>{errorsValidation.username}</p>}  
        </div>
        <div>
          <label>Correo:</label>
          <input type="email" value={userData.email}
            onChange={(e) => setUserData({...userData, email: e.target.value})} 
            className='espaciadoIngreso bordePerfecto' />
          {errorsValidation.email && <p className='errorValidation'>{errorsValidation.email}</p>}  
        </div>
        <div>
          <label>Contraseña:</label>
          <div className='row valorIngreso espaciadoIngreso'>
            <input 
              type={showPassword ? "text" : "password"} 
              value={userData.password}
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
        </div>

        <div>
          <label>Confirmar Contraseña:</label>
          <div className='row valorIngreso espaciadoIngreso'>
            <input 
              type={showConfirmPassword ? "text" : "password"} 
              value={confirmData.password}
              onChange={(e) => setConfirmData({...confirmData, password: e.target.value})} 
              className='bordeSemiPerfecto'/>
            <div className='showPassword'  onClick={()=>setShowConfirmPassword((preve)=>!preve)}>
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
          </div>
          {errorsValidation.confirmPassword && <p className='errorValidation'>{errorsValidation.confirmPassword}</p>}  
        </div>

        <button className="botonPrincipal botonFull" onClick={handleRegister}>Registrarse</button>
      </form>
      </div>
    </main>
  )
}

export {Register}
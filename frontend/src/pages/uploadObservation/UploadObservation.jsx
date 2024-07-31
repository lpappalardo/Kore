import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ApiContext } from '../../context/ApiContext'
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { AuthContext } from '../../context/AuthContext/'
import { Link } from 'react-router-dom'
import { TabTitle } from '../../utils/TabTitle'

const UploadObservation = () => {

  const [errorsValidation, setErrorsValidation] = useState({})

  TabTitle('Generar Observación')

    const params = useParams()
    const detalleId = params.id

    const navigate = useNavigate()

    const {mappedPublicados, mappedOservaciones} = useContext(ApiContext)

    const detallePublicado = mappedPublicados.filter(project => (project.id == detalleId))[0]
    console.log(detallePublicado)

    const {user} = useContext(AuthContext)

    const [observationData, setObservationData] = useState({
      name: user.name,
      idProject: detalleId,
      userId: user.id,
      arte: "",
      tecnico: "",
      disenio: "",
      generales: "",
    })
  
    const [error, setError] = useState("")
  
    const handleSubmit = (e) => {
      e.preventDefault()

      const validationErrors = {}

      if(!observationData.generales.trim()) {
        validationErrors.generales = "Es necesario ingresar una observación general del proyecto"
      }

      setErrorsValidation(validationErrors)  
    
      if(Object.keys(validationErrors).length === 0) {
        axios.post("http://localhost:3000/observaciones/", observationData)
          .then((res) => {
          console.log(res)
          navigate('/proyectos')
          window.location.reload(true)
        })
        .catch((error) => {
          setError(error.respose.data.message)
          console.log(error)
        }) 
      }
    }

  return (
    <main className='observacion container'>
          <form className='formulario' action="" method='POST'>
            <h1>Generar Observación de {detallePublicado.title}</h1>

            <div>
              <label for="disenio">Detalle del diseño:</label>
              <textarea name="disenio" id="disenio" placeholder="Sobre el diseño..." required
              value={observationData.disenio}
              onChange={(e) => setObservationData({...observationData, disenio: e.target.value})}
              ></textarea>
            </div>
            <div>
              <label for="arte">Sobre el arte:</label>
              <textarea name="arte" id="arte" placeholder="Sobre el arte..." required
              value={observationData.arte}
              onChange={(e) => setObservationData({...observationData, arte: e.target.value})}
              ></textarea>
            </div>
            <div>
              <label for="tecnico">Sobre el apartado técnico:</label>
              <textarea name="tecnico" id="tecnico" placeholder="Sobre el apartado técnico..." required
              value={observationData.tecnico}
              onChange={(e) => setObservationData({...observationData, tecnico: e.target.value})}
              ></textarea>
            </div>
            <div>
              <label for="generales">Detalles generales*:</label>
              <textarea name="generales" id="generales" placeholder="Generales..." required
              value={observationData.generales}
              onChange={(e) => setObservationData({...observationData, generales: e.target.value})}
              ></textarea>
              {errorsValidation.generales && <p>{errorsValidation.generales}</p>} 
            </div>
            <button className='botonPrincipal' onClick={handleSubmit}>Enviar</button>
          </form>
    </main>
  )
}

export {UploadObservation}
// export default UploadObservation

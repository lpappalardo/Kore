import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ApiContext } from '../../context/ApiContext'
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { AuthContext } from '../../context/AuthContext/'
import { Link } from 'react-router-dom'
import { updateTabTitle } from '../../utils/updateTabTitle'
import {toast} from "sonner";
import { useProjects } from '../../hooks/useProjects'

const UploadObservation = () => {

  const [errorsValidation, setErrorsValidation] = useState({})

  updateTabTitle('Generar Observación')

    const params = useParams()
    const detalleId = params.id

    const navigate = useNavigate()

    const {mappedPublicados} = useProjects()

    let detallePublicado = mappedPublicados.filter(project => (project.id == detalleId))[0]
    console.log(detallePublicado)

    const {user} = useContext(AuthContext)
    console.log(user)

    const [observationData, setObservationData] = useState({
      name: user.username,
      idProject: detalleId,
      userId: user._id,
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
          toast.success('La observación ha sido creada!');
        })
        .catch((error) => {
          setError(error.respose.data.message)
          console.log(error)
        }) 
      } else {
        toast.error('Error al crear la observación');
      }
    }

  return (
    <main className='observacion container'>
      {detallePublicado && (
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
              {errorsValidation.generales && <p className='errorValidation'>{errorsValidation.generales}</p>} 
            </div>
            <button className='botonPrincipal' onClick={handleSubmit}>Enviar</button>
          </form>
      )}
    </main>
  )
}

export {UploadObservation}
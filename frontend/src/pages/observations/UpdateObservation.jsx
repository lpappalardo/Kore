import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { AuthContext } from '../../context/AuthContext/'
import { TabTitle } from '../../utils/TabTitle'
import {toast} from "sonner";
import { useProjects } from '../../hooks/useProjects'
import { useObservations } from '../../hooks/useObservations'

const UpdateObservation = () => {

  const [errorsValidation, setErrorsValidation] = useState({})

  TabTitle('Editar Observación')

    const params = useParams()
    const observationId = params.id
    console.log(observationId)
  
    const {mappedPublicados} = useProjects()
    const {mappedOservaciones} = useObservations()
    console.log(mappedOservaciones)
    console.log(mappedPublicados)
  
    const {user} = useContext(AuthContext)

    let detalleObservacion = mappedOservaciones.filter(observacion => (observacion.id == observationId))[0]
    console.log(detalleObservacion)
    console.log(observationId)
  
    const navigate = useNavigate()

    const [observationData, setObservationData] = useState({
      name: user.username,
      // idProject: detalleObservacion.idProject,
      // idProject: "",
      userId: user._id,
      // arte: detalleObservacion.arte,
      arte: "",
      // tecnico: detalleObservacion.tecnico,
      tecnico: "",
      // disenio: detalleObservacion.disenio,
      disenio: "",
      // generales: detalleObservacion.generales,
      generales: "",
    })

    // if(detalleObservacion){
    //   setObservationData({idProject: detalleObservacion.idProject})
    // }

    console.log("1")
    console.log(observationData)
    console.log(detalleObservacion)
    console.log("2")

    // setObservationData({generales: detalleObservacion.generales})
  
    const [error, setError] = useState("")
  
    const handleUpload = (e, id) => {

      e.preventDefault()

      const validationErrors = {}

      if(!observationData.generales.trim()) {
        validationErrors.generales = "Es necesario ingresar una observación general del proyecto"
      }

      setErrorsValidation(validationErrors)  

      if(Object.keys(validationErrors).length === 0) {
        axios.put(`http://localhost:3000/observaciones/editarObservacion/${id}`, observationData)
        .then((res) => {
          console.log(res)
          navigate('/proyectos')
          toast.success('La observación ha sido editada con éxito!');
        })
        .catch((error) => {
          setError(error.respose.data.message)
          console.log(error)
        })
      } else {
        toast.error('Error al editar la observación');
      }
    }
  
    return (
      <>
      {detalleObservacion && (
        <main>
          <section className='observacion container'>
            <form className='formulario' action="" method='PUT'>
              <h1>Actualizar Observación</h1>
              <div>
                <label for="disenio">Sobre el diseño:</label>
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
                <label for="generales">Generales*:</label>
                <textarea name="generales" id="generales" placeholder="Generales..." required
                value={observationData.generales}
                // {detalleObservacion.generales}
                onChange={(e) => setObservationData({...observationData, generales: e.target.value})}
                ></textarea>
                {errorsValidation.generales && <p className='errorValidation'>{errorsValidation.generales}</p>} 
              </div>
              <button className='botonPrincipal' onClick={(e) => handleUpload(e, observationId)}>Actualizar</button>
            </form>
          </section>
        </main>
      )}
      </>
    )
}

export {UpdateObservation}

import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ApiContext } from '../../context/ApiContext'
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { AuthContext } from '../../context/AuthContext/'
import { TabTitle } from '../../utils/TabTitle'

const UpdateObservation = () => {

  TabTitle('Editar Observación')

    const params = useParams()
    const observationId = params.id
  
    const { mappedOservaciones} = useContext(ApiContext)
  
    const {user} = useContext(AuthContext)

    const detalleOservacion = mappedOservaciones.filter(observacion => (observacion.userId == user.id && observacion.id == observationId))[0]
    console.log(detalleOservacion)
  
    const navigate = useNavigate()
  
    const [observationData, setObservationData] = useState({
      name: user.name,
      idProject: detalleOservacion.idProject,
      userId: user.id,
      arte: detalleOservacion.arte,
      tecnico: detalleOservacion.tecnico,
      disenio: detalleOservacion.disenio,
      generales: detalleOservacion.generales,
    })
  
    const [error, setError] = useState("")
  
    const handleUpload = (e, id) => {
      e.preventDefault()
      axios.put(`http://localhost:3000/observaciones/editarObservacion/${id}`, observationData)
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
  
    return (
      <>
      {
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
                onChange={(e) => setObservationData({...observationData, generales: e.target.value})}
                ></textarea>
              </div>
              <button className='botonPrincipal' onClick={(e) => handleUpload(e, observationId)}>Actualizar</button>
            </form>
          </section>
        </main>
      }
      </>
    )
}

export {UpdateObservation}
// export default UpdateObservation

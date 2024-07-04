import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ApiContext } from '../../context/ApiContext'
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { AuthContext } from '../../context/AuthContext/'
import { Link } from 'react-router-dom'

const UploadObservation = () => {
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

  return (
    <section className='observacion container'>
          <form className='formulario' action="" method='POST'>
            <h2>Dejar Observación de {detallePublicado.title}</h2>

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
              <label for="generales">Generales*:</label>
              <textarea name="generales" id="generales" placeholder="Generales..." required
              value={observationData.generales}
              onChange={(e) => setObservationData({...observationData, generales: e.target.value})}
              ></textarea>
            </div>
            <button className='botonPrincipal' onClick={handleSubmit}>Enviar</button>
          </form>
        </section>
  )
}

export {UploadObservation}
// export default UploadObservation

import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ApiContext } from '../../context/ApiContext'
import {useNavigate} from "react-router-dom"
import axios from "axios"

export const Detail = () => {
  const params = useParams()
  const detalleId = params.id

  const {mappedPublicados, setProjects, mappedOservaciones, setObservations} = useContext(ApiContext)

  const detallePublicado = mappedPublicados.filter(project => (project.id == detalleId))[0]
  const detalleOservaciones = mappedOservaciones.filter(observacion => (observacion.idProject == detalleId))

  const navigate = useNavigate()

  const [observationData, setObservationData] = useState({
    name: "",
    idProject: detalleId,
    arte: "",
    tecnico: "",
    disenio: "",
    generales: "",
  })

  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:3002/observaciones/", observationData)
    .then((res) => {
      console.log(res)
      navigate(`/detalle/${detalleId}`)
    })
    .catch((error) => {
      setError(error.respose.data.message)
      console.log(error)
    })
  }

  return (
    <>
    {
      <div>
        <section className='detalle container'>
          <img src={detallePublicado.title} alt={detallePublicado.title} />
          <div className='contenido'>
            <h2>{detallePublicado.title}</h2>
            <p>{detallePublicado.description}</p>
            {/* <ul className='listaGeneros'>
            {detallePublicado.generos.map(genero => 
                <li className='genero'>{genero}</li>
              )}
            </ul> */}
            <button className='botonPrincipal'>Descargar</button>
          </div>
        </section>

        <section className='container'>
          <ul className="proyects">
              {
                  detalleOservaciones.map(observation => (
                      // <Link to={`/detalle/${proyect.identificador}`} className="proyect" key={proyect.id}>
                      <li className="proyect" key={observation.id}>
                          {/* <img src={proyect.poster} alt={proyect.title} /> */}
                          <h3>{observation.name}</h3>
                          {
                            observation.arte && <p>{observation.arte}</p>
                          }
                          {
                            observation.tecnico && <p>{observation.tecnico}</p>
                          }
                          {
                            observation.disenio && <p>{observation.disenio}</p>
                          }
                          <p>{observation.generales}</p>
                      </li>
                  ))
              }
          </ul>
        </section>

        <section className='observacion container'>
          <form className='formulario' action="" method='POST'>
            <h3>Dejar Observación</h3>

            <div>
              <label for="nombre">Nombre:*</label>
              <input type='text' name="nombre" id="nombre" placeholder="Nombre..." required
              value={observationData.name}
              onChange={(e) => setObservationData({...observationData, name: e.target.value})}
              ></input>
            </div>
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
            <button className='botonPrincipal' onClick={handleSubmit}>Enviar</button>
          </form>
        </section>
      </div>
    }
    </>
  )
}
import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ApiContext } from '../../context/ApiContext'
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { AuthContext } from '../../context/AuthContext/'
import { TabTitle } from '../../utils/TabTitle'
import {toast} from "sonner";
import { useObservations } from '../../hooks/useObservations'

const DeleteObservation = () => {

  TabTitle('Eliminar Observación')

    const params = useParams()
    const detalleId = params.id
  
    const {mappedOservaciones} = useObservations()
  
    let observacion = mappedOservaciones.filter(observation => (observation.id == detalleId))[0]
    console.log(observacion)
  
    const {user} = useContext(AuthContext)
  
    const navigate = useNavigate()
  
    const [error, setError] = useState("")
  
    const handleDelete = (e, id) => {
      e.preventDefault()
      axios.delete(`http://localhost:3000/observaciones/eliminarObservacion/${id}`)
      .then((res) => {
        console.log(res)
        navigate('/proyectos')
        toast.success('Se ha eliminado la observación con éxito!');
      })
      .catch((error) => {
        setError(error.respose.data.message)
        console.log(error)
        toast.error('Error al eliminar la observación');
      })
    }

  return (
    <main>
      {observacion && (
      <section className='seccion container'>
        <h1>¿Está seguro que desea eliminar esta observación?</h1>


                      <div className="observation">
                          <h3>{observacion.name}</h3>
                          {
                            observacion.arte && 
                            <div>
                              <h4>Arte</h4>
                              <p>{observacion.arte}</p>
                            </div>
                          }
                          {
                            observacion.tecnico && 
                            <div>
                              <h4>Tecnico</h4>
                              <p>{observacion.tecnico}</p>
                            </div>
                          }
                          {
                            observacion.disenio &&
                            <div>
                              <h4>Diseñio</h4>
                              <p>{observacion.disenio}</p>
                            </div>
                          }
                          <div>
                              <h4>Generales</h4>
                              <p>{observacion.generales}</p>
                            </div>
                      </div>
 
          <button
         onClick={(e) => handleDelete(e, detalleId)}
         className='botonDanger'
        >
            Eliminar
        </button>

        </section>
      )}
    </main>
  )
}

export {DeleteObservation}


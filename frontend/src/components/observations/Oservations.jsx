import React from "react";
import { Link } from 'react-router-dom'

const ListOfObservations = ({ observations }) => {
   
    return (
            <div>
                {
                    <ul className="proyects">
                        {
                            observations.map(observation => (
                                // <Link to={`/detalle/${proyect.identificador}`} className="proyect" key={proyect.id}>
                                <div className="observation" key={observation.id}>
                                    {/* <img src={proyect.poster} alt={proyect.title} /> */}
                                    {/* <h3>{observation.name}</h3> */}
                                    <div>
                                        <h4>Generales</h4>
                                        <p>{observation.generales}</p>
                                    </div>
                                    <div className="contenedor-links">
                                        <Link to={`/detalle/${observation.idProject}`} className="noLink botonPrincipal">Ver</Link>
                                        <Link to={`/actualizarObservacion/${observation.id}`} className="noLink botonPrincipal">Editar</Link>
                                        <Link to={`/elimiarObservacion/${observation.id}`} className="noLink botonPrincipal">Eliminar</Link>
                                    </div>
                                </div>
                            ))
                        }
                    </ul>
                }
            </div>
    )
}

const NoObservationResults = () => {
    return (
        <p>No se encontraron Observaciones.</p>
    )
}

export function Observations ({ observations }) {
    const hasObservations = observations?.length > 0

    return (
        hasObservations
         ? <ListOfObservations observations={observations} />
         : <NoObservationResults />
    )
}

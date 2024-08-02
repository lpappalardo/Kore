import React from "react";
import { Link } from 'react-router-dom'

const ListOfObservations = ({ observations }) => {
   
    return (
            <div>
                {
                    <ul className="proyects">
                        {
                            observations.map(observation => (
                                <div className="observation" key={observation.id}>
                                    <div>
                                        <p className="titleObservation">Generales</p>
                                        <p className="contentObservation">{observation.generales}</p>
                                    </div>
                                    <div className="contenedor-links">
                                        <Link to={`/detalle/${observation.idProject}`} className="noLink botonPrincipal">Ver</Link>
                                        <Link to={`/actualizarObservacion/${observation.id}`} className="noLink botonPrincipal">Editar</Link>
                                        <Link to={`/elimiarObservacion/${observation.id}`} className="noLink botonDanger">Eliminar</Link>
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

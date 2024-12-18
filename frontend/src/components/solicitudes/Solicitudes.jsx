import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext/'

const ListOfSolicitudes = ({ solicitudes }) => {
   
    const {user} = useContext(AuthContext)

    return (
            <div>
                {
                    <ul>
                        {
                            solicitudes.map(solicitud => (

                                <li>
                                    <div className="solicitud" key={solicitud.id}>

                                        {
                                            (solicitud.userGenerator == user._id ) ?
                                            <p className="cardTitlte">Solicitud de Amistad Enviada</p>
                                            : <p className="cardTitlte">Solicitud de Amistad Recibida</p>
                                        }
                                      {/* <p className="cardTitlte">Solicitud de Amistad</p> */}
                                        <p>Fecha: {solicitud.fecha}</p>
                                        <div className='row'>
                                        {
                                            (solicitud.userGenerator == user._id ) ?
                                            <Link className=" botonPrincipal" to={`/SolicitudAmistadEnviada/${solicitud.id}`}>Ver</Link>
                                            : <Link className=" botonPrincipal" to={`/solicitudAmistadRecibida/${solicitud.id}`}>Ver</Link>
                                        }
                                      <Link className="botonDanger" to={``}>Eliminar</Link>
                                      </div>       
                                    </div>
                                </li>

                            ))
                        }
                    </ul>
                }
            </div>
    )
}

const NoSolicitudesResults = () => {
    return (
        <p>En este momento no hay ninguna notificacion pendiente.</p>
    )
}

export function Solicitudes ({ solicitudes }) {
    const hasObservations = solicitudes?.length > 0

    return (
        hasObservations
         ? <ListOfSolicitudes solicitudes={solicitudes} />
         : <NoSolicitudesResults />
    )
}
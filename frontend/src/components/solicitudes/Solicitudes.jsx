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
                                            (solicitud.categoria == "Amistad" ) ?
                                            (solicitud.userGenerator == user._id ) ?
                                            <p className="cardTitlte">Solicitud de Amistad Enviada</p>
                                            : <p className="cardTitlte">Solicitud de Amistad Recibida</p>
                                            : (solicitud.userGenerator == user._id ) ?
                                            <p className="cardTitlte">Solicitud de Colaboración Enviada</p>
                                            : <p className="cardTitlte">Solicitud de Colaboración Recibida</p>
                                        }

                                        <p>Fecha: {solicitud.fecha}</p>
                                        <div className='row'>
                                        {
                                            (solicitud.categoria == "Amistad" ) ?
                                            (solicitud.userGenerator == user._id ) ?
                                            <Link className=" botonPrincipal" to={`/SolicitudAmistadEnviada/${solicitud.id}`}>Ver</Link>
                                            : <Link className=" botonPrincipal" to={`/solicitudAmistadRecibida/${solicitud.id}`}>Ver</Link>
                                            : (solicitud.userGenerator == user._id ) ?
                                            <Link className=" botonPrincipal" to={`/SolicitudColaboracionEnviada/${solicitud.id}`}>Ver</Link>
                                            : <Link className=" botonPrincipal" to={`/SolicitudColaboracionRecibida/${solicitud.id}`}>Ver</Link>
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
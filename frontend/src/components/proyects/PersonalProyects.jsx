import React from "react";
import { Link } from 'react-router-dom'

const ListOfProyects = ({ proyects }) => {
   
    return (
            <div>
                {
                    <ul className="proyects">
                        {
                            proyects.map(proyect => (
                                <div className="proyectPersonal" key={proyect.id}>
                                    <img src="../../../src/assets/img/card.png" alt={proyect.title} />
                                    <p className="cardTitlte">{proyect.title}</p>
                                    <p>{proyect.tipoProyecto}</p>

                                        {
                                            (proyect.tipoProyecto == "abierto") ?
                                                
                                                <div className="contenedor-links">
                                                <Link className=" botonPrincipal" to={`/detalle/${proyect.id}`}>Ver</Link>
                                                <Link className=" botonPrincipal" to={`/actualizarProyecto/${proyect.id}`}>Editar</Link>
                                                <Link className="botonDanger" to={`/elimiar/${proyect.id}`}>Eliminar</Link>
                                                </div>

                                                : (proyect.tipoProyecto == "cerrado") ?

                                                <div className="contenedor-links">
                                                <Link className=" botonPrincipal" to={`/cerradoDetalle/${proyect.id}`}>Ver</Link>
                                                <Link className=" botonPrincipal" to={`/actualizarProyecto/${proyect.id}`}>Editar</Link>
                                                <Link className="botonDanger" to={`/elimiar/${proyect.id}`}>Eliminar</Link>
                                                </div>
                                                 : <Link className=" botonPrincipal" to={`/proyectoRemuneradoDetalle/${proyect.id}`}>Ver</Link>

                                        }
                                    </div>
                            ))
                        }
                    </ul>
                }
            </div>
    )
}

const NoProyectsResults = () => {
    return (
        <p className='comment'>No se encontraron Proyectos.</p>
    )
}

export function PersonalProyects ({ proyects }) {
    const hasProyects = proyects?.length > 0

    return (
        hasProyects
         ? <ListOfProyects proyects={proyects} />
         : <NoProyectsResults />
    )
}

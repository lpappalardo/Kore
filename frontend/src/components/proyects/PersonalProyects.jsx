import React from "react";
import { Link } from 'react-router-dom'

const ListOfProyects = ({ proyects }) => {
   
    return (
            <div>
                {
                    <ul className="proyects">
                        {
                            proyects.map(proyect => (
                                // <Link to={`/detalle/${proyect.identificador}`} className="proyect" key={proyect.id}>
                                <div className="proyect" key={proyect.id}>
                                    {/* <img src={proyect.poster} alt={proyect.title} /> */}
                                    <img src="../../../src/assets/img/card.png" alt={proyect.title} />
                                    <p className="cardTitlte">{proyect.title}</p>
                                    {/* <Link to={`/elimiar/${proyect.id}`}>Eliminar</Link> */}
                                    <div className="contenedor-links">
                                        <Link className=" botonPrincipal" to={`/detalle/${proyect.id}`}>Ver</Link>
                                        <Link className=" botonPrincipal" to={`/actualizarProyecto/${proyect.id}`}>Editar</Link>
                                        <Link className="botonDanger" to={`/elimiar/${proyect.id}`}>Eliminar</Link>
                                    </div>
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

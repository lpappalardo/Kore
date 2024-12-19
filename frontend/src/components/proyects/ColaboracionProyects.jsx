import React from "react";
import { Link } from 'react-router-dom'
import { useProjects } from '../../hooks/useProjects'

const ListOfProyects = ({ proyects }) => {

    const {mappedPublicados, setProjects} = useProjects()

    const proyectosAceptados = proyects.map((proyect) => proyect.idProyecto)
    
    const deatalleProyectos = mappedPublicados.filter((proyecto) => proyectosAceptados.includes(proyecto.id))
   
    return (
            <div>
                {
                    <ul className="proyects">
                        {
                            deatalleProyectos.map(proyect => (
                                <div className="proyectPersonal" key={proyect.id}>
                                    <img src="../../../src/assets/img/card.png" alt={proyect.title} />
                                    <p className="cardTitlte">{proyect.title}</p>
                                    <p>{proyect.tipoProyecto}</p>

                                    <Link className=" botonPrincipal" to={`/detalle/${proyect.id}`}>Ver</Link>
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

export function ColaboracionProyects ({ proyects }) {
    const hasProyects = proyects?.length > 0

    return (
        hasProyects
         ? <ListOfProyects proyects={proyects} />
         : <NoProyectsResults />
    )
}

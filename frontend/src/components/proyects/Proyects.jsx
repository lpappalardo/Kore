import React from "react";
import { Link } from 'react-router-dom'

const ListOfProyects = ({ proyects }) => {
   
    return (
            <div>
                {
                    <ul className="proyects">
                        {
                            proyects.map(proyect => (
                                <Link to={`/detalle/${proyect.id}`} className="proyect" key={proyect.id}>
                                    <img src="../../../src/assets/img/card.png" alt={proyect.title} />
                                    <div className="proyect-text">
                                        <p className="cardTitlte">{proyect.title}</p>
                                    </div>
                                </Link>
                            ))
                        }
                    </ul>
                }
            </div>
    )
}

const NoProyectsResults = () => {
    return (
        <p>No se encontraron Proyectos.</p>
    )
}

export function Proyects ({ proyects }) {
    const hasProyects = proyects?.length > 0

    return (
        hasProyects
         ? <ListOfProyects proyects={proyects} />
         : <NoProyectsResults />
    )
}

import React, { useContext } from 'react'
import { Proyects } from "../../components/proyects/Proyects"
import { ApiContext } from '../../context/ApiContext'

const Games = () => {
  const {mappedPublicados, setProjects} = useContext(ApiContext)

    return (
        <section className="publicaciones container">
                <h2>Proyectos publicados</h2>
                <Proyects proyects={mappedPublicados} />
        </section>
    )
}

export  default Games
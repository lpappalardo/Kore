import React from "react";
import publicadosProyects from "../../assets/mocks/proyectos.json"
import { Proyects } from "../../components/proyects/Proyects"

const Games = () => {
    const publicados = publicadosProyects.Search

    const mappedPublicados = publicados?.map(proyect => ({
        id: proyect.Id,
        title: proyect.Title,
        poster: proyect.Poster,
        identificador: proyect.Codigo
    }))

    return (
        <section className="publicaciones container">
                <h2>Proyectos publicados</h2>
                <Proyects proyects={mappedPublicados} />
        </section>
    )
}

export  default Games
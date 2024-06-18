import React from "react";
import recientesProyects from "../../assets/mocks/recientes.json"
import destacadosProyects from "../../assets/mocks/destacados.json"
import { Proyects } from "../../components/proyects/Proyects";

const Home = () => {
    const recientes = recientesProyects.Search

    const mappedRecientes = recientes?.map(proyect => ({
        id: proyect.Id,
        title: proyect.Title,
        poster: proyect.Poster,
        identificador: proyect.Codigo
    }))

    const destacados = destacadosProyects.Search

    const mappedDestacados = destacados?.map(proyect => ({
        id: proyect.Id,
        title: proyect.Title,
        poster: proyect.Poster,
        identificador: proyect.Codigo
    }))

    return (
        <main>
            <section>
                <picture>
                    <img src="../../../src/assets/img/bannerBig.png" alt="Bienvenida al sitio" />
                </picture>
            </section>

            <section className="publicaciones container">
                <h2>Destacados</h2>
                <Proyects proyects={mappedRecientes} />
            </section>
            <section className="publicaciones container">
                <h2>Mas Recientes</h2>
                <Proyects proyects={mappedDestacados} />
            </section>
        </main>
    
    )
}

export  default Home
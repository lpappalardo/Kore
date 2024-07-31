import React, { useContext } from "react";
import recientesProyects from "../../assets/mocks/recientes.json"
import destacadosProyects from "../../assets/mocks/destacados.json"
import { Proyects } from "../../components/proyects/Proyects";
import { ApiContext } from '../../context/ApiContext'
import { TabTitle } from '../../utils/TabTitle'

const Home = () => {

    TabTitle('Inicio')
    
    const {mappedPublicados, setProjects} = useContext(ApiContext)
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

            {/* <section className="publicaciones container">
                <h2>Destacados</h2>
                <Proyects proyects={mappedPublicados} />
            </section>
            <section className="publicaciones container">
                <h2>Mas Recientes</h2>
                <Proyects proyects={mappedPublicados} />
            </section> */}
            <section id="propuestas" className="seccion container">
    		<div class="articulos">
        		<div class="articulo">
            			<picture className="articulo-img">
                			<img src="../src/assets/desarrollador.jpg" alt="Desarrollador"/>
            			</picture>
            			<div className="articulo-texto invertido">
                			<h3>Sobre Kore</h3>
                			<p>No solo nos apasionan los videojuegos, sino tambien el desarrollo de los mismos, por lo cual somos conscientes de la dificultad que presenta asegurar la calidad de los mismos para sus desarrolladores. Por lo cual, buscamos ofrecer un espacio en el que los desarrolladores puedan econtrar colaboradores que les ayuden con el testeo de sus proyectos, y así tener facilitar la tarea de búsqueda de errores y lograr una experiencia inolvidable para sus jugadores.</p>
            			</div>
        		</div>

        		<div className="articulo">
            			<picture className="articulo-img">
                			<img src="../src/assets/desarrolladores.jpg" alt="Desarrolladores"/>
            			</picture>
            			<div className="articulo-texto">
                			<h3>La Propuesta</h3>
                			<p>Una plataforma mediante la cual personas interedas en el desarrollo de videojuegos puedan encontrar a otras interesadas en participar del testeo de sus proyectos. Con lo cuál poder realizar actualizaciones y avances en los mismos, teniendo como respaldo las devoluciones recibidas por las iteracciones realizadas con su proyecto en la plataforma.</p>
            			</div>
        		</div>

			<div className="articulo">
            			<picture className="articulo-img">
                			<img src="../src/assets/colaboracion.jpg" alt="Colaboracion"/>
            			</picture>
            			<div className="articulo-texto invertido">
                			<h3>El Objetivo</h3>
                			<p>Buscamos que los desarrollafores de videojuegos con menos recursos tengan un medio por el cual mediante al trabajo colaborativo poder mejorar la calidad general de sus proyectos, a partir de las contribuciones recibidas por las personas interesadas en sus proyectos.</p>
            			</div>
        		</div>
    		</div>
	</section>
        </main>
    
    )
}

export  default Home
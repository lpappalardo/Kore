import React, { useContext } from "react";
import { AuthContext } from '../../context/AuthContext'
import { updateTabTitle } from '../../utils/updateTabTitle'
import {useNavigate, NavLink} from "react-router-dom"

const Home = () => {

    const {user} = useContext(AuthContext)

    console.log(user)

    updateTabTitle('Inicio')

    return (
        <main>
            <section className="bienvenida">

                <div className="container">
                    <div className="contenidoBeinvenida">
                    <h1>
                        Testeo  Accesible para Desarrolladores de Videojuegos
                    </h1>
                    <p>A travez del desarrollo de una sana comunidad fomentamos que nuestros usuarios colaboren entre sí para hacer crecer sus proyectos.   </p>
                    <NavLink className="botonPrincipal" to="/proyectitos">Descubre proyectos</NavLink>
                    </div>
                </div>
    
            </section>

            <section id="propuestas" className="seccion container">
            {user && user.role === 'user' && (
                <h1 className='centrar'>¡Bienvenido/a {user.username}!</h1>
                )}
                {user && user.role === 'admin' && (
                <h1 className='centrar'>Bienvenido/a al panel de administración</h1>
                )}
            
                <div className="articulos">
                    <div className="articulo">
                            <picture className="articulo-img">
                                <img src="../src/assets/desarrollador.jpg" alt="Desarrollador"/>
                            </picture>
                            <div className="articulo-texto invertido">
                                <h2>Sobre Kore</h2>
                                <p>No solo nos apasionan los videojuegos, sino tambien el desarrollo de los mismos, por lo cual somos conscientes de la dificultad que presenta asegurar la calidad de los mismos para sus desarrolladores. Por lo cual, buscamos ofrecer un espacio en el que los desarrolladores puedan econtrar colaboradores que les ayuden con el testeo de sus proyectos, y así tener facilitar la tarea de búsqueda de errores y lograr una experiencia inolvidable para sus jugadores.</p>
                            </div>
                    </div>

                    <div className="articulo">
                            <picture className="articulo-img">
                                <img src="../src/assets/desarrolladores.jpg" alt="Desarrolladores"/>
                            </picture>
                            <div className="articulo-texto">
                                <h2>La Propuesta</h2>
                                <p>Una plataforma mediante la cual personas interedas en el desarrollo de videojuegos puedan encontrar a otras interesadas en participar del testeo de sus proyectos. Con lo cuál poder realizar actualizaciones y avances en los mismos, teniendo como respaldo las devoluciones recibidas por las iteracciones realizadas con su proyecto en la plataforma.</p>
                            </div>
                    </div>

                    <div className="articulo">
                            <picture className="articulo-img">
                                <img src="../src/assets/colaboracion.jpg" alt="Colaboracion"/>
                            </picture>
                            <div className="articulo-texto invertido">
                                <h2>El Objetivo</h2>
                                <p>Buscamos que los desarrollafores de videojuegos con menos recursos tengan un medio por el cual mediante al trabajo colaborativo poder mejorar la calidad general de sus proyectos, a partir de las contribuciones recibidas por las personas interesadas en sus proyectos.</p>
                            </div>
        		    </div>
    		    </div>
	        </section>

            <section class="container caracteristicas-container">

                <h2>Nuestros servicios</h2>
                <div class="caracteristicas">
                    <div class="caracteristica">
                        <div class="caracteristica-img">
                            <img src="../../../src/assets/home/upload.png" alt="Subir archivo"/>
                        </div>    
                        <div class="caracteristica-texto">
                            <p>Publica proyectos</p>
                        </div>
                    </div>

                    <div class="caracteristica">
                        <div class="caracteristica-img">
                            <img src="../../../src/assets/home/game.png" alt="Control de videojuegos"/>
                        </div>
                        <div class="caracteristica-texto">
                            <p>Prueba proyectos</p>
                        </div>
                    </div>

                    <div class="caracteristica">
                        <div class="caracteristica-img">
                            <img src="../../../src/assets/home/gift.png" alt="Regalo"/>
                        </div>
                        <div class="caracteristica-texto">
                            <p>Recibe recompensas</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    
    )
}

export  default Home
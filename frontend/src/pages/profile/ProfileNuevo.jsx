import React, { useContext, useState } from 'react'
import { ApiContext } from '../../context/ApiContext'
import { PersonalProyects } from "../../components/proyects/PersonalProyects"
import { Observations } from "../../components/observations/Oservations"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { AuthContext } from '../../context/AuthContext/'
import { Link } from 'react-router-dom'
import { updateTabTitle } from '../../utils/updateTabTitle'
import { useProjects } from '../../hooks/useProjects'
import { useObservations } from '../../hooks/useObservations'

export const Profile = () => {

  updateTabTitle('Perfil')

  const {mappedPublicados, setProjects} = useProjects()
  const {mappedOservaciones, setObservations} = useObservations()

  const {user} = useContext(AuthContext)

  const publicadosUsuario = mappedPublicados.filter((publicado) => publicado.userId == user._id)

  const observacionesUsuario = mappedOservaciones.filter((observacion) => observacion.userId == user._id)

  console.log(user)

  return (
    <>
    {
      <main>
        <section className='perfil container'>
          <h1>Mi Perfil</h1>
          <div className='perfil-personal'> 
          {/* <div className='contenidoPerfil'> */}
            <div class='perfil-personal-imagen'>
              <img src="../../../src/assets/img/logoGrande.png" alt="Imagen Perfil" />
            </div>

            <div class='perfil-personal-datos'>
              <div className='elementoPerfil'>
                <h2>Nombre de usuario</h2>
                <p className='perfil-personal-datos-contenido'>RafaDev</p>
              </div>
              <div className='elementoPerfil'>
                <h2>Correo de usuario</h2>
                <p className='perfil-personal-datos-contenido'>rafa@gmail.com</p>
              </div>
              <Link className='botonPrincipal' to={`/usuarioPerfilEditar`}>Editar Perfil</Link>
            </div>
          </div>
        </section>

        <section className='publicaciones container interraccionPerfil'>
        <h2>Mis notificaciones</h2>
	      <div>
		      <ul>
			      <li>
                <div className="solicitud">
                                <p className="cardTitlte">Solicitud Amistad</p>
                                <p>Fecha: 15/12/2024</p>
                                <div div className='row'>
                                <Link className=" botonPrincipal" to={`/detalle2/`}>Ver</Link>
                                <Link className="botonDanger" to={``}>Eliminar</Link>
                                </div>
                </div>
			      </li>

            <li>
                <div className="solicitud">
                                <p className="cardTitlte">Solicitud Testeo Cerrado</p>
                                <p>Fecha: 15/12/2024</p>
                                <div className='row'>
                                <Link className=" botonPrincipal" to={`/detalle2/`}>Ver</Link>
                                <Link className="botonDanger" to={``}>Eliminar</Link>
                                </div>
                                
                </div>
			      </li>
		      </ul>
	      </div>
        </section>

        <section className="publicaciones container interraccionPerfil">
                <h2>Proyectos Subidos</h2>
                <Link className='botonPrincipal' to={`/generarProyecto`}>Generar Proyecto</Link>
                <div>
                      <ul className="proyects">
                        <div className="proyect">
                            <img src="../../../src/assets/img/tunic.png" alt="Proyecto Azul" />
                            <div className="proyect-text bgdGray">
                                <p className="cardTitlte">Proyecto Rojo</p>
                                <p className='genero'>Testeo cerrado</p>
                                <div className="contenedor-links">
                                                                        <Link className=" botonPrincipal" to={`/detalle2/`}>Ver</Link>
                                                                        <Link className=" botonPrincipal" to={``}>Editar</Link>
                                                                        <Link className="botonDanger" to={``}>Eliminar</Link>
                                </div>
                            </div>
                        </div>
                      </ul>
                </div>
        </section>
        <section className="publicaciones container interraccionPerfil">
                <h2>Contribuciones Realizadas</h2>
                <div>
                      <ul className="proyects">
                        <Link to={`/detalle1/`} className="proyect">
                            <img src="../../../src/assets/img/tunic.png" alt="Proyecto Azul" />
                            <div className="proyect-text bgdGray">
                                <p className="cardTitlte">Proyecto Azul</p>
                            </div>
                        </Link>
                      </ul>
                </div>
        </section>

        <section className='publicaciones container interraccionPerfil'>
          <h2>Mis amigos</h2>
	          <div>
		          {/* <ul>
			          <li>
				
			          </li>
		          </ul> */}
              <p>
                En este momento no tiene ningun amigo agregado
              </p>
	          </div>
        </section>

      </main>
    }
    </>
  )
}

export default Profile
import React from 'react'
import { Link } from 'react-router-dom'
import { TabTitle } from '../../../utils/TabTitle'
import { useProjects } from '../../../hooks/useProjects'

const ProjectsTable = () => {

    TabTitle('CRUD Proyectos')

  const {mappedPublicados} = useProjects()

  return (
    <main>
        <h1>Listado de proyectos</h1>

        <Link className='botonPrincipal' to={`/generarProyectoAdministracion`}>Generar Proyecto</Link>

        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre proyecto</th>
                    <th>Nombre usuario</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    mappedPublicados.map(prublicado => (
                    <tr>
                        <td>{ prublicado.id }</td>
                        <td>{ prublicado.title }</td>
                        <td>{ prublicado.userName }</td>

                        <td>
                            <div>
                                <Link className=" botonPrincipal" to={`/detalleAdministracion/${prublicado.id}`}>Ver</Link>
                                <Link className=" botonPrincipal" to={`/actualizarProyectoAdministracion/${prublicado.id}`}>Editar</Link>
                                <Link className="botonPrincipal" to={`/elimiarAdministracion/${prublicado.id}`}>Eliminar</Link>
                            </div>
                        </td>
                    </tr>
                    ))
                }
            </tbody>
        </table>
    </main>
  )
}

export {ProjectsTable}

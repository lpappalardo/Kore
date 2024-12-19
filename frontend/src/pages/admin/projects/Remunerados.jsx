import React from 'react'
import { Link } from 'react-router-dom'
import { updateTabTitle } from '../../../utils/updateTabTitle'
import { useProjects } from '../../../hooks/useProjects'

const Remunerados = () => {

    updateTabTitle('Proyectos Remunerados')

  const {mappedPublicados} = useProjects()

  const remunerados = mappedPublicados.filter((publicado) => publicado.tipoProyecto == "remunerado")

  return (
    <main className="containerTable">
        <h1 className='spacingBot'>proyectos Remunerados</h1>

        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre proyecto</th>
                    <th>Nombre usuario</th>
                    <th>Estado proyecto</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    remunerados.map(prublicado => (
                    <tr>
                        <td>{ prublicado.id }</td>
                        <td>{ prublicado.title }</td>
                        <td>{ prublicado.userName }</td>
                        <td>{ prublicado.estado }</td>


                        {
                              (prublicado.estado == "inactivo" || prublicado.estado == "rechazado" ) ?
                                <td>
                                    <div>
                                        <Link className=" botonPrincipal" to={`/detalleRemunerado/${prublicado.id}`}>Ver</Link>
                                    </div>
                                </td>
                              : 
                              <td>
                                <div>
                                  <Link className=" botonPrincipal" to={`/detalleRemunerado/${prublicado.id}`}>Asignar Testers</Link>
                                </div>
                            </td>
                        }
                    </tr>
                    ))
                }
            </tbody>
        </table>
    </main>
  )
}

export {Remunerados}

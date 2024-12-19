import React from 'react'
import { Link } from 'react-router-dom'
import { updateTabTitle } from '../../../utils/updateTabTitle'
import { useUsers } from '../../../hooks/useUsers'
import { useParams } from 'react-router-dom'

const ListTesters = () => {

    updateTabTitle('Lista de Testers')

  const {usuariosCargados} = useUsers()

  console.log(usuariosCargados)

  let usuariosTesters = usuariosCargados.filter(usuario => (usuario.role == "tester"))

  const params = useParams()
    const proyectId = params.id

  return (
    <main className="containerTable">
        <h1 className='spacingBot'>Listado de testers</h1>


        {
            <ul className="proyects">
                {
                    usuariosTesters.map(usuario => (
                        <div className="proyectPersonal" key={usuario.id}>
                            <img src="../../../src/assets/img/card.png" alt={usuario.username} />
                            <div>
                            <Link to={`/detalleUsuario/${usuario.id}`}>{usuario.username}</Link>
        
                            <Link className=" botonPrincipal" to={`/asignarTesteo/${usuario.id}/${proyectId}`}>asignar testeo</Link>
                            </div>
                                                        
                        </div>
                    ))
                }
            </ul>
        }

        {/* <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre usuario</th>
                    <th>Correo usuario</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    usuariosCargados.map(usuario => (
                    <tr>
                        <td>{ usuario.id }</td>
                        <td>{ usuario.username }</td>
                        <td>{ usuario.email }</td>
                        <td>{ usuario.role }</td>

                        <td>
                            <div>
                                <Link className=" botonPrincipal" to={`/detalleUsuario/${usuario.id}`}>asignar testeo</Link>
                            </div>
                        </td>
                    </tr>
                    ))
                }
            </tbody>
        </table> */}
    </main>
  )
}

export {ListTesters}

import React from 'react'
import { Link } from 'react-router-dom'
import { TabTitle } from '../../../utils/TabTitle'
import { useUsers } from '../../../hooks/useUsers'

const UsersTable = () => {

  TabTitle('CRUD Usuarios')

  const {usuariosCargados} = useUsers()

  console.log(usuariosCargados)

  return (
    <main>
        <h1>Listado de usuarios</h1>

        <Link className='botonPrincipal' to={`/generarUsuario`}>Generar Usuario</Link>

        <table>
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

                        <td>
                            <div>
                                <Link className=" botonPrincipal" to={`/detalleUsuario/${usuario.id}`}>Ver</Link>
                                <Link className=" botonPrincipal" >Editar</Link>
                                <Link className="botonPrincipal" to={`/elimiarUsuario/${usuario.id}`}>Eliminar</Link>
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

export {UsersTable}

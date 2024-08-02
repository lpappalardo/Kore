import React from 'react'
import { useParams } from 'react-router-dom'
import { TabTitle } from '../../../utils/TabTitle'
import { useUser } from '../../../hooks/useUser'

const User = () => {

    TabTitle('Eliminar Usuario')

  const params = useParams()
  const usuarioId = params.id

  const {usuarioCargado} = useUser(usuarioId)

  console.log(usuarioCargado)

  return (
    <>
    {usuarioCargado && (
    <main>
      <h1>Perfil usuario</h1>
        <section className='detalle'>
          <img src="../../../../src/assets/img/logoGrande.png" alt={usuarioCargado.username} />
          <div className='contenido'>
            <h2>Nombre usuario</h2>
            <p>{usuarioCargado.username}</p>
            <h2>Correo usuario</h2>
            <p>{usuarioCargado.email}</p>
          </div>
        </section>
    </main>
    )}
    </>
  )
}

export {User}

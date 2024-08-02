import React from 'react'
import { useParams } from 'react-router-dom'
import { updateTabTitle } from '../../../utils/updateTabTitle'
import { useUser } from '../../../hooks/useUser'

const User = () => {

  updateTabTitle('Eliminar Usuario')

  const params = useParams()
  const usuarioId = params.id

  const {usuarioCargado} = useUser(usuarioId)

  console.log(usuarioCargado)

  return (
    <>
    {usuarioCargado && (
    <main className='container'>
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

import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ApiContext } from '../../context/ApiContext'
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { AuthContext } from '../../context/AuthContext/'
import { TabTitle } from '../../utils/TabTitle'
import {toast} from "sonner";

const DeleteProject = () => {

  TabTitle('Eliminar Proyecto')

  const params = useParams()
  const detalleId = params.id

  const {mappedPublicados} = useContext(ApiContext)

  const detallePublicado = mappedPublicados.filter(project => (project.id == detalleId))[0]

  const {user} = useContext(AuthContext)

  const navigate = useNavigate()

  const [error, setError] = useState("")

  const handleDelete = (e, id) => {
    e.preventDefault()
    axios.delete(`http://localhost:3000/proyectos/eliminarProyecto/${id}`)
    .then((res) => {
      console.log(res)
      navigate('/proyectos')
      // toast.success('Se ha eliminado el proyecto ' + projectData.name + 'con éxito!');
      toast.success('Se ha eliminado el proyecto con éxito!');
    })
    .catch((error) => {
      setError(error.respose.data.message)
      console.log(error)
      toast.error('Error al crear el proyecto');
    })
  }

  return (
    <>
    {
      <main className='seccion container'>
        <h1>¿Está seguro que desea eliminar este proyecto?</h1>
        <section className='detalle'>
          <img src="../../../src/assets/img/logoGrande.png" alt={detallePublicado.title} />
          <div className='contenido'>
            <h3>{detallePublicado.title}</h3>
            <p>{detallePublicado.description}</p>
            <ul className='listaGeneros'>
            {detallePublicado.categorias.map(categoria => 
                <li className='genero'>{categoria}</li>
              )}
            </ul>
            <ul className='listaGeneros'>
            {detallePublicado.tecnologias.map(tecnologia => 
                <li className='genero'>{tecnologia}</li>
              )}
            </ul>
          </div>
        </section>
        <button
         onClick={(e) => handleDelete(e, detallePublicado.id)}
              className='botonPrincipal'
        >
            Eliminar
        </button>

        
      </main>
    }
    </>
  )
}

export {DeleteProject}
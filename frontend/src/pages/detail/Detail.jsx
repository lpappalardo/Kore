import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ApiContext } from '../../context/ApiContext'

export const Detail = () => {
  const params = useParams()
  const detalleId = params.id

  const {mappedPublicados, setProjects} = useContext(ApiContext)

  const detallePublicado = mappedPublicados.filter(project => (project.id == detalleId))[0]

  return (
    <>
    {
      <div>
        <section className='detalle container'>
          <img src={detallePublicado.title} alt={detallePublicado.title} />
          <div className='contenido'>
            <h2>{detallePublicado.title}</h2>
            <p>{detallePublicado.description}</p>
            {/* <ul className='listaGeneros'>
            {detallePublicado.generos.map(genero => 
                <li className='genero'>{genero}</li>
              )}
            </ul> */}
            <button className='botonPrincipal'>Descargar</button>
          </div>
        </section>

        <section className='observacion container'>
          <form className='formulario' action="" method='POST'>
            <h3>Dejar Observación</h3>

            <div>
              <label for="nombre">Nombre:*</label>
              <input type='text' name="nombre" id="nombre" placeholder="Nombre..." required
              // value={projectData.name}
              // onChange={(e) => setProjectData({...projectData, name: e.target.value})}
              ></input>
            </div>
            <div>
              <label for="disenio">Sobre el diseño:</label>
              <textarea name="disenio" id="disenio" placeholder="Sobre el diseño..." required></textarea>
            </div>
            <div>
              <label for="arte">Sobre el arte:</label>
              <textarea name="arte" id="arte" placeholder="Sobre el arte..." required></textarea>
            </div>
            <div>
              <label for="tecnico">Sobre el apartado técnico:</label>
              <textarea name="tecnico" id="tecnico" placeholder="Sobre el apartado técnico..." required></textarea>
            </div>
            <div>
              <label for="generales">Generales*:</label>
              <textarea name="generales" id="generales" placeholder="Generales..." required></textarea>
            </div>
            <button className='botonPrincipal'>Enviar</button>
          </form>
        </section>
      </div>
    }
    </>
  )
}
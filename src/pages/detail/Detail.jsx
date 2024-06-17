import React from 'react'
import { useParams } from 'react-router-dom'
import publicadosProyects from "../../assets/mocks/proyectos.json"
import { Proyects } from "../../components/proyects/Proyects"

export const Detail = () => {
  const params = useParams()
  const detalleId = params.id

  const publicados = publicadosProyects.Search

    const mappedPublicados = publicados?.map(proyect => ({
        id: proyect.Id,
        title: proyect.Title,
        poster: proyect.Poster,
        identificador: proyect.Codigo,
        descripcion: proyect.Description,
        generos: proyect.Generos
    }))

    const detallePublicado = mappedPublicados.filter(proyect => (proyect.identificador == detalleId))[0]


  return (
    <>
    {
      <div>
        <section className='detalle container'>
          <img src={detallePublicado.poster} alt={detallePublicado.title} />
          <div className='contenido'>
            <h2>{detallePublicado.title}</h2>
            <p>{detallePublicado.descripcion}</p>
            <ul className='listaGeneros'>
            {detallePublicado.generos.map(genero => 
                <li className='genero'>{genero}</li>
              )}
            </ul>
            <button className='botonPrincipal'>Descargar</button>
          </div>
        </section>
        <section className='observacion container'>
          <form className='formulario' action="">
            <h3>Dejar Observación</h3>

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
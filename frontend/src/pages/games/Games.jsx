import React, { useContext, useState } from 'react'
import { Proyects } from "../../components/proyects/Proyects"
import { ApiContext } from '../../context/ApiContext'
import axios from "axios"
import {useNavigate} from "react-router-dom"

const Games = () => {
  const {mappedPublicados, setProjects} = useContext(ApiContext)

  const generos = ["Todas", "Accion", "Aventura", "Acertijos", "Suspenso", "Terror", "2D", "3D"]

  // let proyectosBuscados = mappedPublicados;

  // onClick={handleSearch}

  const [categoria, setCategoria] = useState({
    categoria: "",
  })

  const handleSelect = (e) => {
    setCategoria({categoria: e.target.value})
  }
  
  // console.log(categoria)

  const navigate = useNavigate()

  const [error, setError] = useState("")

  // const cargarProyectos = (proyectosBuscados) => {
  //   setCategoria({categoria: e.target.value})
  // }

  const handleSearch = (e) => {
    e.preventDefault()
    axios.post("http://localhost:3000/proyectos/categoria", categoria)
    .then((res) => {
      console.log(res)
      setProjects(res.data)
      // .map(re => ({
      //   id: re._id,
      //   title: re.name,
      //   description: re.description,
      //   categorias: re.categorias,
      // }))
      navigate('/proyectos')

    })
    .catch((error) => {
      setError(error.respose.data.message)
      console.log(error)
    })
  }

  console.log(mappedPublicados)

    return (
        <section className="publicaciones container">
                <h2>Proyectos publicados</h2>
                <form method='POST'>
                      <h3>Filtrar por categoría</h3>
                      <select name="" id="" onChange={handleSelect}>
                      {
                        generos.map(genero => (
                            <option value={genero}>{genero}</option>
                        ))
                      }
                      </select>
                  <button className='botonPrincipal' onClick={handleSearch}>Buscar</button>
                </form>
                <Proyects proyects={mappedPublicados} />
        </section>
    )
}

export  default Games
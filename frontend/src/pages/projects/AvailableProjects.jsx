import React, { useContext, useState } from 'react'
import { Proyects } from "../../components/proyects/Proyects"
import { ApiContext } from '../../context/ApiContext'
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { TabTitle } from '../../utils/TabTitle'
import { useProjects } from '../../hooks/useProjects'

const AvailableProjects = () => {

  TabTitle('Proyectos')

  const {mappedPublicados, setProjects} = useProjects()

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
        <main className="publicaciones container">
                <h1>Proyectos publicados</h1>
                <form method='POST'>
                      <h2>Filtrar por categoría</h2>
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
        </main>
    )
}

export default AvailableProjects
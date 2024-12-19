import React, { useContext, useState } from 'react'
import { Proyects } from "../../components/proyects/Proyects"
import { ApiContext } from '../../context/ApiContext'
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { updateTabTitle } from '../../utils/updateTabTitle'
import { useProjects } from '../../hooks/useProjects'

const AvailableProjects = () => {

  updateTabTitle('Proyectos')

  const {mappedPublicados, setProjects} = useProjects()

  const proyectosAbiertos = mappedPublicados.filter((proyecto) => proyecto.tipoProyecto == "abierto")

  const generos = ["Todas", "Accion", "Aventura", "Acertijos", "Suspenso", "Terror", "2D", "3D"]

  const [categoria, setCategoria] = useState({
    categoria: "",
  })

  const handleSelect = (e) => {
    setCategoria({categoria: e.target.value})
  }

  const navigate = useNavigate()

  const [error, setError] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()
    axios.post("http://localhost:3000/proyectos/categoria", categoria)
    .then((res) => {
      console.log(res)
      setProjects(res.data)
      navigate('/proyectos')

    })
    .catch((error) => {
      setError(error.respose.data.message)
      console.log(error)
    })
  }

  // console.log(mappedPublicados)

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
                <Proyects proyects={proyectosAbiertos} />
        </main>
    )
}

export default AvailableProjects
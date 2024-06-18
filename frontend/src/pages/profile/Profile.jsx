import React, { useContext, useState } from 'react'
import { ApiContext } from '../../context/ApiContext'
import { Proyects } from "../../components/proyects/Proyects"
import axios from "axios"
import {useNavigate} from "react-router-dom"

export const Profile = () => {

  const {mappedPublicados, setProjects} = useContext(ApiContext)

  const navigate = useNavigate()

  const [projectData, setProjectData] = useState({
    name: "",
    description: ""
  })

  const [error, setError] = useState("")

  const handleUpload = (e) => {
    e.preventDefault()
    axios.post("http://localhost:3002/proyectos/", projectData)
    .then((res) => {
      console.log(res)
      navigate('/admin')
    })
    .catch((error) => {
      setError(error.respose.data.message)
      console.log(error)
    })
  }

  return (
    <>
    {
      <div>
        <section className='observacion container'>
          <form className='formulario' action="" method='POST'>
            <h3>Subir Proyecto</h3>
            <div>
              <label for="nombre">Nombre:*</label>
              <input type='text' name="nombre" id="nombre" placeholder="Nombre..." required
              value={projectData.name}
              onChange={(e) => setProjectData({...projectData, name: e.target.value})}></input>
            </div>
            <div>
              <label for="descripcion">Descripción*:</label>
              <textarea name="descripcion" id="descripcion" placeholder="Descripcion..." required
              value={projectData.description}
              onChange={(e) => setProjectData({...projectData, description: e.target.value})}></textarea>
            </div>
            <button className='botonPrincipal' onClick={handleUpload}>Subir</button>
          </form>
        </section>

        <section className="publicaciones container">
                <h2>Proyectos Subidos</h2>
                <Proyects proyects={mappedPublicados} />
        </section>
      </div>
    }
    </>
  )
}

export default Profile
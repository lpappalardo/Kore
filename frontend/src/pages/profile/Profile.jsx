import React, { useContext, useState } from 'react'
import { ApiContext } from '../../context/ApiContext'
import { Proyects } from "../../components/proyects/Proyects"
import axios from "axios"
import {useNavigate} from "react-router-dom"

export const Profile = () => {

  const generos = ["Accion", "Aventura", "Acertijos", "Suspenso", "Terror", "2D", "3D"]

  const {mappedPublicados, setProjects} = useContext(ApiContext)

  const [checkedValues, setCheckedValues] = useState([])

  const navigate = useNavigate()

  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    categorias: []
  })

  const [error, setError] = useState("")

  

  const handleUpload = (e) => {
    setProjectData({...projectData, categorias: checkedValues});
    upload(e);
  }

  const upload = (e) => {
    e.preventDefault()
    console.log(projectData)

    axios.post("http://localhost:3002/proyectos/", projectData)
    .then((res) => {
      console.log(res)
      navigate('/admin')
      window.location.reload(true)
    })
    .catch((error) => {
      setError(error.respose.data.message)
      console.log(error)
    })
  }

  const handleCheck = (e) => {
    const {value, checked} = e.target

    if(checked){
      setCheckedValues(pre => [...pre, value])
    } else {
      setCheckedValues(pre => {
       return [...pre.filter(category => category !== value)]
      })
    }

    setProjectData({...projectData, categorias: checkedValues})
  }
  console.log(projectData)
  console.log(checkedValues)

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
              onChange={(e) => setProjectData({...projectData, name: e.target.value, categorias: checkedValues})}></input>
            </div>

            {/* <div>
              <label for="imagen">Imagen:*</label>
              <input type='file' name="imagen" id="imagen" required
              value={projectData.imagen}
              onChange={(e) => setProjectData({...projectData, imagen: e.target.files[0]})}></input>
            </div> */}

            <div>
              <label for="descripcion">Descripción*:</label>
              <textarea name="descripcion" id="descripcion" placeholder="Descripcion..." required
              value={projectData.description}
              onChange={(e) => setProjectData({...projectData, description: e.target.value, categorias: checkedValues})}></textarea>
            </div>

            <fieldset>
                <legend>Géneros</legend>
                <div>
                {
                generos.map(genero => (
                  <label>
                    <input
                        type="checkbox"
                        name={genero}
                        value={genero}
                        onChange={handleCheck}
                    />
                    {genero}
                  </label>
                ))
                }
                </div>
            </fieldset>


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
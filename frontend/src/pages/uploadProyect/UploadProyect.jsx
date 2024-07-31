import React, { useContext, useState } from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { AuthContext } from '../../context/AuthContext/'
import { TabTitle } from '../../utils/TabTitle'

const UploadProyect = () => {

  TabTitle('Generar Proyecto')

    const generos = ["Accion", "Aventura", "Acertijos", "Suspenso", "Terror", "Plataformas", "2D", "3D"]

  const tecnologias = ["Unity", "Unreal Engine", "Godot", "GameMaker Studio", "Blender", "Autodesk Maya", "ZBrush", "Photoshop", "Aseprite"]

    const [checkedValues, setCheckedValues] = useState([])
  const [checkedValuesTecnologias, setCheckedValuesTecnologias] = useState([])

  const {user} = useContext(AuthContext)

    const navigate = useNavigate()

  const [projectData, setProjectData] = useState({
    name: "",
    userId: user.id,
    userName: user.name,
    description: "",
    categorias: [],
    tecnologias: [],
  })

  const [error, setError] = useState("")

    const handleUpload = (e) => {
        console.log(projectData)
        upload(e);
      }
    
      const upload = (e) => {
        e.preventDefault()
        console.log(projectData)
    
        axios.post("http://localhost:3000/proyectos/", projectData)
        .then((res) => {
          console.log(res)
          navigate('/proyectos')
          window.location.reload(true)
        })
        .catch((error) => {
          setError(error.respose.data.message)
          console.log(error)
        })
      }
    
      const handleCheck = (e) => {
        const {value, checked} = e.target
        let newValues = checkedValues;
    
        if(checked){
          newValues.push(value) 
          setCheckedValues(newValues)
        } else {
          newValues = checkedValues.filter(category => category !== value)
          setCheckedValues(newValues)
        }
        setProjectData({...projectData, categorias: newValues})
    
      }
    
      const handleCheckTecnologia = (e) => {
        const {value, checked} = e.target
        let newValues = checkedValuesTecnologias;
    
        if(checked){
          newValues.push(value) 
          setCheckedValuesTecnologias(newValues)
        } else {
          newValues = checkedValuesTecnologias.filter(tecnology => tecnology !== value)
          setCheckedValuesTecnologias(newValues)
        }
        setProjectData({...projectData, tecnologias: newValues})
    
      }

  return (
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

            <fieldset>
                <legend>Tecnologías</legend>
                <div>
                {
                tecnologias.map(tecnologia => (
                  <label>
                    <input
                        type="checkbox"
                        name={tecnologia}
                        value={tecnologia}
                        onChange={handleCheckTecnologia}
                    />
                    {tecnologia}
                  </label>
                ))
                }
                </div>
            </fieldset>

            <button className='botonPrincipal' onClick={handleUpload}>Subir</button>
          </form>
        </section>
  )
}

export {UploadProyect}
// export default uploadProyecto

import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ApiContext } from '../../context/ApiContext'
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { AuthContext } from '../../context/AuthContext/'
import { updateTabTitle } from '../../utils/updateTabTitle'
import {toast} from "sonner";
import { useProjects } from '../../hooks/useProjects'

const UpdateProject = () => {

  // const [errorsValidation, setErrorsValidation] = useState({})

  updateTabTitle('Editar Proyecto')

    const params = useParams()
    const publicadoId = params.id

    const generos = ["Accion", "Aventura", "Acertijos", "Suspenso", "Terror", "2D", "3D"]
    const tecnologias = ["Unity", "Unreal Engine", "Godot", "GameMaker Studio", "Blender", "Autodesk Maya", "ZBrush", "Photoshop", "Aseprite"]

    const [projects, setProjects ] = useState([])

    const [checkedValues, setCheckedValues] = useState([])
  
    const {user} = useContext(AuthContext)
  
    const navigate = useNavigate()
  
    // const publicadosUsuario = projects.filter((publicado) => publicado.id == publicadoId)[0]

    const [projectData, setProjectData] = useState({
      // name: publicadosUsuario.title,
      name: "",
      // userId: user._id,
      // userName: user.username,
      description: "",
      categorias: "",
      tecnologias: "",
      enlace: "",
      // description: publicadosUsuario.description,
      // categorias: publicadosUsuario.categorias,
      // tecnologias: publicadosUsuario.tecnologias,
    })
  
    const [error, setError] = useState("")
  
    const handleUpload = (e, id) => {

      // const validationErrors = {}

      // if(!projectData.name.trim()) {
      //   validationErrors.name = "El nombre del proyecto es requerido"
      // }

      // if(!projectData.description.trim()) {
      //   validationErrors.description = "La descripción del proyecto es requerida"
      // } 

      // if(projectData.categorias.length < 1) {
      //     validationErrors.categorias = "Es necesario seleccionar al menos 1 categoría"
      // }  
    
      // if(projectData.tecnologias.length < 1){
      //     validationErrors.tecnologias = "Es necesario seleccionar al menos 1 tecnología"
      // }

      // setErrorsValidation(validationErrors)  
    
      // if(Object.keys(validationErrors).length === 0) {
        setProjectData({...projectData, categorias: checkedValues});
        upload(e, id);
      // } else {
      //   toast.error('Error al editar el proyecto');
      // }
    }
  
    const upload = (e, id) => {
      e.preventDefault()
      console.log(projectData)

      axios.put(`http://localhost:3000/proyectos/editarProyecto/${id}`, projectData)
      .then((res) => {
        console.log(res)
        navigate('/proyectos')
        toast.success('Se ha editado el proyecto con éxito!');
      })
      .catch((error) => {
        setError(error.respose.data.message)
        console.log(error)
        toast.error('Error al editar el proyecto');
      })
    }

    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };

    const handleCheck = (e) => {
      const {value, checked} = e.target
      let newValues = projectData.categorias;

      if(checked){
        newValues.push(value) 
        setCheckedValues(newValues)
      } else {
        newValues = projectData.categorias.filter(category => category !== value)
        setCheckedValues(newValues)
      }
      setProjectData({...projectData, categorias: newValues})
  
    }
  
    const handleCheckTecnologia = (e) => {
      const {value, checked} = e.target
      let newValues = projectData.tecnologias;

      if(checked){
        newValues.push(value) 
        setCheckedValues(newValues)
      } else {
        newValues = projectData.tecnologias.filter(tecnology => tecnology !== value)
        setCheckedValues(newValues)
      }
      setProjectData({...projectData, tecnologias: newValues})
  
    }
  
    return (
      <>
        <main>
          <section className='observacion container'>
            <form className='formulario' action="" method='PUT'>
              <h1>Actualizar Proyecto</h1>
              <div>
                <label for="nombre">Nombre:*</label>
                <input type='text' name="nombre" id="nombre" placeholder="Nombre..." required
                value={projectData.name}
                onChange={(e) => setProjectData({...projectData, name: e.target.value, categorias: checkedValues})}></input>
                {/* {errorsValidation.name && <p>{errorsValidation.name}</p>}   */}
              </div>
  
              <div>
                <label for="descripcion">Descripción*:</label>
                <textarea name="descripcion" id="descripcion" placeholder="Descripcion..." required
                value={projectData.description}
                onChange={(e) => setProjectData({...projectData, description: e.target.value, categorias: checkedValues})}></textarea>
                {/* {errorsValidation.description && <p>{errorsValidation.description}</p>}   */}
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
                          defaultChecked={projectData.categorias.includes(genero)}
                      />
                      {genero}
                    </label>
                  ))
                  }
                  </div>
                  {/* {errorsValidation.categorias && <p>{errorsValidation.categorias}</p>}  */}
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
                        defaultChecked={projectData.tecnologias.includes(tecnologia)}
                    />
                    {tecnologia}
                  </label>
                ))
                }
                </div>
                {/* {errorsValidation.tecnologias && <p>{errorsValidation.tecnologias}</p>}  */}
            </fieldset>

            <div>
              <label htmlFor="enlace">Enlace de descarga del Proyecto:*</label>
              <input type='text' name="enlace" id="enlace" placeholder="Enlace..." required
              value={projectData.enlace}
              onChange={(e) => setProjectData({...projectData, enlace: e.target.value, categorias: checkedValues})}></input>
              {/* {errorsValidation.enlace && <p className='errorValidation'>{errorsValidation.enlace}</p>}   */}
            </div>
  
              <button className='botonPrincipal' onClick={(e) => handleUpload(e, publicadoId)}>Editar</button>
            </form>
          </section>

        </main>
      </>
    )
}

export {UpdateProject}

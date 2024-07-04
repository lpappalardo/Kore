import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ApiContext } from '../../context/ApiContext'
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { AuthContext } from '../../context/AuthContext/'

const Update = () => {
    const params = useParams()
    const publicadoId = params.id

    const generos = ["Accion", "Aventura", "Acertijos", "Suspenso", "Terror", "2D", "3D"]
    const tecnologias = ["Unity", "Unreal Engine", "Godot", "GameMaker Studio", "Blender", "Autodesk Maya", "ZBrush", "Photoshop", "Aseprite"]

    const {mappedPublicados} = useContext(ApiContext)
  
    const [checkedValues, setCheckedValues] = useState([])
  
    const {user} = useContext(AuthContext)
  
    const navigate = useNavigate()
  
    const publicadosUsuario = mappedPublicados.filter((publicado) => publicado.id == publicadoId)[0]

    const [projectData, setProjectData] = useState({
      name: publicadosUsuario.title,
      userId: user.id,
      userName: user.name,
      description: publicadosUsuario.description,
      categorias: publicadosUsuario.categorias,
      tecnologias: publicadosUsuario.tecnologias,
    })

    console.log(mappedPublicados)
  console.log(publicadosUsuario)
  
    const [error, setError] = useState("")
  
    const handleUpload = (e, id) => {
      setProjectData({...projectData, categorias: checkedValues});
      upload(e, id);
    }
  
    const upload = (e, id) => {
      e.preventDefault()
      console.log(projectData)
  
      axios.put(`http://localhost:3000/proyectos/editarProyecto/${id}`, projectData)
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
  
    // const handleCheck = (e) => {
    //   const {value, checked} = e.target
    // let newValues = projectData.categorias;

    // if(checked){
    //   newValues.push(value) 
    //   setCheckedValues(newValues)
    // }else {
    //   newValues.filter(category => category !== value)
    //   setCheckedValues(newValues)
    // }

    // setProjectData({...projectData, categorias: newValues})

    // }

    const handleCheck = (e) => {
      const {value, checked} = e.target
      let newValues = projectData.categorias;

      if(checked){
        newValues.push(value) 
        setCheckedValues(newValues)
      } else {
        newValues = projectData.categorias.filter(category => category !== value)
        setCheckedValues(newValues)
        console.log(newValues)
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
        console.log(newValues)
      }
      setProjectData({...projectData, tecnologias: newValues})
  
    }
  
    return (
      <>
      {
        <div>
          <section className='observacion container'>
            <form className='formulario' action="" method='PUT'>
              <h3>Actualizar Proyecto</h3>
              <div>
                <label for="nombre">Nombre:*</label>
                <input type='text' name="nombre" id="nombre" placeholder="Nombre..." required
                value={projectData.name}
                onChange={(e) => setProjectData({...projectData, name: e.target.value, categorias: checkedValues})}></input>
              </div>
  
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
                          defaultChecked={projectData.categorias.includes(genero)}
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
                        defaultChecked={projectData.tecnologias.includes(tecnologia)}
                    />
                    {tecnologia}
                  </label>
                ))
                }
                </div>
            </fieldset>
  
  
              <button className='botonPrincipal' onClick={(e) => handleUpload(e, publicadoId)}>Subir</button>
            </form>
          </section>

        </div>
      }
      </>
    )
}

export {Update}
// export default Update

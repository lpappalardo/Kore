import React, { useContext, useState } from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { AuthContext } from '../../context/AuthContext/'
import { TabTitle } from '../../utils/TabTitle'
import {toast} from "sonner";

const UploadProject = () => {

  const [errorsValidation, setErrorsValidation] = useState({})

  const [file, setFile] = useState(null);

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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

    const handleUpload = (e) => {
      console.log(projectData)

      const validationErrors = {}

      if(!projectData.name.trim()) {
        validationErrors.name = "El nombre del proyecto es requerido"
      }

      if(!projectData.description.trim()) {
        validationErrors.description = "La descripción del proyecto es requerida"
      } 

      if(projectData.categorias.length < 1) {
          validationErrors.categorias = "Es necesario seleccionar al menos 1 categoría"
      }  
    
      if(projectData.tecnologias.length < 1){
          validationErrors.tecnologias = "Es necesario seleccionar al menos 1 tecnología"
      }

      setErrorsValidation(validationErrors)  
    
      if(Object.keys(validationErrors).length === 0) {
        upload(e);
      } else {
        toast.error('Error al crear el proyecto');
      }
    }

    const upload = (e) => {
      e.preventDefault()

      axios.post("http://localhost:3000/proyectos/", projectData)
      .then((res) => {
        console.log(res)
        toast.success('Proyecto creado!');
        navigate('/proyectos')
        window.location.reload(true)
      })
      .catch((error) => {
        setError(error.respose.data.message)
        console.log('Error:', error)
        toast.error('Error al crear el proyecto');
      })
    }
    
      // const upload = async  (e) => {
      //   e.preventDefault()

      //   const formData = new FormData();
      //   Object.keys(projectData).forEach(key => formData.append(key, projectData[key]));
      //   if (file) {
      //       formData.append('image', file);
      //   }

      //   try {
      //     await axios.post("http://localhost:3000/proyectos/", formData, {
      //       headers: {
      //         'Content-Type': 'multipart/form-data',
      //       },
      //     });
      //     toast.success('Proyecto creado!');
      //     navigate('/proyectos');
      //   } catch (error) {
      //     console.error('Error:', error);
      //     toast.error('Error al crear el proyecto');
      //   }
      //   // .then((res) => {
      //   //   console.log(res)
      //   //   navigate('/proyectos')
      //   //   window.location.reload(true)
      //   // })
      //   // .catch((error) => {
      //   //   setError(error.respose.data.message)
      //   //   console.log(error)
      //   // })
      // }
    
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
    <main className='observacion container'>
          <form className='formulario' action="" method='POST'>
            <h1>Generar Proyecto</h1>
            <div>
              <label htmlFor="nombre">Nombre:*</label>
              <input type='text' name="nombre" id="nombre" placeholder="Nombre..." required
              value={projectData.name}
              onChange={(e) => setProjectData({...projectData, name: e.target.value})}></input>
              {errorsValidation.name && <p>{errorsValidation.name}</p>}  
            </div>

            <div>
              <label htmlFor="descripcion">Descripción*:</label>
              <textarea name="descripcion" id="descripcion" placeholder="Descripcion..." required
              value={projectData.description}
              onChange={(e) => setProjectData({...projectData, description: e.target.value})}></textarea>
              {errorsValidation.description && <p>{errorsValidation.description}</p>}  
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
                {errorsValidation.categorias && <p>{errorsValidation.categorias}</p>} 
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
                {errorsValidation.tecnologias && <p>{errorsValidation.tecnologias}</p>} 
            </fieldset>

            <div className="mb-3">
              <label htmlFor="image" className="form-label">Imagen:</label>
              <input type="file" className="form-control" id="image" name="image" onChange={handleFileChange}/>
            </div>

            <button className='botonPrincipal' onClick={handleUpload}>Subir</button>
          </form>
    </main>
  )
}

export {UploadProject}

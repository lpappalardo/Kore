import React, { useContext, useState } from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { AuthContext } from '../../context/AuthContext/'
import { updateTabTitle } from '../../utils/updateTabTitle'
import {toast} from "sonner";

const UploadProject = () => {

  const [errorsValidation, setErrorsValidation] = useState({})

  const [file, setFile] = useState(null);

  const [time, setTime] = useState(new Date);

  let anio = time.getFullYear();
  let mes = time.getMonth() + 1;
  let dia = time.getDate();

  let fecha = dia + "/" + mes + "/" + anio;
  let fechaAbsoluta = anio * 10000 + mes * 100 + dia;

  updateTabTitle('Generar Proyecto')

  const generos = ["Accion", "Aventura", "Acertijos", "Suspenso", "Terror", "Plataformas", "2D", "3D"]

  const tecnologias = ["Unity", "Unreal Engine", "Godot", "GameMaker Studio", "Blender", "Autodesk Maya", "ZBrush", "Photoshop", "Aseprite"]

  const [checkedValues, setCheckedValues] = useState([])
  const [checkedValuesTecnologias, setCheckedValuesTecnologias] = useState([])

  const {user} = useContext(AuthContext)
  console.log(user)

  const navigate = useNavigate()

  const [projectData, setProjectData] = useState({
    name: "",
    userId: user._id,
    userName: user.username,
    description: "",
    categorias: [],
    tecnologias: [],

    fecha: fecha,
    fechaAbsoluta: fechaAbsoluta,

    tipoProyecto: "",
    enlace: "",
  })

  const [error, setError] = useState("")


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

      if(!projectData.tipoProyecto.trim()){
        validationErrors.tipoProyecto = "Es necesario seleccionar la categoría del proyecto"
    }

      if(!projectData.enlace.trim()){
        validationErrors.enlace = "El enlace del proyecto es requerido"
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
        navigate('/proyectos')
        toast.success('El Proyecto ' + projectData.name + ' ha sido creado!');
      })
      .catch((error) => {
        setError(error.respose.data.message)
        console.log('Error:', error)
        toast.error('Error al crear el proyecto');
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

      const handleChangeRadio = (e) => {
        setProjectData({...projectData, tipoProyecto: e.target.value})
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
              {errorsValidation.name && <p className='errorValidation'>{errorsValidation.name}</p>}  
            </div>

            <div>
              <label htmlFor="descripcion">Descripción*:</label>
              <textarea name="descripcion" id="descripcion" placeholder="Descripcion..." required
              value={projectData.description}
              onChange={(e) => setProjectData({...projectData, description: e.target.value})}></textarea>
              {errorsValidation.description && <p className='errorValidation'>{errorsValidation.description}</p>}  
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
                {errorsValidation.categorias && <p className='errorValidation'>{errorsValidation.categorias}</p>} 
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
                {errorsValidation.tecnologias && <p className='errorValidation'>{errorsValidation.tecnologias}</p>} 
            </fieldset>


            <div>
              <label htmlFor="enlace">Enlace de descarga del Proyecto:*</label>
              <input type='text' name="enlace" id="enlace" placeholder="Enlace..." required
              value={projectData.enlace}
              onChange={(e) => setProjectData({...projectData, enlace: e.target.value})}></input>
              {errorsValidation.enlace && <p className='errorValidation'>{errorsValidation.enlace}</p>}  
            </div>

            
            <div className='elemFormulario'>
                <legend className='titleFormulario'>Seleccionar categoría de proyecto*:</legend>
                <p>Al momento de crear un proyecto debe selecionarse una categoria para el mismo. Puedo ser "abierto" caso en el cual cualquier persona tendra acceso a tu proyecto. También puede ser "cerrado", en este caso solo se podran acceder las personas que hayan recibido una invitacion, estas se envian a travez del proyecto generado en el perfil del usuario. Y finalmente remunerado, en este caso un administrador de la prataforma se pondra en contacto contigo para poder el perfil de los posibles testers y acordar el monto a abonar, una vez resuelto esto el administrador activara el proyecto en la plataforma para que se pueda acceder al mismo.</p>

                <div className='radioFormulario'>
                  <input type="radio" id="abierto" name="tipoProyecto" value="abierto" onChange={handleChangeRadio}/>
                  <label for="abierto">Abierto</label>
                </div>

                <div className='radioFormulario'>
                  <input type="radio" id="cerrado" name="tipoProyecto" value="cerrado" onChange={handleChangeRadio}/>
                  <label for="cerrado">Cerrado</label>
                </div>

                <div className='radioFormulario'>
                  <input type="radio" id="remunerado" name="tipoProyecto" value="remunerado" onChange={handleChangeRadio}/>
                  <label for="remunerado">Remunerado</label>
                </div>

                {errorsValidation.tipoProyecto && <p className='errorValidation'>{errorsValidation.tipoProyecto}</p>} 
            </div>

            <button className='botonPrincipal' onClick={handleUpload}>Subir</button>
          </form>
    </main>
  )
}

export {UploadProject}

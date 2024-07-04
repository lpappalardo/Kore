import { createContext, useEffect, useState } from "react";
import axios from "axios"

export const ApiContext = createContext();

export const ApiConextProvider = ({children}) => {

    const [loading, setLoading] = useState([])
    const [projects, setProjects ] = useState([])

    const [loadingObservation, setLoadingObservation] = useState([])
    const [observations, setObservations ] = useState([])

    useEffect(() => {
    setLoading(true)
    axios.get("http://localhost:3000/proyectos")
    .then(res => {
      setProjects(res.data)
      setLoading(false)
    })
    .catch((error) => {
      setLoading(false)
      console.log(error)
    })
    }, [])

    let dataProjects = Array.from(projects);

    let mappedPublicados = dataProjects.map(project => ({
      id: project._id,
      userId: project.userId,
      userName: project.userName,
      title: project.name,
      description: project.description,
      categorias: project.categorias,
      tecnologias: project.tecnologias,
      // imagenProyecto: project.imagenProyecto,
    }))


    useEffect(() => {
    setLoadingObservation(true)
    axios.get("http://localhost:3000/observaciones")
    .then(res => {
      setObservations(res.data)
      setLoadingObservation(false)
    })
    .catch((error) => {
      setLoadingObservation(false)
      console.log(error)
    })
    }, [])

    const mappedOservaciones = observations?.map(observation => ({
      id: observation._id,
      userId: observation.userId,
      idProject: observation.idProject,
      name: observation.name,
      arte: observation.arte,
      tecnico: observation.tecnico,
      disenio: observation.disenio,
      generales: observation.generales,
      // poster: proyect.Poster,
    }))

    return (
        <ApiContext.Provider value={{mappedPublicados, setProjects, mappedOservaciones, setObservations}}>
            {children}
        </ApiContext.Provider>
    )
}
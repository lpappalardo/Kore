import { createContext, useEffect, useState } from "react";
import axios from "axios"

export const ApiContext = createContext();

export const ApiConextProvider = ({children}) => {

    const [loading, setLoading] = useState([])
    const [projects, setProjects ] = useState([])

    useEffect(() => {
    setLoading(true)
    axios.get("http://localhost:3002/proyectos")
    .then(res => {
      setProjects(res.data)
      setLoading(false)
    })
    .catch((error) => {
      setLoading(false)
      console.log(error)
    })
    }, [])

    const mappedPublicados = projects?.map(project => ({
      id: project._id,
      title: project.name,
      description: project.description,
      // poster: proyect.Poster,
    }))

    return (
        <ApiContext.Provider value={{mappedPublicados, setProjects}}>
            {children}
        </ApiContext.Provider>
    )
}
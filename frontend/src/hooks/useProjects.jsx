import { useEffect, useState } from "react";
import axios from "axios"

export function useProjects () {

    const [loading, setLoading] = useState([])
    const [projects, setProjects ] = useState([])

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

        fecha: project.fecha,
        fechaAbsoluta: project.fechaAbsoluta,

        enlace: project.enlace,
      }))

    return { mappedPublicados, setProjects, loading }
}
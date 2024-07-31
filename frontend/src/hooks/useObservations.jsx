import { useEffect, useState } from "react";
import axios from "axios"

export function useObservations () {

    const [loadingObservation, setLoadingObservation] = useState([])
    const [observations, setObservations ] = useState([])

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
    }))

    return { mappedOservaciones, setObservations, loadingObservation }
}
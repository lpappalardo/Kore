import { useEffect, useState } from "react";
import axios from "axios"

export function useSolicitudes () {

    const [loadingSolicitud, setLoadingSolicitud] = useState([])
    const [solicitudes, setSolicitudes ] = useState([])

    useEffect(() => {
        setLoadingSolicitud(true)
        axios.get("http://localhost:3000/solicitudes")
        .then(res => {
            setSolicitudes(res.data)
            setLoadingSolicitud(false)
        })
        .catch((error) => {
            setLoadingSolicitud(false)
          console.log(error)
        })
    }, [])

    const mappedSolicitudes = solicitudes?.map(solicitud => ({

        id: solicitud._id,
        userGenerator: solicitud.userGenerator,
        userReceptor: solicitud.userReceptor,

        fecha: solicitud.fecha,
        fechaAbsoluta: solicitud.fechaAbsoluta,

        categoria: solicitud.categoria,

        estado: solicitud.estado,
        idProyecto: solicitud.idProyecto,
    }))

    return { mappedSolicitudes, setSolicitudes, loadingSolicitud }
    
}
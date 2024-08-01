import { useEffect, useState } from "react";
import axios from "axios"

export function useUsers () {

    const [loading, setLoading] = useState([])
    const [usuarios, setUsuarios ] = useState([])

    useEffect(() => {
        setLoading(true)
        axios.get("http://localhost:3000/usuarios")
        .then(res => {
            setUsuarios(res.data)
            setLoading(false)
        })
        .catch((error) => {
            setLoading(false)
            console.log(error)
        })
    }, [])


    let dataUsuarios = Array.from(usuarios);

    let usuariosCargados = dataUsuarios.map(usuario => ({
        id: usuario._id,
        email: usuario.email,
        username: usuario.username,
        password: usuario.password,
      }))

    return { usuariosCargados, setUsuarios, loading }
}
import { useEffect, useState } from "react";
import axios from "axios"

export function useUser (id) {

    const [loading, setLoading] = useState([])
    const [usuarios, setUsuarios ] = useState([])

    useEffect(() => {
        setLoading(true)
        axios.get(`http://localhost:3000/usuarios/find/${id}`)
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
        role: usuario.role,
      }))

      let usuarioCargado = usuariosCargados[0]

    return { usuarioCargado, loading }
}
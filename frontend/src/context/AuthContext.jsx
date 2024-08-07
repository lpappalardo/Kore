import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie"
import {jwtDecode} from "jwt-decode"

export const AuthContext = createContext();

export const AuthConextProvider = ({children}) => {

    const [user, setUser ] = useState(null)

    const auth = Cookies.get("jwToken") || null;

    useEffect(() => {
        if(auth){
            const decoded = jwtDecode(auth);
            setUser({name: decoded.usuario.username, id: decoded.usuario._id, email: decoded.usuario.email, role: decoded.usuario.role})
        }

    },[])

    const logOutUser = () => {
        setUser(null)
        Cookies.remove('jwToken')
        toast.success('Sesión cerrada');
    }


    return (
        <AuthContext.Provider value={{user, setUser, auth, logOutUser}}>
            {children}
        </AuthContext.Provider>
    )
}
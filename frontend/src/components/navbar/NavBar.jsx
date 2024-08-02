import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext'

const Navbar = () => {
    const {user, logOutUser} = useContext(AuthContext)

    const [menuOpen, setMenuOpen] = useState(false)
   
    return (
        <header>
            <div className="container encabezado">
                <nav>
                    <div className="navItemList">
                        <NavLink  to="/" className="title navItem">
                        Kore
                        </NavLink>
                    </div>
                    <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
          {/* {
            user ? ( */}
              <ul className={menuOpen ? "open" : ""}>
                {user &&
                <li className="navItemList">
                    <NavLink className="navItem" to="/">Inicio</NavLink>
                </li>
                }
                {user && user.role === 'user' && (
                                    <>
                <li className="navItemList">
                    <NavLink className="navItem" to="/proyectos">Proyectos</NavLink>
                </li>
                <li className="navItemList">
                    <NavLink className="navItem" to="/perfil">Perfil</NavLink>
                </li>
                </>)}
                
                {user && user.role === 'admin' && (
                                    <>
                <li className="navItemList">
                    <NavLink className="navItem" to="/administracionProyectos">Proyectos</NavLink>
                </li>
                <li className="navItemList">
                    <NavLink className="navItem" to="/administracionUsuarios">Usuarios</NavLink>
                </li>
                </>)}

                {user &&
                <li className="navItemList">
                    <NavLink onClick={() => logOutUser()} className="navItem" to="/login">Salir</NavLink>
                </li>
                }

                {!user && <>
                <li className="navItemList">
                    <NavLink className="navItem" to="/login">Ingresar</NavLink>
                </li>
                <li className="navItemList">
                    <NavLink className="navItem" to="/register">Registrarse</NavLink>
                </li>
                </>}
              </ul>



                </nav>
            </div>
        </header>
    )
}

export default Navbar
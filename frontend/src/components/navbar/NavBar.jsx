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
                    <h1 className="navItemList">
                        <NavLink  to="/" className="title navItem">
                        Kore
                        </NavLink>
                    </h1>
                    <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
          {
            user ? (
              <ul className={menuOpen ? "open" : ""}>
                <li className="navItemList">
                    <NavLink className="navItem" to="/">Inicio</NavLink>
                </li>
                <li className="navItemList">
                    <NavLink className="navItem" to="/proyectos">Proyectos</NavLink>
                </li>
                <li className="navItemList">
                    <NavLink className="navItem" to="/perfil">Perfil</NavLink>
                </li>
                <li className="navItemList">
                    <NavLink onClick={() => logOutUser()} className="navItem" to="/login">Salir</NavLink>
                </li>
              </ul>
            ) :
            (
              <ul className={menuOpen ? "open" : ""}>
                <li className="navItemList">
                    <NavLink className="navItem" to="/login">Ingresar</NavLink>
                </li>
                <li className="navItemList">
                    <NavLink className="navItem" to="/register">Registrarse</NavLink>
                </li>
              </ul>
            )
          }


                </nav>
            </div>
        </header>
    )
}

export default Navbar
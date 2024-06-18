import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {

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
                    <ul className={menuOpen ? "open" : ""}>
                        <li className="navItemList">
                            <NavLink className="navItem" to="/">Inicio</NavLink>
                        </li>

                        <li className="navItemList">
                            <NavLink className="navItem" to="/proyectos">Proyectos</NavLink>
                        </li>

                        <li className="navItemList">
                            <NavLink className="navItem" to="/admin">Admin</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Navbar
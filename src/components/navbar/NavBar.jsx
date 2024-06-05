import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
   
    return (
        <header>
            <div className="container encabezado">
                <h1>Kore</h1>

                <nav>
                    <ul>
                        <li className="navItemList"><NavLink className="navItem" to="/">Inicio</NavLink></li>
                        <li className="navItemList"><NavLink className="navItem" to="/proyectos">Proyectos</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Navbar
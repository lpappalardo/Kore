import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false)
   
    return (
        // <header>
        //     <div className="container encabezado">
        //         <h1>Kore</h1>

        //         <nav>
        //             <ul>
        //                 <li className="navItemList"><NavLink className="navItem" to="/">Inicio</NavLink></li>
        //                 <li className="navItemList"><NavLink className="navItem" to="/proyectos">Proyectos</NavLink></li>
        //             </ul>
        //         </nav>
        //     </div>
        // </header>

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
                            <NavLink className="navItem" to="/proyectos">Perfil</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Navbar
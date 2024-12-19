import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext/'

const ListOfFriends = ({ friends, proyecto }) => {

    const {user} = useContext(AuthContext)
    
    let usuarioId = user._id

    let idProyecto = proyecto.id
   
    return (
            <div>
                            {
                                <ul className="proyects">
                                    {
                                        friends.map(friend => (
                                            <div className="proyectPersonal" key={friend.id}>
                                                <img src="../../../src/assets/img/card.png" alt={friend.username} />
                                                <div>
                                                <Link to={`/detalleUsuario/${friend.id}`}>{friend.username}</Link>

                                                <Link className="botonPrincipal" to={`/agregarCerrado/${friend.id}/${idProyecto}`}>Invitar al proyecto</Link>
                                                </div>
                                                
                                            </div>
                                        ))
                                    }
                                </ul>
                            }
            </div>
    )
}

const NoFriendResults = () => {
    return (
        <p>En este momento no tiene ningun amigo agregado</p>
    )
}

export function PosiblesParticipantes ({ friends, proyecto }) {
    const hasFriends = friends?.length > 0

    return (
        hasFriends
         ? <ListOfFriends friends={friends} proyecto={proyecto} />
         : <NoFriendResults />
    )
}
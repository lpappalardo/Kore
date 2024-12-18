import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext/'

const ListOfFriends = ({ friends }) => {

    const {user} = useContext(AuthContext)
    
    let usuarioId = user._id
   
    return (
            <div>
                            {
                                <ul className="proyects">
                                    {
                                        friends.map(friend => (
                                            <div className="proyectPersonal" key={friend.id}>
                                                <img src="../../../src/assets/img/card.png" alt={friend.username} />

                                                {
                                                    (friend.id == usuarioId ) ?
                                                    <Link to={`/perfil/`}>{friend.username}</Link>
                                                    : <Link to={`/detalleUsuario/${friend.id}`}>{friend.username}</Link>
                                                }
                                                {/* <Link to={`/detalleUsuario/${friend.id}`}>{friend.username}</Link> */}
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

export function Friends ({ friends }) {
    const hasFriends = friends?.length > 0

    return (
        hasFriends
         ? <ListOfFriends friends={friends} />
         : <NoFriendResults />
    )
}
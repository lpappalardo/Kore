import React, { useContext, useState } from "react";
import { AuthContext } from '../../context/AuthContext/'
import { Link } from 'react-router-dom'
import axios from "axios"
import { useReviews } from '../../hooks/useReviews'

export function OnservationProject ({ observationProject }) {

    const {user} = useContext(AuthContext)
    
    let usuarioId = user._id
    let observacionId = observationProject.id

    const {mappedReviews} = useReviews()

    let reviewsObservacion = mappedReviews.filter(review => (review.observationId == observacionId))

    // let reviewUsuario = reviewsObservacion.filter(review => (review.userId == usuarioId))[0]
    // console.log(reviewUsuario)
    // let idReview = ""
    // reviewUsuario && (idReview = reviewUsuario.id)

    // console.log(reviewsObservacion)
    // let cantidadRev = reviewsObservacion.length;
    // console.log(cantidadRev)

    // let reviewsObservacionPositiva = reviewsObservacion.filter(review => (review.categoria == "like"))
    // let reviewUsuario = reviewsObservacion.filter(review => (review.userId == usuarioId))[0]
    // let cantidadReviewUsuario = reviewUsuario.length();
    // let reviewsObservacionNegativa = reviewsObservacion.filter(review => (review.categoria == "unlike"))

    // let totalPositivas = reviewsObservacionPositiva.length;
    // let totalNegativas = reviewsObservacionNegativa.length;

    // const [error, setError] = useState("")
    
    //   const [likeData, setLikeData] = useState({
    //     observationId: observacionId,
    //     userId: usuarioId,
    //     valor: 1,
    //     categoria: "like",
    //   })

    // const [like, seLike] = useState(false) 
    
    //   const handleLike = (e) => {
    
    //     if(like){

    //         axios.delete(`http://localhost:3000/reviews/${idReview}`)
    //         .then((res) => {
    //         console.log(res)
    //         })
    //         .catch((error) => {
    //         setError(error.respose.data.message)
    //         console.log('Error:', error)
    //         })


    //         seLike(false)

    //     }else{

    //         axios.post("http://localhost:3000/reviews/", likeData)
    //         .then((res) => {
    //         console.log(res)
    //         })
    //         .catch((error) => {
    //         setError(error.respose.data.message)
    //         console.log('Error:', error)
    //         })

    //         seLike(true)
    //     }
    //  }

    //     // if(cantidadReviewUsuario > 0){
    //     //     seLikes(likes - 1)

    //     //   }else{

    //     //     axios.post("http://localhost:3000/reviews/", likeData)
    //     //   .then((res) => {
    //     //     console.log(res)
    //     //     })
    //     //   .catch((error) => {
    //     //     setError(error.respose.data.message)
    //     //     console.log('Error:', error)
    //     //     })
            
    //     //     seLikes(reviewsObservacion.length)

    //     // }
    //   }

    //   const [unLikeData, setUnLikeData] = useState({
    //     observationId: observacionId,
    //     userId: usuarioId,
    //     valor: 1,
    //     categoria: "unlike",
    //   })
    
    //   const handleUnlike = (e) => {
    
    //     axios.post("http://localhost:3000/reviews/", unLikeData)
    //       .then((res) => {
    //         console.log(res)
    //     })
    //       .catch((error) => {
    //         setError(error.respose.data.message)
    //         console.log('Error:', error)
    //     })
    //   }

    return (

        <li className={observationProject.userId == user._id ? "observation-card-user" : "observation-card"} key={observationProject.id}>
                        <div className='observation-user'>
                          <img src="../src/assets/img/logoGrande.png" alt="Usuario" />

                          {
                            (observationProject.userId == user._id ) ?
                              <Link className='observation-user-name' to={`/perfil/`}>{observationProject.name}</Link>
                              : <Link className='observation-user-name' to={`/detalleUsuario/${observationProject.userId}`}>{observationProject.name}</Link>
                          }

                          <p>Publicación: {observationProject.fecha}</p>
                        </div>
                        <div className='observation-content'>
                        {
                             observationProject.arte && 
                             <div>
                               <p className='titleObservation'>Arte</p>
                               <p className='contentObservation'>{observationProject.arte}</p>
                             </div>
                           }
                           {
                             observationProject.tecnico && 
                             <div>
                               <p className='titleObservation'>Técnico</p>
                               <p className='contentObservation'>{observationProject.tecnico}</p>
                             </div>
                           }
                           {
                             observationProject.disenio &&
                             <div>
                               <p className='titleObservation'>Diseñio</p>
                               <p className='contentObservation'>{observationProject.disenio}</p>
                             </div>
                           }
                           <div>
                               <p className='titleObservation'>Generales</p>
                               <p className='contentObservation'>{observationProject.generales}</p>
                           </div>
                           {
                            observationProject.userId == usuarioId ?
                              <div className="contenedor-links-horizontal">
                              <Link className='botonPrincipal' to={`/actualizarObservacion/${observationProject.id}`}>Editar</Link>
                              <Link className='botonDanger' to={`/elimiarObservacion/${observationProject.id}`}>Eliminar</Link>
                            </div>
                            : <></>
                           }
                            {/* <div>
                            <button onClick={(e) => handleLike(e, usuarioId)}>
                                Me Gusta
                                 {like ? "si" : "no" }
                            </button>
                            </div> */}
                        </div>
                       </li>
    )
}
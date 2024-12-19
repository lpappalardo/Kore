import { useEffect, useState } from "react";
import axios from "axios"

export function useReviews () {

    const [loadingReview, setLoadingReview] = useState([])
    const [reviews, setReviews ] = useState([])

    useEffect(() => {
        setLoadingReview(true)
        axios.get("http://localhost:3000/reviews")
        .then(res => {
            setReviews(res.data)
            setLoadingReview(false)
        })
        .catch((error) => {
            setLoadingReview(false)
          console.log(error)
        })
    }, [])

    const mappedReviews = reviews?.map(review => ({

        id: review._id,
        observationId: review.observationId,
        userId: review.userId,
        valor: review.valor,
        categoria: review.categoria,
    }))

    return { mappedReviews, setReviews, loadingReview }
    
}
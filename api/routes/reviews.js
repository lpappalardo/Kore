import express from 'express';
const reviewRoutes = express.Router();
import Reviews from "../models/review.js"

reviewRoutes.get('/', async (req, res) => {
  try {
    const reviews = await Reviews.find();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

reviewRoutes.post('/', async (req, res) => {
  console.log(req.body)
  const review = new Reviews({
    observationId: req.body.observationId,
    userId: req.body.userId,
    valor: req.body.valor,
    categoria: req.body.categoria,
  });

  try {
    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// observationroutes.put('/editarObservacion/:id', async (req, res) =>{
//   let idObservacion = req.params.id

//   try {
//     let observacion = await Observaciones.findByIdAndUpdate({_id: idObservacion}, {
//       name: req.body.name,
//       userId: req.body.userId,
//       idProject: req.body.idProject,
//       arte: req.body.arte,
//       tecnico: req.body.tecnico,
//       disenio: req.body.disenio,
//       generales: req.body.generales
//     })
//     res.status(201).json(observacion);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// })

reviewRoutes.delete('/:id', async (req, res) =>{
  let id = req.params.id
  try {
    let review = await Reviews.findByIdAndDelete({_id: id})
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

reviewRoutes.get('/:id', async (req, res) => {
  try {
    const review = await Reviews.findById(req.params.id);
    if (review == null) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export { reviewRoutes };
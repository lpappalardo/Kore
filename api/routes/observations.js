import express from 'express';
const observationroutes = express.Router();
import Observaciones from "../models/observations.js"

observationroutes.get('/', async (req, res) => {
  try {
    const observations = await Observaciones.find();
    res.json(observations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

observationroutes.post('/', async (req, res) => {
  console.log(req.body)
  const observation = new Observaciones({
    name: req.body.name,
    userId: req.body.userId,
    idProject: req.body.idProject,
    arte: req.body.arte,
    tecnico: req.body.tecnico,
    disenio: req.body.disenio,
    generales: req.body.generales
  });

  try {
    const newObservation = await observation.save();
    res.status(201).json(newObservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

observationroutes.put('/editarObservacion/:id', async (req, res) =>{
  let idObservacion = req.params.id

  try {
    let observacion = await Observaciones.findByIdAndUpdate({_id: idObservacion}, {
      name: req.body.name,
      userId: req.body.userId,
      idProject: req.body.idProject,
      arte: req.body.arte,
      tecnico: req.body.tecnico,
      disenio: req.body.disenio,
      generales: req.body.generales
    })
    res.status(201).json(observacion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})

observationroutes.delete('/eliminarObservacion/:id', async (req, res) =>{
  let idObservacion = req.params.id
  try {
    let observacion = await Observaciones.findByIdAndDelete({_id: idObservacion})
    res.json(observacion);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

observationroutes.get('/:id', async (req, res) => {
  try {
    const observation = await Observaciones.findById(req.params.id);
    if (observation == null) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(observation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export { observationroutes };
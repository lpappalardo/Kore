import express from 'express';
const projectroutes = express.Router();
import Proyectos from "../models/proyects.js"

projectroutes.get('/', async (req, res) => {
  try {
    const projects = await Proyectos.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

projectroutes.post('/', async (req, res) => {
  console.log(req.body)
  const project = new Proyectos({
    name: req.body.name,
    description: req.body.description
  });

  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

projectroutes.get('/:id', async (req, res) => {
  try {
    const project = await Proyectos.findById(req.params.id);
    if (project == null) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export { projectroutes };

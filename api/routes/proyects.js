import express from 'express';
const projectroutes = express.Router();
import Proyectos from "../models/proyects.js"

// import multer from 'multer';

// const upload = multer({ dest: 'uploads' })

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
    description: req.body.description,
    categorias: req.body.categorias
  });

  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

projectroutes.post('/categoria', async (req, res) => {
  try {
    const projects = await Proyectos.find();
    const categoria = req.body.categoria;
    if(categoria != "Todas"){
      const projectsFiltrados = projects.filter(project => project.categorias.includes(categoria))
      res.json(projectsFiltrados);
    } else {
      res.json(projects);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
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

import express from 'express';
const projectroutes = express.Router();
import Proyectos from "../models/proyects.js"
import multer from 'multer';
// const fs = require('fs')

const upload = multer({ dest: 'uploads/' })

projectroutes.get('/', async (req, res) => {
  try {
    const projects = await Proyectos.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// projectroutes.post('/', upload.single('imagenProyecto'), async (req, res) => {
projectroutes.post('/', async (req, res) => {
  const project = new Proyectos({
    name: req.body.name,
    userId: req.body.userId,
    userName: req.body.userName,
    description: req.body.description,
    categorias: req.body.categorias,
    tecnologias: req.body.tecnologias,

    fecha: req.body.fecha,
    fechaAbsoluta: req.body.fechaAbsoluta,
    enlace: req.body.enlace,
    // imagenProyecto: req.file.filename 
  });

  try {
    // saveImage(req.file)
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// function saveImage(file) {
//   const newPath = `./uploads/${file.originalname}`;
//   fs.renameSync(file.path, newPath);
//   return newPath
// }

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

projectroutes.put('/editarProyecto/:id', async (req, res) =>{
  let idProyecto = req.params.id

  try {
    let proyecto = await Proyectos.findByIdAndUpdate({_id: idProyecto}, {
    name: req.body.name,
    userId: req.body.userId,
    userName: req.body.userName,
    description: req.body.description,
    categorias: req.body.categorias,
    tecnologias: req.body.tecnologias,
    enlace: req.body.enlace,
    })
    res.status(201).json(proyecto);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})

projectroutes.delete('/eliminarProyecto/:id', async (req, res) =>{
  let idProyecto = req.params.id
  try {
    let proyecto = await Proyectos.findByIdAndDelete({_id: idProyecto})
    res.json(proyecto);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

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

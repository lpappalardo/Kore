import express from 'express';
const solicitudRoutes = express.Router();
import Solicitudes from "../models/solicitudes.js"


solicitudRoutes.get('/', async (req, res) => {
  try {
    const solcitudes = await Solicitudes.find();
    res.json(solcitudes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// projectroutes.post('/', upload.single('imagenProyecto'), async (req, res) => {
solicitudRoutes.post('/', async (req, res) => {
  const solicitud = new Solicitudes({

    userGenerator: req.body.userGenerator,
    userReceptor: req.body.userReceptor,

    fecha: req.body.fecha,
    fechaAbsoluta: req.body.fechaAbsoluta,

    categoria: req.body.categoria,
    estado: "pendiente",

  });

  try {
    // saveImage(req.file)
    const newSolicitud = await solicitud.save();
    res.status(201).json(newSolicitud);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

solicitudRoutes.post('/categoria', async (req, res) => {
  try {
    const solicitudes = await Solicitudes.find();
    const categoria = req.body.categoria;
    if(categoria != "Todas"){
      const solicitudesFiltradas = solicitudes.filter(solicitud => solicitud.categoria == categoria)
      res.json(solicitudesFiltradas);
    } else {
      res.json(solicitudes);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


solicitudRoutes.put('/aceptarSolicitud/:id', async (req, res) =>{
  let idSolicitud = req.params.id

  try {
    let solicitud = await Solicitudes.findByIdAndUpdate({_id: idSolicitud}, {
  
      estado: "aceptada",
    })
    res.status(201).json(solicitud);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})

solicitudRoutes.put('/rechazarSolicitud/:id', async (req, res) =>{
  let idSolicitud = req.params.id

  try {
    let solicitud = await Solicitudes.findByIdAndUpdate({_id: idSolicitud}, {
  
      estado: "rechazada",
    })
    res.status(201).json(solicitud);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})


// projectroutes.delete('/eliminarProyecto/:id', async (req, res) =>{
//   let idProyecto = req.params.id
//   try {
//     let proyecto = await Proyectos.findByIdAndDelete({_id: idProyecto})
//     res.json(proyecto);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// })

solicitudRoutes.get('/:id', async (req, res) => {
  try {
    const solicitud = await Solicitudes.findById(req.params.id);
    if (solicitud == null) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(solicitud);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export { solicitudRoutes };
import express from 'express';
import mongoose from 'mongoose';
import { projectroutes, observationroutes, userRoutes, solicitudRoutes } from './routes/index.js';
import 'dotenv/config';
import cors from 'cors';

mongoose.connect("mongodb://127.0.0.1:27017/kore", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {console.log('Conectado a MongoDB...')
})
    .catch(err => console.log('No se pudo conectar con MongoDB..', err));


const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get('/',(req, res) => {
    res.send("kore database");
});

app.use('/usuarios', userRoutes);
app.use('/proyectos', projectroutes);
app.use('/observaciones', observationroutes);
app.use('/solicitudes', solicitudRoutes);

const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`Api Run`);
})
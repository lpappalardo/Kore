import express from 'express';
import mongoose from 'mongoose';
import { projectroutes, observationroutes, userRoutes, solicitudRoutes, reviewRoutes } from './routes/index.js';
import 'dotenv/config';
import cors from 'cors';

mongoose.connect("mongodb+srv://lpappalardo:mongodb@cluster0.qvqv1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {console.log('Conectado a MongoDB...')
})
    .catch(err => console.log('No se pudo conectar con MongoDB..', err));


const app = express();

app.use(cors(
    {
        origin: [],
        methods: ["POST", "GET"],
        credentials: true
    }
));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get('/',(req, res) => {
    res.send("kore database");
});

app.use('/usuarios', userRoutes);
app.use('/proyectos', projectroutes);
app.use('/observaciones', observationroutes);
app.use('/solicitudes', solicitudRoutes);
app.use('/reviews', reviewRoutes);

const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`Api Run`);
})
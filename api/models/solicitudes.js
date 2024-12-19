import mongoose from "mongoose"

const SolicitudSchema = new mongoose.Schema({

      userGenerator: {
        type: String,
        required: true
      },
      userReceptor: {
        type: String,
        required: true
      },
      fecha: {
        type: [String],
        required: true
      },
      fechaAbsoluta: {
        type: [String],
        required: true
      },
      categoria: {
        type: String,
        required: true
      },
      estado: {
        type: String,
        required: true
      },
      idProyecto: {
        type: String,
        required: false
      },
})

export default mongoose.model('Solicitudes', SolicitudSchema);
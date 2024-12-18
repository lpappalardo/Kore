import mongoose from "mongoose"

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      userId: {
        type: String,
        required: true
      },
      userName: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      categorias: {
        type: [String],
        required: true
      },
      tecnologias: {
        type: [String],
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
      enlace: {
        type: [String],
        required: true
      },
      // imagenProyecto: {
      //   type: String,
      //   required: false
      // },
})

export default mongoose.model('Proyectos', ProjectSchema);
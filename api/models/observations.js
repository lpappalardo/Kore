import mongoose from "mongoose"

const ObservationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    idProject: {
        type: String,
        required: true
    },
    arte: {
      type: String,
      required: false
    },
    tecnico: {
      type: String,
      required: false
    },
    disenio: {
      type: String,
      required: false
    },
    generales: {
      type: String,
      required: true
    }
})

export default mongoose.model('Observaciones', ObservationSchema);
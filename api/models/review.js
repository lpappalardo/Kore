import mongoose from "mongoose"

const ReviewSchema = new mongoose.Schema({

      observationId: {
        type: String,
        required: true
      },
      userId: {
        type: String,
        required: true
      },
      valor: {
        type: Number,
        required: true
      },
      categoria: {
        type: String,
        required: true
      }
})

export default mongoose.model('Reviews', ReviewSchema);
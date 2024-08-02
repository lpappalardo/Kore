import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    email: {
        type:String,
        required: true
    },
    username: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required: true
    },
    imagen: {
        type: String,
        required: false        
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
});

export default mongoose.model('Usuarios', usuarioSchema);


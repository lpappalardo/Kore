import express  from 'express';
import { getUsers, getUser, registerUser, loginUser, deleteUser, editUser } from '../controllers/users_controller.js';
import { verificarToken } from '../middlewares/auth.js';
const userRoutes = express.Router();

// userRoutes.get('/',verificarToken,  getUsers);
userRoutes.get('/',  getUsers);

// userRoutes.get('/find/:userId', verificarToken, getUser);
userRoutes.get('/find/:id', getUser);

userRoutes.post('/register', registerUser);

userRoutes.post('/login', loginUser);

userRoutes.delete('/eliminarUsuario/:id', deleteUser);

userRoutes.put('/editarUsuario/:id', editUser);

export {userRoutes};
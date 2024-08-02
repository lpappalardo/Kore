import Usuarios from '../models/users.js';
import bcrypt from "bcrypt";
import 'dotenv/config'
import jwt  from 'jsonwebtoken';

const getUsers = async (req, res) =>{
    try{
        let users = await Usuarios.find();
        res.json(users)
    }catch(error ) {
        res.status(400).json(
            {
                error
            }
        )
    }
}

const getUser = async (req, res) =>{
    try{
        let usuario = await Usuarios.find({_id: req.params.id});
        res.json(usuario)
    }catch(error ) {
        res.status(400).json(
            {
                error
            }
        )
    }
}


const registerUser = async (req, res) =>{
    try {
    let body = req.body;

    let usuario = new Usuarios({
        email: body.email,
        username: body.username,
        password:  bcrypt.hashSync( body.password, 10 ),
        role: body.role,
    });
    let savedUser = await usuario.save();

    res.json({
        user: savedUser,
    })
} catch (error) {
    res.status(400).json({
        message: error.message,
    });
}
}



const loginUser = async (req, res) =>{
    Usuarios.findOne({email: req.body.email})
        .then(datos => {
            if(datos){
                const passwordValido = bcrypt.compareSync(req.body.password, datos.password);
                if(!passwordValido) return res.status(400).json({error:'ok', msj:'Usuario o contraseña incorrecta.'})
                const jwToken = jwt.sign({
                    usuario: {_id: datos._id, username: datos.username, email: datos.email, role: datos.role}
                  }, process.env.SEED, { expiresIn: process.env.EXPIRATION });
                res.json({
                    usuario:{
                        _id:datos._id,
                        role:datos.role,
                        username:datos.username,
                        email:datos.email
                    },
                    jwToken
                });
            }else{
                res.status(400).json({
                    error:'ok',
                    msj:'Usuario o contraseña incorrecta.'
                })
            }
        })
        .catch(err => {
            res.status(400).json({
                error:'ok',
                msj:'Error en el servicio' + err
            })
        })
}


const deleteUser = async (req, res) =>{
    let idUser = req.params.id
    try {
      let usuario = await Usuarios.findByIdAndDelete({_id: idUser})
      res.json(usuario);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}

const editUser = async (req, res) =>{
    let idUser = req.params.id
  
    try {
      let usuario = await Usuarios.findByIdAndUpdate({_id: idUser}, {
      username:req.body.username,
        email:req.body.email
      })
      res.status(201).json(usuario);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

export {
    getUsers,
    getUser,
    registerUser,
    loginUser,
    deleteUser,
    editUser
  };
import bcrypt from 'bcryptjs';
import { response } from 'express';
import { generarJWT } from '../helpers/generar-jwt.js';
import Usuario from '../models/usuario.js';

const login = async (req, res = response) => {
  try {
    const { correo, password } = req.body;
    //Verificar que el email existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - correo',
      });
    }
    //SI el usuario está activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - estado inactivo',
      });
    }
    //Verificar la contraseña
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - password',
      });
    }
    //Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

export { login };

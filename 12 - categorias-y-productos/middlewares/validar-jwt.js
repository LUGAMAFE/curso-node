import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario.js';

const validarJWT = async (req, res, next) => {
  // Leer el token
  const token = req.header('x-token');
  if (!token) {
    return res.status(401).json({
      msg: 'No hay token en la petición',
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    req.uid = uid;

    const usuario = await Usuario.findById(uid);
    if (!usuario) {
      return res.status(401).json({
        msg: 'Token no válido - usuario no existe en DB',
      });
    }

    // Verificar si el uid tiene estado true
    if (!usuario.estado) {
      return res.status(401).json({
        msg: 'Token no válido - usuario con estado: false',
      });
    }

    req.usuario = usuario;

    next();
  } catch (error) {
    return res.status(401).json({
      msg: 'Token no válido',
    });
  }
};
export { validarJWT };

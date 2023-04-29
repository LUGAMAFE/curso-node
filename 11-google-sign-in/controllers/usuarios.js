import bcrypt from 'bcryptjs';
import { request, response } from 'express';
import Usuario from '../models/usuario.js';

const usuariosGet = async (req = request, res = response) => {
  const { q, nombre = 'No name', apikey, from = 0, limit = 5 } = req.query;
  const query = { estado: true };

  const [usuarios, total] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({
    usuarios,
    total,
  });
};

const usuariosPost = async (req, res = response) => {
  try {
    const { nombre, correo, password, rol } = req.body;

    //Encrypt password
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);
    const usuario = new Usuario({ nombre, correo, password: hash, rol });
    await usuario.save();
    res.json({
      msg: 'post API - usuariosPost',
      usuario,
    });
  } catch (error) {
    res.status(400).json({
      msg: 'Error: ' + error,
    });
  }
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  if (password) {
    //Encrypt password
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(password, salt);
  }

  try {
    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.json({
      msg: 'put API - usuariosPut',
      id,
    });
  } catch (error) {
    res.status(400).json({
      msg: 'Error: ' + error,
    });
  }
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: 'patch API - usuariosPatch',
  });
};

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;

  const uuid = req.uid;

  //Fisicamente lo borramos
  //const usuario = await Usuario.findByIdAndDelete(id);

  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
  const usuarioAutenticado = req.usuario;

  res.json({
    usuario,
    usuarioAutenticado,
  });
};

export {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};

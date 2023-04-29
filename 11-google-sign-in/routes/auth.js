import { Router } from 'express';
import { check } from 'express-validator';
import { googleSignIn, login } from '../controllers/auth.js';
import { validarCampos } from '../middlewares/validar-campos.js';

const router = Router();

router.post(
  '/login',
  [
    check('correo', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  login,
);

router.post(
  '/google',
  [
    check('id_token', 'El id_token es necesaria').not().isEmpty(),
    validarCampos,
  ],
  googleSignIn,
);

export default router;

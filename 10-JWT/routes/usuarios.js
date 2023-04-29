import { Router } from 'express';
import { check } from 'express-validator';
import {
  usuariosDelete,
  usuariosGet,
  usuariosPatch,
  usuariosPost,
  usuariosPut,
} from '../controllers/usuarios.js';
import {
  emailExiste,
  esRoleValido,
  existeUsuarioPorId,
} from '../helpers/db-validators.js';
import {
  esAdminRole,
  tieneRole,
  validarCampos,
  validarJWT,
} from '../middlewares/index.js';

const router = Router();

router.get('/', usuariosGet);

router.put(
  '/:id',
  [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos,
  ],
  usuariosPut,
);

router.post(
  '/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de más de 6 letras').isLength({
      min: 6,
    }),
    check('correo', 'El correo no es válido').isEmail().custom(emailExiste),
    check('rol').not().isEmpty().custom(esRoleValido),
    validarCampos,
  ],
  usuariosPost,
);

router.delete(
  '/:id',
  [
    validarJWT,
    esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE', 'OTRO_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuariosDelete,
);

router.patch('/', usuariosPatch);

export default router;

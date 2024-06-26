// Ruta /api/login

const { Router } = require('express')
const { login, google, renewToken } = require('../controllers/authController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post( '/', 
    [
        check('email','El email es obligatorio.').isEmail(),
        check('password', 'El password es obligatorio.').not().isEmpty(),
        validarCampos
    ]
, login)

router.post( '/google', 
    [
        check('token', 'El token es obligatorio.').not().isEmpty(),
        validarCampos
    ]
, google)

router.get( '/renew', validarJWT , renewToken)

module.exports = router;
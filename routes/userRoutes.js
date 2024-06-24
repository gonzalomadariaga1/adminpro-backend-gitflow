/* Ruta: /api/users */

const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')

const {getUsers, createUser, updateUser, deleteUser} = require('../controllers/userController')
const { validarJWT } = require('../middlewares/validar-jwt')
const router = Router();

router.get( '/', validarJWT , getUsers );
router.post( '/', 
    [
        check('name','El nombre es obligatorio.').not().isEmpty(),
        check('password', 'El password es obligatorio.').not().isEmpty(),
        check('email', 'El email es obligatorio.').isEmail(),
        validarCampos
    ] 
,createUser );

router.put('/:id', 
    [
        validarJWT,
        check('name','El nombre es obligatorio.').not().isEmpty(),
        check('role', 'El role es obligatorio.').not().isEmpty(),
        check('email', 'El email es obligatorio.').isEmail(),
        validarCampos
    ], 
updateUser)

router.delete('/:id' , validarJWT, deleteUser)


module.exports = router;


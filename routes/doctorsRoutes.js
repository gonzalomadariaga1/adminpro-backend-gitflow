// Ruta: /api/hospitals

const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { getDoctors, createDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctorController')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router();

router.get( '/' , getDoctors );

router.post( '/', 
    [
        validarJWT,
        check('name', 'El nombre del doctor es requerido.').not().isEmpty(),
        check('hospital', 'El id del hospital no es válido.').isMongoId(),
        validarCampos
    ],
createDoctor );

router.put('/:id', 
    [
        validarJWT,
        check('name', 'El nombre del doctor es requerido.').not().isEmpty(),
        check('hospital', 'El id del hospital no es válido.').isMongoId(),
        validarCampos
    ], 
updateDoctor)

router.delete('/:id', deleteDoctor)


module.exports = router;

// Ruta: /api/hospitals

const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { getHospitals, createHospital, updateHospital, deleteHospital } = require('../controllers/hospitalController')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router();

router.get( '/' , getHospitals );

router.post( '/', 
    [
        validarJWT,
        check('name', 'El nombre del hospital es requerido.').not().isEmpty(),
        validarCampos
    ],
createHospital );

router.put('/:id', 
    [
        validarJWT,
        check('name', 'El nombre del hospital es requerido.').not().isEmpty(),
        validarCampos
    ], 
updateHospital)

router.delete('/:id', validarJWT ,deleteHospital)


module.exports = router;

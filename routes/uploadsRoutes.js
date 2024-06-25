// Ruta: /api/upload

const { Router } = require('express');
const { fileUpload, returnImage } = require('../controllers/uploadController')
const { validarJWT } = require('../middlewares/validar-jwt')
const expressFileUpload = require('express-fileupload')

const router = Router();

router.use( expressFileUpload())

router.put( '/:type/:id', validarJWT , fileUpload );

router.get('/:type/:image', returnImage)




module.exports = router;
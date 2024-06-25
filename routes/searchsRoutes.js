// Ruta: /api/search

const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { getAll, getSearchByCollection } = require('../controllers/searchController')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router();

router.get( '/:search', validarJWT , getAll );
router.get( '/collection/:collection/:search', validarJWT , getSearchByCollection );




module.exports = router;
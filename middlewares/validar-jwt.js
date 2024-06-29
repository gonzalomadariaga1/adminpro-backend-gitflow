const jwt = require('jsonwebtoken')
const User = require('../models/user')

const validarJWT = (req, res, next) => {
    //leer token
    const token = req.header('x-token')

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No existe token en petición.'
        })
    }

    try {

        const {uid} = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid

        next()

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido.'
        })
    }


    
}

const validarAdminRole = async (req, res, next) => {

    const uid = req.uid

    try {

        const userDB = await User.findById(uid);

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no existe'
            })
        }

        if ( userDB.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene permisos.'
            })
        }

        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado.'
        })
    }



}

const validarAdminRoleSameUser = async (req, res, next) => {

    const uid = req.uid
    const id = req.params.id

    try {

        const userDB = await User.findById(uid);

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no existe'
            })
        }

        if ( userDB.role === 'ADMIN_ROLE' || uid === id ) {
            //el usuario quiere actualizarse a si mismo.
            next()
        }else{
            return res.status(403).json({
                ok: false,
                msg: 'No tiene permisos.'
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg: 'Error inesperado.'
        })
    }

}

module.exports = {
    validarJWT,
    validarAdminRole,
    validarAdminRoleSameUser
}
const {response} = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { generateJWT } = require('../helpers/jwt');

const login = async (req, res=response) => {
    const { email , password } = req.body;

    try {

        const userDB = await User.findOne ({ email })

        if(!userDB){
            return res.status(400).json({
                ok: false,
                msg: 'Las credenciales no son correctas.'
            })
        }

        const validPassword = bcrypt.compareSync( password, userDB.password );
        if (!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Las credenciales no son correectas.'
            })
        }

        const token = await generateJWT( userDB.id );

        res.json({
            ok: true,
            token
        })





        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado.'
        })
    }
}

module.exports = {
    login
}
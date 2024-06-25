const {response} = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const google = async (req, res=response) => {


    try {

        const {email, name, picture} = await googleVerify(req.body.token)
        
        const userDB = await User.findOne({ email })

        let user

        if(!userDB){
            user = new Usuario({
                name,
                email,
                password: '@@@',
                img: picture,
                google: true
            })
        }else{
            //ya existe user
            user = userDB
            user.google = true
        }

        await user.save();

        const token = await generateJWT( user.id );

        res.json({
            ok: true,
            email,name,picture,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Token de Google no es correcto.'
        })
    }

    
}

const renewToken = async ( req, res = response ) => {

    const uid = req.uid
    const token = await generateJWT( uid );

    res.json({
        ok: true,
        token
    })

}

module.exports = {
    login,
    google,
    renewToken
}
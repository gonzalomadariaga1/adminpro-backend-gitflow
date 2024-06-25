const { response } = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const getUsers = async (req,res) => {

    // const users = await User.find();
    const desde = Number(req.query.desde) || 0;
    const [ users , total ] = await Promise.all([
        User.find().skip(desde).limit(5),
        User.countDocuments()
    ])

    res.json({
        ok: true,
        users,
        total
    })
}

const createUser = async (req,res = response) => {

    const {nombre, email, password } = req.body;

    

    try {

        const existeEmail = await User.findOne({email});

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado.'
            });
        }

        const user = new User(req.body)

        //encriptar password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        //guardar usuario
        await user.save();

        const token = await generateJWT(user.id);



        res.json({
            ok: true,
            user,
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

const updateUser = async ( req, res= response) => {

    const uid = req.params.id;

    try {

        const userDB = await User.findById( uid );

        if(!userDB){
            return res.status(400).json({
                ok: false,
                msg: 'No se ha encontrado un usuario con ese id.'
            });
        }

        //actualizaciones

        const { password, google, email, ...campos} = req.body;

        if(userDB.email !== email){
            const existeEmail = await User.findOne({ email });
            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email.'
                })
            }
        }

        campos.email = email

        const userUpdated = await User.findByIdAndUpdate( uid , campos, {new: true})

        res.json({
            ok: true,
            userUpdated
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado.'
        })
    }
}

const deleteUser = async ( req, res = response) => {
    const uid = req.params.id;

    try {

        const userDB = await User.findById( uid );

        if(!userDB){
            return res.status(400).json({
                ok: false,
                msg: 'No se ha encontrado un usuario con ese id.'
            });
        }

        await User.findByIdAndDelete( uid );

        res.json({
            ok: true,
            msg: 'Usuario eliminado correctamente.'
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
    getUsers,
    createUser,
    updateUser,
    deleteUser
}
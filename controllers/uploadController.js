const { response } = require('express')
const { v4: uuidv4 } = require('uuid')
const path = require('path')
const fs = require('fs')
const { updateImage } = require('../helpers/update-image')

const fileUpload = async (req , res = response) => {

    const type = req.params.type;
    const id = req.params.id;

    const validTypes = ['hospitals','doctors','users']

    if( !validTypes.includes(type)){
        return res.status(400).json({
            ok: false,
            msg: 'El tipo seleccionado no es válido.'
        })
    }

    if ( !req.files || Object.keys(req.files).length === 0){
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo.'
        })
    }

    const file = req.files.imagen;
    const nombreCortado = file.name.split('.')
    const extensionArchivo = nombreCortado[ nombreCortado.length - 1]

    const validExtensions = ['png','jpg','jpeg','gif'];
    if ( !validExtensions.includes( extensionArchivo )){
        return res.status(400).json({
            ok:false,
            msg:'La extensión del archivo no es permitida.'
        })
    }

    const nameArchive = `${ uuidv4() }.${ extensionArchivo }`

    const path = `./uploads/${ type }/${ nameArchive }`;

    file.mv( path , (err) => {
        if (err){
            console.log(err)
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen.'
            })
        }

        updateImage( type, id, nameArchive );

        res.json({
            ok:true,
            msg: 'Archivo subido',
            nameArchive
    
        })
    })    
}

const returnImage = ( req , res = response ) => {
    const type = req.params.type;
    const image = req.params.image

    const pathImg = path.join(__dirname, `../uploads/${ type }/${ image }`);

    

    if ( fs.existsSync ( pathImg )){
        res.sendFile( pathImg );
    }else{
        const pathImg = path.join(__dirname, `../uploads/no-image.jpg`);
        res.sendFile( pathImg );
    }

}


module.exports = {
    fileUpload,
    returnImage
    
}
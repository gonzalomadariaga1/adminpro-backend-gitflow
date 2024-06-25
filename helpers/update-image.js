const fs = require('fs')
const User = require('../models/user')
const Doctor = require('../models/doctor')
const Hospital = require('../models/hospital')

const deleteImage = (path) => {
    
    if (fs.existsSync ( path )) {
        fs.unlinkSync ( path )
    }
}

const updateImage = async ( type, id, nameArchive ) => {

    let pathOld = '';
    switch ( type ) {
        case 'doctors':

            const doctor = await Doctor.findById(id)
            if (!doctor){
                console.log("el doctor no existe");
                return false;
            }
            pathOld = `./uploads/doctors/${ doctor.img }`
            deleteImage(pathOld)

            doctor.img = nameArchive;
            await doctor.save();
            return true 

        break;

        case 'hospitals':

            const hospital = await Hospital.findById(id)
            if (!hospital){
                console.log("el hospital no existe");
                return false;
            }
            pathOld = `./uploads/hospitals/${ hospital.img }`
            deleteImage(pathOld)

            hospital.img = nameArchive;
            await hospital.save();
            return true

        break;

        case 'users':

        const user = await User.findById(id)
            if (!user){
                console.log("el user no existe");
                return false;
            }
            pathOld = `./uploads/users/${ user.img }`
            deleteImage(pathOld)

            user.img = nameArchive;
            await user.save();
            return true

        break;
    }

}

module.exports = {
    updateImage
}
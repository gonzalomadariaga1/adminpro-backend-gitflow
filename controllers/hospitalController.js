const { response } = require('express')
const Hospital = require('../models/hospital');

const getHospitals = async ( req , res = response ) => {

    const hospitals = await Hospital.find().populate('user','name img');

    res.json({
        ok: true,
        hospitals
    })
}

const createHospital = async ( req , res = response ) => {

    const uid = req.uid;
    const hospital = new Hospital({ user:uid , ...req.body })

    try {

        const hospitalDB = await hospital.save()

        res.json({
            ok: true,
            hospital: hospitalDB
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado.'
        })
    }

    
}

const updateHospital = async ( req , res = response ) => {

    const uid = req.uid
    const id = req.params.id

    try {

        const hospitalDB = await Hospital.findById(id)

        if(!hospitalDB){
            return res.status(404).json({
                ok:false,
                msg: 'Hospital no existe.'
            })
        }

        const changesHospital = {
            ...req.body,
            user: uid
        }

        const hospitalUpdated = await Hospital.findByIdAndUpdate(id, changesHospital, { new: true})

        res.json({
            ok: true,
            msg: 'updateHospital',
            hospital: hospitalUpdated
        })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado.'
        })
    }

    
}


const deleteHospital = async ( req , res = response ) => {

    const id = req.params.id

    try {

        const hospitalDB = await Hospital.findById(id)

        if(!hospitalDB){
            return res.status(404).json({
                ok:false,
                msg: 'Hospital no existe.'
            })
        }

        await Hospital.findByIdAndDelete( id )


        res.json({
            ok: true,
            msg: 'Hospital eliminado.'
        })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado.'
        })
    }
}


module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
}
const { response } = require('express')
const Doctor = require('../models/doctor');

const getDoctors = async ( req , res = response ) => {

    const doctors = await Doctor.find()
                                        .populate('user','name img')
                                        .populate('hospital','name');

    res.json({
        ok: true,
        doctors
    })
}

const createDoctor = async ( req , res = response ) => {

    const uid = req.uid;
    const doctor = new Doctor({ user:uid , ...req.body })

    try {

        const doctorDB = await doctor.save()

        res.json({
            ok: true,
            doctors: doctorDB
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado.'
        })
    }
}

const updateDoctor = async ( req , res = response ) => {

    const uid = req.uid
    const id = req.params.id

    try {

        const doctorDb = await Doctor.findById(id)

        if(!doctorDb){
            return res.status(404).json({
                ok:false,
                msg: 'Doctor no existe.'
            })
        }

        const changesDoctor = {
            ...req.body,
            user: uid
        }

        const doctorUpdated = await Doctor.findByIdAndUpdate(id, changesDoctor, { new: true})

        res.json({
            ok: true,
            doctors: doctorUpdated
        })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado.'
        })
    }
}

const deleteDoctor = async ( req , res = response ) => {

    const id = req.params.id

    try {

        const doctorDb = await Doctor.findById(id)

        if(!doctorDb){
            return res.status(404).json({
                ok:false,
                msg: 'Doctor no existe.'
            })
        }

        await Doctor.findByIdAndDelete( id )


        res.json({
            ok: true,
            msg: 'Doctor eliminado.'
        })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado.'
        })
    }
}

const getDoctorsById = async ( req , res = response ) => {

    const id = req.params.id

    try {

        const doctors = await Doctor.findById(id)
                                        .populate('user','name img')
                                        .populate('hospital','name');

        res.json({
            ok: true,
            doctors
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado.'
        })
    }

    
}


module.exports = {
    getDoctors,
    getDoctorsById,
    createDoctor,
    updateDoctor,
    deleteDoctor
}
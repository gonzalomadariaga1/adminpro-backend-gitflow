const { response } = require('express')
const User = require('../models/user')
const Doctor = require('../models/doctor')
const Hospital = require('../models/hospital')

const getAll = async (req , res = response) => {

    const search = req.params.search;
    const regex = new RegExp( search, 'i');

    const [ users, doctors, hospitals ] = await Promise.all([
        User.find({ name: regex}),
        Doctor.find({ name: regex}),
        Hospital.find({ name: regex}),
    ])

    res.json({
        ok:true,
        msg: search,
        users,
        doctors,
        hospitals
    })
}

const getSearchByCollection = async (req , res = response) => {

    const collection = req.params.collection;
    const search = req.params.search;
    const regex = new RegExp( search, 'i');

    let data = []; 
    switch (collection) {
        case 'users':
            data = await User.find({
                $or: [
                    {
                        name: regex
                    },
                    {
                        email: regex
                    }
                ]
            })
        break;

        case 'hospitals':
            data = await Hospital.find({ name: regex }).populate('user' , 'name')
        break;

        case 'doctors':
            data = await Doctor.find({ name: regex }).populate('user' , 'name').populate('hospital' , 'name')
        break;
    
        default:
             return res.status(400).json({
                ok:false,
                msg:'La colección no existe. '
        })

    }

    res.json({
        ok: true,
        results: data
    })


}

module.exports = {
    getAll,
    getSearchByCollection
}
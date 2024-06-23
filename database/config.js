const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI)
        const url = `${db.connection.host}:${db.connection.port}`
        console.log( `MongoDB se conectó correctamente: ${url}`)
    } catch (error) {
        console.log(`Error: ${error.message}`)
    }
}

module.exports = {
    dbConnection
}
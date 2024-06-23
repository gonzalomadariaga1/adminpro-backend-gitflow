const express = require('express');
const { dbConnection } = require('./database/config');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config()
const app = express();

app.use( cors() )

dbConnection()


//rutas


app.listen( process.env.PORT , () => {
    console.log('Servidor corriendo puerto:' + process.env.PORT );
})
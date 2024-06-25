const express = require('express');
const { dbConnection } = require('./database/config');
const dotenv = require('dotenv');
const cors = require('cors');




dotenv.config()
const app = express();

app.use( cors() )

//lectura y parseo del body
app.use(express.json());

dbConnection()


//rutas
app.use( '/api/users' , require('./routes/userRoutes') );
app.use( '/api/hospitals' , require('./routes/hospitalsRoutes') );
app.use( '/api/doctors' , require('./routes/doctorsRoutes') );
app.use( '/api/search' , require('./routes/searchsRoutes') );
app.use( '/api/uploads' , require('./routes/uploadsRoutes') );

app.use( '/api/login' , require('./routes/authRoutes') );

app.listen( process.env.PORT , () => {
    console.log('Servidor corriendo en puerto:' + process.env.PORT );
})